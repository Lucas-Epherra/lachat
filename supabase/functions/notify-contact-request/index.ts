import { createClient } from "supabase";

/**
 * Edge Function: notify-contact-request
 *
 * Objetivo:
 * - Recibir un webhook cuando se inserta una nueva consulta en contact_requests.
 * - Generar links privados temporales para los archivos adjuntos.
 * - Enviar un email automático al estudio usando Resend.
 * - Incluir un bloque listo para copiar/pegar en Excel o Google Sheets.
 *
 * Seguridad:
 * - Esta función corre del lado servidor en Supabase Edge Functions.
 * - Acá sí podemos usar PROJECT_SECRET_KEY.
 * - PROJECT_SECRET_KEY nunca debe ir en React, Vite, Vercel frontend ni GitHub.
 */

/**
 * Registro esperado desde la tabla public.contact_requests.
 */
type ContactRequestRecord = {
  id: string;
  submission_id: string;
  full_name: string;
  email: string;
  phone: string;
  case_type: string;
  message: string;
  has_files: boolean;
  file_paths: string[];
  status: string;
  created_at: string;
};

/**
 * Payload enviado por Supabase Database Webhooks.
 */
type DatabaseWebhookPayload = {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: ContactRequestRecord | null;
  old_record: ContactRequestRecord | null;
};

/**
 * Estructura interna para adjuntos con link firmado.
 */
type SignedAttachment = {
  path: string;
  fileName: string;
  signedUrl: string;
};

/**
 * Bucket privado donde guardamos la documentación legal.
 */
const STORAGE_BUCKET = "legal-documents";

/**
 * Tiempo de expiración para la URL firmada de Supabase Storage.
 * Supabase espera el valor expresado en segundos.
 *
 * Nota: 7 días es el límite máximo estricto permitido por el protocolo
 * subyacente (AWS S3) para URLs firmadas.
 *
 * 7 días = 60 (seg) * 60 (min) * 24 (hs) * 7 (días) = 604.800 segundos.
 */
const SIGNED_URL_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 7;

/**
 * Encabezados pensados para copiar/pegar en Excel o Google Sheets.
 *
 * Usamos separador ; porque en configuraciones regionales como Argentina
 * suele funcionar mejor que la coma para CSV.
 */
const EXCEL_HEADERS = [
  "Fecha",
  "Estado",
  "Nombre",
  "Telefono",
  "Email",
  "Tipo de consulta",
  "Mensaje",
  "Tiene adjuntos",
  "Cantidad adjuntos",
  "Archivos",
  "Links de descarga",
  "ID consulta",
];

/**
 * Headers base para respuestas JSON.
 */
const jsonHeaders = {
  "Content-Type": "application/json",
};

/**
 * Devuelve una respuesta JSON consistente.
 */
const jsonResponse = (body: unknown, status = 200) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });
};

/**
 * Lee una variable de entorno obligatoria.
 *
 * Si falta, lanzamos un error claro para facilitar debugging.
 */
