// components/reasons/ReasonCard.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'

export default function ReasonCard({ reason }: { reason: any }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const Icon = (LucideIcons as any)[reason.iconName] || LucideIcons.Heart

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="relative w-full perspective-2000 cursor-pointer aspect-[3/4.5] sm:aspect-[3/4] max-w-[280px] sm:max-w-[350px] mx-auto"
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.35, ease: "circOut" }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full will-change-transform"
      >
        {/* --- FRONT --- */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="absolute inset-0 w-full h-full rounded-[1.5rem] sm:rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col p-5 sm:p-8 justify-between overflow-hidden group shadow-2xl"
        >
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/20 rounded-full blur-[40px] group-hover:bg-accent/40 transition-all duration-500" />

          {/* Badge de Número */}
          <div className="z-10">
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-accent font-bold bg-accent/10 px-2 sm:px-3 py-1 rounded-md border-none">
              #{reason.reasonNumber}
            </span>
          </div>

          {/* Icono Ajustado */}
          <div className="relative flex justify-center items-center">
            <div className="absolute w-16 h-16 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/15 transition-colors" />
            <Icon 
              className="text-white/90 group-hover:scale-110 transition-transform duration-300 w-10 h-10 sm:w-12 sm:h-12" 
              strokeWidth={1.2}
            />
          </div>

          {/* Título */}
          <div className="z-10 space-y-2">
            <h3 className="text-base sm:text-xl lg:text-2xl font-serif italic text-white/95 leading-tight text-balance">
              {reason.title}
            </h3>
            <div className="w-6 h-[1.5px] bg-accent rounded-full group-hover:w-full transition-all duration-500" />
          </div>
        </div>

        {/* --- BACK --- */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute inset-0 w-full h-full rounded-[1.5rem] sm:rounded-[2rem] bg-[#080808] border border-accent p-6 sm:p-8 flex flex-col items-center justify-center text-center overflow-hidden shadow-inner"
        >
          <LucideIcons.Quote size={20} className="text-accent mb-4 opacity-40" />
          
          <p className="text-xs sm:text-sm md:text-base text-gray-200 font-light leading-relaxed italic px-1">
            "{reason.description}"
          </p>

          <div className="mt-5 flex items-center gap-2 opacity-50">
            <div className="h-px w-4 sm:w-8 bg-white/20" />
            <LucideIcons.Heart size={10} className="text-accent " />
            <div className="h-px w-4 sm:w-8 bg-white/20" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}