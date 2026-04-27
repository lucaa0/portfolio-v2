import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 font-label-caps border-b ${scrolled ? 'bg-[#0B0B0B]/80 backdrop-blur-md border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]' : 'bg-transparent border-transparent'}`}>
      <div className="flex justify-between items-center px-8 py-4 max-w-container-max mx-auto">
        <div className="text-xl font-bold tracking-tighter text-white font-h3">Luca Enea</div>
        
        <div className="hidden md:flex gap-8 items-center text-sm font-medium tracking-tight">
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-primary border-b-2 border-primary pb-1 hover:text-primary transition-all duration-300 active:scale-95">Home</button>
          <button onClick={() => scrollTo('projects')} className="text-on-surface-variant hover:text-white hover:text-primary transition-all duration-300 active:scale-95">Projects</button>
          <button onClick={() => scrollTo('experience')} className="text-on-surface-variant hover:text-white hover:text-primary transition-all duration-300 active:scale-95">Experience</button>
          <button onClick={() => scrollTo('skills')} className="text-on-surface-variant hover:text-white hover:text-primary transition-all duration-300 active:scale-95">Skills</button>
          <button onClick={() => scrollTo('contact')} className="text-on-surface-variant hover:text-white hover:text-primary transition-all duration-300 active:scale-95">Contact</button>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => scrollTo('contact')} className="hidden md:block bg-primary-container text-on-primary-container px-6 py-2 rounded-DEFAULT hover:shadow-[0_0_20px_rgba(0,163,255,0.4)] transition-all font-label-caps uppercase tracking-wider">
            Hire Me
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer flex items-center justify-center">
            <span className="material-symbols-outlined">terminal</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
