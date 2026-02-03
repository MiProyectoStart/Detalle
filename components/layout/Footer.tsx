// components/layout/Footer.tsx
'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Camera, Check } from 'lucide-react';
import { playfair } from '@/app/fonts';

export default function Footer({ project }: { project: any }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  // Usamos el año actual dinámicamente
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-10 px-6 md:px-20 relative">
      
      <div className="max-w-7xl mx-auto">
        {/* SECCIÓN SUPERIOR: Nombres, Subtítulo e Iconos */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          
          {/* Izquierda: Tipografía Elegante */}
          <div className="text-center md:text-left space-y-2">
            <h2 className={`text-3xl md:text-4xl ${playfair.className} italic leading-tight`}>
              {project.footerNames || project.namesLogo}
            </h2>
            <p className="text-gray-400 text-sm font-light">
              {project.footerSubtitle}
            </p>
          </div>

          {/* Derecha: Iconos Funcionales */}
          <div className="flex items-center gap-4">
            {/* Icono de Cámara (Decorativo por ahora, podría abrir la galería) */}
            <button 
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              title="Ver Galería"
            >
              <Camera size={18} className="text-gray-300" />
            </button>

            {/* Icono de Compartir (Funcional) */}
            <div className="relative">
              <button 
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                title="Copiar enlace"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check size={18} className="text-accent" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="share"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Share2 size={18} className="text-gray-300" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              
              {/* Tooltip de "Copiado!" */}
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap"
                  >
                    ¡Enlace copiado!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Línea Divisoria Sutil */}
        <div className="h-px w-full bg-white/10 mb-8" />

        {/* SECCIÓN INFERIOR: Copyright */}
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-medium">
            SIEMPRE Y PARA SIEMPRE © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}