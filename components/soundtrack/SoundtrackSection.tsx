// components/soundtrack/SoundtrackSection.tsx
'use client'
import { motion } from 'framer-motion';
import { Music, Disc, Volume2, Sparkles } from 'lucide-react';
import { playfair } from '@/app/fonts';

export default function SoundtrackSection({ project }: { project: any }) {
  if (!project.showSoundtrack || !project.spotifyTrackId) return null;

  return (
    <section id="musica" className="relative py-40 bg-[#050505] overflow-hidden z-0">
      
      {/* Elementos Decorativos de Fondo */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LADO 1: TEXTO EDITORIAL */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 text-whitet">
              <Sparkles size={16} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Music Experience</span>
            </div>

            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-none">
              Nuestra <br />
              <span className="text-accent italic font-serif">Sinfonía</span>
            </h2>

            <div className="relative pl-8 border-l border-accent/30">
              <p className={`text-2xl md:text-3xl text-gray-300 leading-tight ${playfair.className} italic`}>
                "{project.soundtrackIntro || "La melodía que le da sentido a cada uno de nuestros momentos."}"
              </p>
            </div>

            <div className="flex items-center gap-4 opacity-40">
              <Volume2 size={16} className="text-white" />
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [4, 16, 4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 bg-accent rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* LADO 2: EL REPRODUCTOR "VINYL GLASS" */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative group"
          >
            {/* Vinilo decorativo que sobresale en Hover */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -right-12 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#111] border-[10px] border-black shadow-2xl z-0 hidden md:flex items-center justify-center transition-transform group-hover:translate-x-12"
            >
              <div className="w-full h-full rounded-full border border-white/5 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-accent/20 flex items-center justify-center">
                   <Disc className="text-accent/40" size={20} />
                </div>
              </div>
            </motion.div>

            {/* Tarjeta de Cristal para el Iframe */}
            <div className="relative z-10 bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-4 md:p-8 rounded-[3rem] shadow-2xl">
              <div className="mb-6 flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <Music size={18} className="text-accent opacity-50" />
              </div>

              <div className="rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(var(--accent-color-rgb),0.2)]">
                <iframe
                  src={`https://open.spotify.com/embed/track/${project.spotifyTrackId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="bg-black/20"
                ></iframe>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}