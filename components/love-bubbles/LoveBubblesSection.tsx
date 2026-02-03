// components/love-bubbles/LoveBubblesSection.tsx
'use client'
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import PolaroidCard from './PolaroidCard';

export default function LoveBubblesSection({ bubbles }: { bubbles: any[] }) {
  if (bubbles.length === 0) return null;

  // Generamos rotaciones aleatorias fijas para cada renderizado
  const rotations = bubbles.map(() => Math.random() * 6 - 3); // Entre -3deg y +3deg

  return (
    // Fondo oscuro con textura sutil
    <section id="burbujas" className="py-20 bg-[#050505]   overflow-hidden relative z-0">
      
      {/* Sombra de viñeta en el fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cabecera Temática */}
        <div className="text-center mb-20 space-y-4">
       
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white"
          >
            Cosas que  <span className="text-accent italic font-serif relative">
              te agradezco
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-accent/20"></span>
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed"
          >
            Cada imagen esconde un momento especial. Toca para descubrir el sentimiento detrás de cada momento.
          </motion.p>
        </div>

        {/* GRID TIPO POLAROID (5 columnas como en la referencia) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 px-4 md:px-0">
          {bubbles.map((bubble, index) => (
            <motion.div
              key={bubble.id}
              initial={{ opacity: 0, y: 50, rotate: rotations[index] }}
              whileInView={{ opacity: 1, y: 0, rotate: rotations[index] }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "backOut" }}
              viewport={{ once: true, margin: "-100px" }}
              // Efecto de "levantar" al pasar el mouse
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10, transition: { duration: 0.2 } }}
              className="p-2" // Espacio para la sombra
            >
              <PolaroidCard 
                bubble={bubble} 
                index={index} 
                rotation={rotations[index]}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}