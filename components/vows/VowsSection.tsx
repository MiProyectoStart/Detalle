// components/vows/VowsSection.tsx
'use client'
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { playfair } from '@/app/fonts';

export default function VowsSection({ vows }: { vows: any[] }) {
  if (vows.length === 0) return null;

  return (
    <section id="futuro" className="relative py-24 md:py-24 bg-[#050505] overflow-hidden z-0">
      
      {/* Luces de fondo ambientales */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-5%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent/10 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-accent/5 rounded-full blur-[100px] md:blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cabecera Tipo Galería - Optimizada para móvil */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-32 gap-8">
          <div className="space-y-4">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="flex items-center gap-4 text-accent"
            >
              <div className="w-8 md:w-12 h-px bg-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">promesas</span>
            </motion.div>
            <h2 className="text-5xl sm:text-7xl md:text-9xl font-bold tracking-tighter leading-none text-white">
              Nuestro <br /> <span className="text-accent italic font-serif">Mañana</span>
            </h2>
          </div>
          <p className="max-w-[320px] text-gray-500 text-sm md:text-base font-medium leading-relaxed border-l border-white/10 pl-6">
            Un amor no es perfecto, pero sí constante. Estas son las promesas que elijo cumplir contigo cada día.
          </p>
        </div>

        {/* Grid de Promesas - Altura Igualada */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {vows.map((vow, index) => {
            const Icon = (LucideIcons as any)[vow.iconName] || LucideIcons.Sparkles;
            
            return (
              <motion.div
                key={vow.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex h-full" // Asegura que el contenedor ocupe todo el alto del grid
              >
                {/* La "Aura Card" con h-full para igualar tamaños */}
                <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 p-8 sm:p-10 transition-all duration-700 hover:border-accent/40 group hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col w-full h-full">
                  
                  {/* Destello de fondo al Hover */}
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Icono Flotante */}
                  <div className="flex justify-between items-start mb-8 md:mb-12">
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent blur-2xl opacity-0 group-hover:opacity-40 transition-opacity scale-150" />
                      <Icon size={32} strokeWidth={1} className="relative text-accent group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <span className="text-[10px] font-black text-white/20 tracking-[0.3em] uppercase group-hover:text-accent/40 transition-colors">
                      Promesa {index + 1}
                    </span>
                  </div>

                  {/* Palabra Clave */}
                  <h3 className="text-xs font-black tracking-[0.4em] text-accent uppercase mb-4 md:mb-6 opacity-80">
                    {vow.keywordValue}
                  </h3>

                  {/* La Promesa - Flex-grow para empujar la decoración al fondo */}
                  <p className="text-gray-400 font-light leading-relaxed text-lg">
                    "{vow.promiseText}"
                  </p>

                  {/* Decoración Final de la Card */}
                  <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center opacity-30 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1">
                       <div className="w-1 h-1 rounded-full bg-accent" />
                       <div className="w-8 h-px bg-accent/50 self-center" />
                    </div>
                    <LucideIcons.Heart size={14} className="text-accent shadow-sm" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Cierre de sección con gradiente de salida */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20" />
    </section>
  );
}