const getRequiredEnv = (name: string) => {
  const value = Deno.env.get(name);

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

/**
 * Escapa texto dinámico antes de insertarlo en HTML.
 *
 * Esto evita que contenido enviado por el usuario rompa el email
 * o inyecte HTML no deseado.
 */
const escapeHtml = (value: string | null | undefined) => {
  if (!value) return "";

  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

/**
 * Obtiene un nombre legible desde una ruta de Storage.
 *
 * Ejemplo:
 * consultas/uuid/123-1-contrato.pdf
 * →
 * 123-1-contrato.pdf
 */
const getFileNameFromPath = (path: string) => {
  return path.split("/").pop() ?? "archivo-adjunto";
};

/**
 * Normaliza texto para que entre en una sola celda de Excel.
 *
 * Evita saltos de línea y espacios raros que podrían romper el pegado.
 */
const normalizeOneLine = (
  value: string | number | boolean | null | undefined,
) => {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
};

/**
 * Escapa una celda para formato CSV.
 *
 * Envolvemos cada celda entre comillas para que Excel respete textos largos,
 * símbolos, espacios y posibles separadores internos.
 */
const toCsvCell = (value: string | number | boolean | null | undefined) => {
  const normalizedValue = normalizeOneLine(value);

  return `"${normalizedValue.replaceAll('"', '""')}"`;
};

/**
 * Formatea la fecha para mostrar en el email.
 */
const formatDate = (dateValue: string) => {
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date(dateValue));
};

/**
 * Formatea fecha en formato estable para gestión.
 *
 * Ejemplo:
 * 2026-05-04 18:30
 *
 * Usamos formatToParts para respetar zona horaria argentina
 * sin depender del timezone del servidor.
 */
const formatDateForExcel = (dateValue: string) => {
  const parts = new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Argentina/Buenos_Aires",
  }).formatToParts(new Date(dateValue));

  const getPart = (type: string) => {
    return parts.find((part) => part.type === type)?.value ?? "";
  };

  const year = getPart("year");
  const month = getPart("month");
  const day = getPart("day");
  const hour = getPart("hour");
  const minute = getPart("minute");

  return `${year}-${month}-${day} ${hour}:${minute}`;
};

/**
 * Construye un asunto filtrable y útil.
 *
 * Esto permite crear una regla en Gmail:
 * subject contains [Consulta Web Lachat]
 */
const buildEmailSubject = (record: ContactRequestRecord) => {
  const clientName = normalizeOneLine(record.full_name).slice(0, 80);
  const caseType = normalizeOneLine(record.case_type);

  return `[Consulta Web Lachat] ${caseType} | ${clientName}`;
};

/**
 * Crea un cliente administrador de Supabase.
 *
 * SUPABASE_URL:
 * - Supabase la expone automáticamente en Edge Functions.
 *
 * PROJECT_SECRET_KEY:
 * - La seteamos nosotros como secret.
 * - Es la key privada del proyecto.
 * - Se usa solo para generar signed URLs de archivos privados.
 */
