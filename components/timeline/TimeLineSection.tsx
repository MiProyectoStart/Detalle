// components/timeline/TimelineSection.tsx
'use client'
import { motion, useScroll, useSpring } from 'framer-motion';
import { CalendarHeart, Heart, HeartPlus } from 'lucide-react';
import Image from 'next/image';
import { playfair } from '@/app/fonts';
import { useRef } from 'react';



export default function TimelineSection({ events }: { events: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Lógica para que la línea crezca al hacer scroll
  const { scrollYProgress } = useScroll();


  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (events.length === 0) return null;

  return (
    <section id="tiempo" ref={containerRef} className="py-0 bg-[#050505] relative overflow-hidden">
      {/* Título de Sección */}
      <div className="px-6 md:px-20 mb-20 text-center ">
        <p className="text-white font-bold tracking-[0.6em] text-[10px] uppercase mb-4">Linea del tiempo</p>
        <h2 className="text-5xl md:text-7xl font-bold -tracking-wide">Nuestra <span className="text-accent italic font-serif">Historia</span></h2>
        <p className={`text-gray-400 text-[16px] mt-4 ${playfair.className}`}>
          Un viaje de amor, paso a paso
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* CONTENEDOR DE LA LÍNEA: Termina justo antes del corazón final */}
        <div className="absolute left-1/2 top-0 bottom-[140px] w-[2px] bg-white/5 hidden lg:block -translate-x-1/2" />
        <motion.div 
          style={{ scaleY }}
          className="absolute left-1/2 top-0 bottom-[140px] w-[2px] bg-gradient-to-b from-accent via-accent/50 to-transparent hidden lg:block -translate-x-1/2 origin-top z-0 shadow-[0_0_15px_var(--accent-color)]"
        />

        <div className="space-y-20 lg:space-y-0">
          {events.map((event, index) => (
            <div key={event.id} className={`relative flex flex-col lg:flex-row items-center justify-between lg:mb-32 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* PUNTO DE CONEXIÓN */}
              <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center z-10">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  className="relative flex items-center justify-center"
                >
                  <div className="w-6 h-6 rounded-full bg-accent relative z-10 shadow-[0_0_20px_var(--accent-color)]" />
                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-accent animate-ping opacity-50" />
                  <Heart size={10} className="text-black/50 absolute z-20" />
                </motion.div>
              </div>

              {/* LADO DE LA IMAGEN */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-[45%] aspect-[4/3] relative rounded-[3rem] overflow-hidden border border-white/10 group shadow-2xl"
              >
                <Image 
                  src={event.imageUrl} 
                  alt={event.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </motion.div>

              {/* LADO DEL TEXTO */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-[45%] mt-8 lg:mt-0 text-left"
              >
                <div className="flex items-center gap-3 text-accent mb-3">
                  <CalendarHeart size={16} />
                  <span className="text-sm font-bold tracking-widest uppercase">{event.eventDate}</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{event.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed text-lg">
                  {event.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-white/20">
                   <Heart size={12} className="fill-white/10" />
                   <div className="h-px w-12 bg-white/10" />
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* --- CIERRE DE LA LÍNEA (Basado en tu imagen) --- */}
        <div className="relative flex flex-col items-center mt-20 pb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            {/* Círculo del Corazón Final */}
            <div className="relative flex items-center justify-center">
                {/* Brillo exterior */}
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse" />
                
                {/* El Círculo donde topa la línea */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-black border border-accent/40 flex items-center justify-center shadow-[0_0_30px_rgba(244,37,89,0.2)]">
                    <HeartPlus size={24} className="text-accent fill-accent/10" />
                </div>
            </div>

            {/* Texto Final */}
            <p className={`mt-10 text-white/70 text-2xl md:text-4xl text-center leading-tight ${playfair.className}`}>
                Y muchos más momentos por venir..
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}