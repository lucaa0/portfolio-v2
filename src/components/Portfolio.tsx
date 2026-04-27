import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Navbar from './sections/Navbar';
import Footer from './sections/Footer';

export default function Portfolio() {
  return (
    <div className="min-h-screen flex flex-col pt-[80px]">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