const createSupabaseAdminClient = () => {
  const supabaseUrl = getRequiredEnv("SUPABASE_URL");
  const projectSecretKey = getRequiredEnv("PROJECT_SECRET_KEY");

  return createClient(supabaseUrl, projectSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

/**
 * Genera links firmados para cada archivo adjunto.
 *
 * Si no hay archivos, devuelve un array vacío.
 * Los links vencen en 15 días.
 */
const createSignedAttachments = async (
  filePaths: string[] = [],
): Promise<SignedAttachment[]> => {
  if (!filePaths.length) {
    return [];
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const signedAttachments: SignedAttachment[] = [];

  for (const path of filePaths) {
    const { data, error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(path, SIGNED_URL_EXPIRES_IN_SECONDS);

    if (error || !data?.signedUrl) {
      console.error("Signed URL error:", {
        path,
        error,
      });

      throw new Error(`Could not create signed URL for file: ${path}`);
    }

    signedAttachments.push({
      path,
      fileName: getFileNameFromPath(path),
      signedUrl: data.signedUrl,
    });
  }

  return signedAttachments;
};

/**
 * Construye una fila lista para copiar a Excel.
 *
 * Incluye:
 * - datos del cliente
 * - tipo de consulta
 * - mensaje resumido en una sola línea
 * - nombres de archivos
 * - links de descarga firmados por 15 días
 */
const buildExcelRow = (
  record: ContactRequestRecord,
  attachments: SignedAttachment[],
) => {
  const attachmentNames = attachments
    .map((attachment) => attachment.fileName)
    .join(" | ");

  const attachmentLinks = attachments
    .map((attachment) => attachment.signedUrl)
    .join(" | ");

  const row = [
    formatDateForExcel(record.created_at),
    "Nuevo",
    record.full_name,
    record.phone,
    record.email,
    record.case_type,
    record.message,
    attachments.length > 0 ? "Sí" : "No",
    attachments.length,
    attachmentNames,
    attachmentLinks,
    record.submission_id,
  ];

  return row.map(toCsvCell).join(";");
};

/**
 * Construye el bloque visible para copiar a Excel.
 *
 * Incluye encabezados + fila.
 */
const buildExcelCopyBlock = (
  record: ContactRequestRecord,
  attachments: SignedAttachment[],
) => {
  const headers = EXCEL_HEADERS.map(toCsvCell).join(";");
  const row = buildExcelRow(record, attachments);

  return `${headers}\n${row}`;
};

/**
 * Construye el bloque HTML de adjuntos.
 */
const buildAttachmentsHtml = (attachments: SignedAttachment[]) => {
  if (!attachments.length) {
    return `
      <p style="margin: 0; color: #557;">
        No se adjuntaron archivos.
      </p>
    `;
  }

  return `
    <ul style="padding-left: 18px; margin: 0;">
      ${attachments
        .map(
          (attachment) => `
            <li style="margin-bottom: 10px;">
              <a
                href="${escapeHtml(attachment.signedUrl)}"
                style="color: #0B6B78; font-weight: 700;"
                target="_blank"
                rel="noopener noreferrer"
              >
                Descargar ${escapeHtml(attachment.fileName)}
              </a>
            </li>
          `,
        )
        .join("")}
    </ul>

    <p style="margin-top: 12px; font-size: 13px; color: #667;">
      Los links de descarga son privados y vencen en 7 días.
    </p>
  `;
};

/**
 * Construye una sección del email pensada para gestión manual en Excel.
 *
 * La abogada puede copiar este bloque y pegarlo en una planilla.
 */
const buildExcelBlockHtml = (
  record: ContactRequestRecord,
  attachments: SignedAttachment[],
) => {
  const excelCopyBlock = buildExcelCopyBlock(record, attachments);

  return `
    <h2 style="margin: 28px 0 10px; font-size: 18px;">
      Datos para Excel
    </h2>

    <p style="margin: 0 0 10px; color: #557;">
      Copiar las siguientes dos líneas y pegarlas en Excel o Google Sheets.
    </p>

    <pre style="white-space: pre-wrap; word-break: break-word; margin: 0; padding: 14px; border-radius: 12px; background: #F7F1E6; border: 1px solid #E9D8B8; color: #082E3A; font-family: Consolas, Monaco, monospace; font-size: 12px; line-height: 1.5;">${escapeHtml(excelCopyBlock)}</pre>
  `;
};

/**
 * Construye el HTML completo del email.
 *
 * Usamos estilos inline porque los clientes de email
 * no soportan bien CSS moderno externo.
 */
const buildEmailHtml = (
  record: ContactRequestRecord,
  attachments: SignedAttachment[],
) => {
  return `
    <div style="margin: 0; padding: 0; background: #FFF9EF;">
      <div style="max-width: 680px; margin: 0 auto; padding: 32px 20px; font-family: Arial, sans-serif; color: #082E3A; line-height: 1.6;">
        <div style="border: 1px solid #E4D4B2; border-radius: 18px; overflow: hidden; background: #FFFFFF;">
          <div style="padding: 26px 28px; background: #082E3A; color: #FFF9EF;">
            <p style="margin: 0 0 8px; color: #D7B56D; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">
              Nueva consulta
            </p>

            <h1 style="margin: 0; font-size: 26px; line-height: 1.2; font-weight: 700;">
              Nueva consulta desde Estudio Lachat
            </h1>
          </div>

          <div style="padding: 28px;">
            <p style="margin-top: 0;">
              Se recibió una nueva consulta desde el formulario formal del sitio web.
            </p>

            <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
              <tbody>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #EEE; font-weight: 700;">Fecha</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #EEE;">${escapeHtml(formatDate(record.created_at))}</td>
                </tr>

                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #EEE; font-weight: 700;">Estado sugerido</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #EEE;">Nuevo</td>
                </tr>

                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #EEE; font-weight: 700;">Nombre</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #EEE;">${escapeHtml(record.full_name)}</td>
                </tr>

                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #EEE; font-weight: 700;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #EEE;">${escapeHtml(record.email)}</td>
                </tr>

                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #EEE; font-weight: 700;">Teléfono / WhatsApp</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #EEE;">${escapeHtml(record.phone)}</td>
                </tr>

                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #EEE; font-weight: 700;">Tipo de consulta</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #EEE;">${escapeHtml(record.case_type)}</td>
                </tr>
              </tbody>
            </table>

            <h2 style="margin: 24px 0 10px; font-size: 18px;">
              Mensaje
            </h2>

            <div style="padding: 16px; border-radius: 12px; background: #FFF9EF; border: 1px solid #E9D8B8;">
              <p style="margin: 0; white-space: pre-line;">${escapeHtml(record.message)}</p>
            </div>

            <h2 style="margin: 28px 0 10px; font-size: 18px;">
              Adjuntos
            </h2>

            ${buildAttachmentsHtml(attachments)}

            ${buildExcelBlockHtml(record, attachments)}

            <div style="margin-top: 28px; padding-top: 18px; border-top: 1px solid #EEE;">
              <p style="margin: 0; font-size: 12px; color: #667;">
                ID de consulta: ${escapeHtml(record.submission_id)}
              </p>
            </div>
          </div>
        </div>

        <p style="margin: 18px 0 0; font-size: 12px; color: #667; text-align: center;">
          Email automático generado por el formulario web de Estudio Jurídico Lachat.
        </p>
      </div>
    </div>
  `;
};

/**
 * Construye una versión texto plano del email.
 *
 * Buena práctica para compatibilidad con clientes de correo.
 * También incluimos una fila lista para copiar a Excel.
 */
const buildEmailText = (
  record: ContactRequestRecord,
  attachments: SignedAttachment[],
) => {
  const attachmentLines = attachments.length
    ? attachments
        .map(
          (attachment) => `- ${attachment.fileName}: ${attachment.signedUrl}`,
        )
        .join("\n")
    : "Sin archivos adjuntos.";

  return `
Nueva consulta desde Estudio Lachat

Fecha: ${formatDate(record.created_at)}
Estado sugerido: Nuevo
Nombre: ${record.full_name}
Email: ${record.email}
Teléfono / WhatsApp: ${record.phone}
Tipo de consulta: ${record.case_type}

Mensaje:
${record.message}

Adjuntos:
${attachmentLines}

Los links de descarga son privados y vencen en 15 días.

Datos para Excel:
${buildExcelCopyBlock(record, attachments)}

ID de consulta:
${record.submission_id}
  `.trim();
};

/**
 * Envía el email con Resend.
 */
const sendNotificationEmail = async (
  record: ContactRequestRecord,
  attachments: SignedAttachment[],
) => {
  const resendApiKey = getRequiredEnv("RESEND_API_KEY");
  const notificationEmail = getRequiredEnv("NOTIFICATION_EMAIL");

  /**
   * FROM_EMAIL se configura como secret.
   *
   * Ejemplo recomendado:
   * Estudio Lachat <consultas@notificaciones.estudiolachat.com.ar>
   */
  const fromEmail =
    Deno.env.get("FROM_EMAIL") ?? "Estudio Lachat <onboarding@resend.dev>";

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [notificationEmail],
      subject: buildEmailSubject(record),
      html: buildEmailHtml(record, attachments),
      text: buildEmailText(record, attachments),
    }),
  });

  const resendResult = await resendResponse.json();

  if (!resendResponse.ok) {
    console.error("Resend API error:", resendResult);

    throw new Error("Resend failed to send notification email.");
  }

  return resendResult;
};

