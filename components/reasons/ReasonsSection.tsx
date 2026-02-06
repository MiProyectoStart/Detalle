// components/reasons/ReasonsSection.tsx
'use client'
import { motion } from 'framer-motion';
import ReasonCard from './ReasonCard';
import { Heart } from 'lucide-react';
// app/fonts.ts
import { playfair } from '@/app/fonts';




export default function ReasonsSection({ reasons }: { reasons: any[] }) {
  if (!reasons || reasons.length === 0) return null;

  const sortedReasons = [...reasons].sort((a, b) => 
    (parseInt(a.reasonNumber) || 0) - (parseInt(b.reasonNumber) || 0)
  );

  return (
    <section id="razones" className="relative py-12 md:py-24 px-4 sm:px-8 md:px-12 lg:px-24 bg-[#050505] overflow-hidden z-0">
      
      {/* Luces Ambientales */}
      
      <div className="absolute top-0 right-0 w-[200 md:300px] h-[200 md:300px] bg-accent/10 blur-[80 md:120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200 md:300px] h-[200 md:300px] bg-pink-500/5 blur-[80 md:120px] pointer-events-none" />

      <div className="max-w-[1500px] mx-auto relative z-10">
        
        {/* Cabecera Responsiva */}
        <div className="flex flex-col items-center gap-4 mb-12 md:mb-20 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            {reasons.length} motivos por los que <br />
            <span className={`italic font-serif text-accent md:text-white ${playfair.className}`} >te elijo a ti</span>
          </h2>

          

          <p className={`text-gray-400 text-[16px] mt-1`}>
            <span>Toca cada una de las tarjetas para leer porque eres la persona más especial en mi vida</span>
        
          </p>

        </div>

        {/* Grid Inteligente: 2 cols en móvil, 3 en tablet, 5 en desktop */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6 lg:gap-8 xl:gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
        >
          {sortedReasons.map((reason) => (
            <motion.div
              key={reason.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
            >
              <ReasonCard reason={reason} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
            <p className="text-[9px] uppercase tracking-[0.8em] text-white/20 font-black">
              Y mil razones más que no caben aquí
            </p>
        </div>
      </div>
    </section>
  );
}