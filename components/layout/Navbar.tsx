// components/layout/Navbar.tsx
'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, CalendarHeart, Music  } from 'lucide-react';

export default function Navbar({ logo }: { logo: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  // 1. Lógica para detectar el scroll y la sección activa
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Observer para detectar qué sección está visible
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Detecta cuando la sección está cerca del centro
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observar todas las secciones que tienen ID
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const links = [
    { name: 'Inicio', href: '#inicio', id: 'inicio' },
    { name: 'Galeria', href: '#galeria', id: 'galeria' },
    { name: 'Tiempo', href: '#tiempo', id: 'tiempo' },
    { name: 'Razones', href: '#razones', id: 'razones' },
    { name: 'Agradecimiento', href: '#burbujas', id: 'burbujas' }, // Vinculado a burbujas
    { name: 'Futuro', href: '#futuro', id: 'futuro' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-12">
        {/* 1. LOGO */}
        <div className="flex items-center gap-2">
          <CalendarHeart className="text-accent" size={24} />
          <span className="font-bold tracking-tighter text-2xl text-white">
            {logo}
          </span>
        </div>

        {/* 2. MENU DESKTOP con Indicador Activo */}
        <div className="hidden lg:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-medium">
          {links.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a 
                key={link.name} 
                href={link.href} 
                className={`transition-all duration-300 relative group `}
              >
                {link.name}
                {/* Línea sutil debajo del link activo */}
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 w-full h-px bg-accent"
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* 3. BOTONES DE ACCIÓN */}
        <div className="flex items-center gap-3">
          <a href="#musica">
            <button className="p-2.5 bg-accent-500/20 rounded-full text-accent border border-accent-500/30 hover:bg-accent-500/30 transition">
              <Music size={18} />
            </button>
          </a>


          <button className="hidden lg:block px-8 py-2.5 bg-accent rounded-full font-bold text-sm text-white hover:opacity-90 transition shadow-lg shadow-accent-500/20">
            Abrir
          </button>
          
          <button className="lg:hidden text-white p-1" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* 4. MENU MOBILE */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 flex flex-col p-8 space-y-6 lg:hidden animate-in slide-in-from-top duration-300 shadow-2xl">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-lg uppercase tracking-widest font-bold border-b border-white/5 pb-2 transition-colors ${
                  activeSection === link.id ? 'text-accent' : 'text-white/70'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="w-full py-4 bg-accent rounded-2xl font-bold text-base text-white shadow-xl mt-4">
              Abrir Proyecto
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}