type AppendToGoogleSheetParams = {
  record: ContactRequestRecord;
  attachments: SignedAttachment[];
};

/**
 * Envía la consulta a Google Sheets mediante Apps Script.
 *
 * Decisión de arquitectura:
 * - Si Google Sheets falla, NO rompemos el flujo completo.
 * - El email ya es la notificación principal.
 * - La planilla es una automatización operativa.
 *
 * Por eso esta función lanza error, pero el handler principal
 * la va a capturar sin devolver 500 al webhook.
 */
const appendToGoogleSheet = async ({
  record,
  attachments,
}: AppendToGoogleSheetParams) => {
  const sheetsWebhookUrl = getRequiredEnv("SHEETS_WEBHOOK_URL");
  const sheetsWebhookSecret = getRequiredEnv("SHEETS_WEBHOOK_SECRET");

  const attachmentNames = attachments
    .map((attachment) => attachment.fileName)
    .join(" | ");

  const attachmentLinks = attachments
    .map((attachment) => attachment.signedUrl)
    .join(" | ");

  const url = new URL(sheetsWebhookUrl);

  /**
   * Apps Script recibe este secret como query param.
   * Lo hacemos así porque los headers personalizados pueden ser más incómodos
   * de leer en Web Apps simples.
   */
  url.searchParams.set("secret", sheetsWebhookSecret);

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      createdAt: formatDateForExcel(record.created_at),
      status: "Nuevo",
      fullName: record.full_name,
      phone: record.phone,
      email: record.email,
      caseType: record.case_type,
      message: normalizeOneLine(record.message),
      hasFiles: attachments.length > 0,
      attachmentsCount: attachments.length,
      attachmentNames,
      attachmentLinks,
      submissionId: record.submission_id,
    }),
  });

  const result = await response.json();

  if (!response.ok || result.ok === false) {
    console.error("Google Sheets webhook error:", result);

    throw new Error("Google Sheets webhook failed.");
  }

  return result;
};

