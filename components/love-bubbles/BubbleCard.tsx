// components/love-bubbles/BubbleCard.tsx
'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Heart, Sparkles, X } from 'lucide-react';
import { playfair } from '@/app/fonts';

interface BubbleCardProps {
  bubble: any;
  index: number;
  size: {
    span: string;
    height: string;
    priority: boolean;
  };
  className: string;
}

export default function BubbleCard({ bubble, index, size, className }: BubbleCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsRevealed(!isRevealed)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-3xl md:rounded-[2.5rem] overflow-hidden cursor-pointer group 
                  border-2 border-white/5 transition-all duration-500 
                  ${isRevealed 
                    ? 'border-accent/50 shadow-[0_0_60px_rgba(var(--accent-color-rgb),0.25)]' 
                    : 'hover:border-accent/30 hover:shadow-[0_0_30px_rgba(var(--accent-color-rgb),0.15)]'
                  } 
                  ${className}`}
    >
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="front"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {/* Contenedor de imagen optimizado */}
            <div className="relative w-full h-full">
              <Image
                src={bubble.imageUrl}
                alt={`Recuerdo especial #${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority={size.priority}
                quality={90}
                className={`object-cover transition-all duration-700
                          ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
                          group-hover:scale-110`}
                onLoadingComplete={() => setImageLoaded(true)}
              />
              
              {/* Overlay gradiente mejorado */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

           

            {/* Indicador de interacción */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <Sparkles size={14} className="text-accent" />
                <span className="text-xs font-medium text-white">
                  Haz clic para revelar
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center items-center text-center 
                      bg-gradient-to-br from-[#0a0a0a] to-[#111111] backdrop-blur-xl"
          >
            {/* Botón de cerrar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsRevealed(false);
              }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center 
                        rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md 
                        transition-colors duration-300"
            >
              <X size={16} className="text-white" />
            </button>

            {/* Ícono de corazón animado */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="mb-4 md:mb-6"
            >
              <Heart 
                size={24} 
                className="text-accent  animate-pulse" 
              />
            </motion.div>

            {/* Texto revelado con mejor tipografía */}
            <div className="space-y-4 max-w-md">
               <p className="text-white text-lg md:text-xl leading-relaxed font-medium">
              {bubble.revealedText}
            </p>
              
              {/* Número de la burbuja */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-accent/70 text-sm font-medium">
                  Razón #{index + 1}
                </span>
              </div>
            </div>

            {/* Indicador para volver */}
            <div className="absolute bottom-6 opacity-60">
              <span className="text-xs text-gray-400 font-medium">
                Toca para volver
              </span>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>

      {/* Efecto de borde animado */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          boxShadow: isRevealed 
            ? 'inset 0 0 0 2px rgba(var(--accent-color-rgb), 0.2)' 
            : 'none'
        }}
        animate={{
          boxShadow: isRevealed
            ? [
                'inset 0 0 0 0px rgba(var(--accent-color-rgb), 0)',
                'inset 0 0 0 2px rgba(var(--accent-color-rgb), 0.2)',
              ]
            : 'none'
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}