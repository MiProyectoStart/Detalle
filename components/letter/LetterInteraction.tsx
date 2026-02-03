// app/[slug]/carta/LetterInteraction.tsx
'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playfair, dancingScript } from '@/app/fonts';
import { Heart,ArrowLeft } from 'lucide-react';
import Link from 'next/link';


export default function LetterInteraction({ letter, slug }: { letter: any , slug : string}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">


        {/* 1. BOTÓN DE REGRESAR (Siempre visible) */}
      <Link 
        href={`/${slug}`}
        className="fixed top-8 left-6 md:left-12 z-[110] flex items-center gap-3 text-white/30 hover:text-white transition-all group"
      >
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-colors">
          <ArrowLeft size={18} />
        </div>
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold hidden sm:block">
          Volver al proyecto
        </span>
      </Link>


      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* --- ESTADO 1: EL SOBRE --- */
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -50, filter: "blur(10px)" }}
            className="flex flex-col items-center gap-12 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <span className="text-white/40 text-[10px] tracking-[0.5em] uppercase font-bold">
              Una sorpresa para ti
            </span>

            <div className="relative w-[320px] h-[220px] md:w-[450px] md:h-[300px]">
              <div className="absolute inset-0 bg-[#f4f1ea] rounded-sm shadow-2xl overflow-hidden border border-black/5">
                {/* Líneas de pliegue del sobre */}
                <div className="absolute top-0 left-0 w-full h-full border-t-[150px] md:border-t-[200px] border-t-transparent border-l-[160px] md:border-l-[225px] border-l-black/[0.03] border-r-[160px] md:border-r-[225px] border-r-black/[0.03]" />
              </div>

              {/* Sello de Lacre */}
              <motion.div whileHover={{ scale: 1.1 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#b22222] rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] flex items-center justify-center border-4 border-[#8b0000]/30">
                  <Heart size={24} className="text-white/80 fill-white/20" />
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-white/20">
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/40 to-transparent mx-auto" />
              </motion.div>
              <span className="text-white/30 text-[9px] tracking-[0.3em] uppercase font-black">Pulsa para abrir</span>
            </div>
          </motion.div>
        ) : (
          /* --- ESTADO 2: LA CARTA REVELADA --- */
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="relative w-full max-w-[600px] bg-[#fdfcf7] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-12 md:p-20 rounded-sm origin-bottom"
          >
            {/* Adornos y Bordes de Papel */}
            <div className="absolute inset-4 border border-[#e5e1d8] pointer-events-none" />

            <div className="relative space-y-12">
              <div className="flex justify-center">
                <div className="w-8 h-8 rounded-full border border-[#d4cfc3] flex items-center justify-center text-[#c5a4a4]">
                  <span className="text-xs">✿</span>
                </div>
              </div>

              {/* Saludo Dinámico */}
              <h1 className={`text-2xl md:text-3xl text-[#333] ${playfair.className}`}>
                {letter.title}
              </h1>

              {/* Contenido Dinámico con Capitular (Drop Cap) */}
              <p className={`text-[#555] text-lg md:text-sd leading-[1.8] text-justify ${playfair.className} whitespace-pre-line`}>
                <span className="float-left text-6xl md:text-7xl leading-[0.8] mr-3 mt-1 text-[#b22222] font-serif uppercase">
                  {letter.content.charAt(0)}
                </span>
                {letter.content.slice(1)}
              </p>

              {/* Firma y Despedida Dinámica */}
              <div className="pt-12 flex flex-col items-end gap-2 border-t border-[#e5e1d8]">
                <span className="text-[#888] italic text-sm">{letter.farewellPhrase}</span>
                <span className={`${dancingScript.className} text-4xl md:text-5xl text-[#222] mt-2`}>
                  {letter.senderName}
                </span>
                <div className="w-32 h-[1px] bg-[#d4cfc3] mt-2" />
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)} 
              className="mt-12 w-full text-center text-[#c5a4a4] hover:text-[#b22222] text-[10px] uppercase tracking-widest transition-colors font-bold"
            >
              Cerrar sobre
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}