/**
 * Handler principal.
 */
Deno.serve(async (request) => {
  try {
    /**
     * La función solo acepta POST.
     * El Database Webhook de Supabase enviará requests POST.
     */
    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    /**
     * Seguridad del webhook.
     *
     * Como desplegamos la función con --no-verify-jwt,
     * validamos un secret propio enviado por header:
     *
     * x-webhook-secret: <WEBHOOK_SECRET>
     */
    const webhookSecret = getRequiredEnv("WEBHOOK_SECRET");
    const requestSecret = request.headers.get("x-webhook-secret");

    if (requestSecret !== webhookSecret) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    const payload = (await request.json()) as DatabaseWebhookPayload;

    /**
     * Validamos que sea exactamente el evento esperado:
     * INSERT sobre public.contact_requests.
     */
    const isExpectedInsert =
      payload.type === "INSERT" &&
      payload.schema === "public" &&
      payload.table === "contact_requests" &&
      Boolean(payload.record);

    if (!isExpectedInsert || !payload.record) {
      return jsonResponse({ ignored: true });
    }

    const record = payload.record;

    /**
     * 1. Generamos links firmados para adjuntos privados.
     * 2. Enviamos email al estudio.
     */
    const signedAttachments = await createSignedAttachments(
      record.file_paths ?? [],
    );

    const emailResult = await sendNotificationEmail(record, signedAttachments);

    /**
     * Automatización secundaria:
     * intentamos guardar la consulta en Google Sheets.
     *
     * Si falla, lo registramos en logs pero no rompemos la notificación por email.
     * Esto evita duplicar emails o generar falsos errores para el usuario.
     */
    let sheetsResult: unknown = null;
    let sheetsError: string | null = null;

    try {
      sheetsResult = await appendToGoogleSheet({
        record,
        attachments: signedAttachments,
      });
    } catch (error) {
      sheetsError =
        error instanceof Error ? error.message : "Unknown Sheets error";

      console.error("appendToGoogleSheet failed:", error);
    }

    return jsonResponse({
      ok: true,
      attachmentsCount: signedAttachments.length,
      email: emailResult,
      sheets: {
        ok: !sheetsError,
        result: sheetsResult,
        error: sheetsError,
      },
    });
  } catch (error) {
    console.error("notify-contact-request error:", error);

    return jsonResponse(
      {
        error: "Unexpected function error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      500,
    );
  }
});
