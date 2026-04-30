import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Approach from "./sections/Approach";
import Process from "./sections/Process";
import FAQ from "./sections/FAQ";
import Contact from "./sections/Contact";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Footer from "./sections/Footer";

// App organiza la landing completa.
// Cada sección vive en su propio archivo para mantener el proyecto escalable.

export default function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF9EF] text-[#082E3A]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(215,181,109,0.14),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(8,46,58,0.05),transparent_25%)]" />

      <Header />
      <Hero />
      <Services />
      <Approach />
      <Process />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}