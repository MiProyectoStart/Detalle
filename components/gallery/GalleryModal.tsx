'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Quote } from 'lucide-react';
import Image from 'next/image';

interface ModalProps {
  moment: any;
  onClose: () => void;
}

export default function GalleryModal({ moment, onClose }: ModalProps) {
  if (!moment) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
        
        {/* 1. Fondo Backdrop (Blur más intenso) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/95 backdrop-blur-2xl cursor-pointer"
        />

        {/* 2. Contenedor Principal del Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 40 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-6xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row h-[65vh] lg:h-[65vh]"
        >
          
          {/* --- Botón Cerrar Flotante --- */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-3 bg-black/60 backdrop-blur-md hover:bg-accent rounded-full text-white/80 hover:text-white transition-all duration-300 group border border-white/5"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform" />
          </button>

          {/* --- COLUMNA IZQUIERDA: IMAGEN --- */}
          {/* En móvil ocupa el 45% de la altura, en desktop el 55% del ancho */}
          <div className="relative h-[45%] lg:h-full w-full lg:w-[55%] bg-black">
            <Image 
              src={moment.imageUrl} 
              alt={moment.title} 
              fill 
              className="object-cover"
              priority // Carga prioritaria para la imagen principal
            />
            {/* Gradiente sutil para integrar la imagen con el fondo */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent opacity-60" />
          </div>

          {/* --- COLUMNA DERECHA: CONTENIDO (Scrollable) --- */}
          <div className="flex flex-col h-[55%] lg:h-full w-full lg:w-[45%] bg-linear-to-br from-[#0a0a0a] to-[#111]">
            
            {/* Cabecera Fija */}
            <div className="p-8 lg:p-12 mb-[-48] shrink-0">
              <div className="flex items-center gap-3 text-accent mb-4 opacity-80">
                <Camera size={16} />
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase">Detalle del Recuerdo</span>
              </div>
              <h2 className="text-2xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                {moment.title}
              </h2>
              <div className="w-20 h-1.5 bg-accent mt-4 rounded-full opacity-80" />
            </div>

            {/* Cuerpo de Texto Scrolleable */}
            <div className="flex-1 overflow-y-auto p-8 lg:p-12 pt-2 space-y-6 lg:mt-0  mt-4 custom-scrollbar">
              <Quote size={32} className="text-white/10 mb-2" />
              <p className="text-gray-300 text-lg lg:text-xl font-light leading-relaxed whitespace-pre-line">
                {moment.description}
              </p>
            </div>

            {/* Pie Fijo (Opcional, para fecha o firma) */}
            <div className="p-6 lg:px-12 border-t border-white/5 text-right flex-shrink-0 bg-[#0a0a0a]">
               <p className="text-xs uppercase tracking-widest text-white/40 font-bold">
                 Guardado en nuestra historia
               </p>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}