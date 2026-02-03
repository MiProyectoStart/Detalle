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
      className="
        relative w-full cursor-pointer perspective-1000 group

        /* altura responsive */
        h-52 sm:h-60 md:h-72 lg:h-80
      "
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 200, damping: 25 }}
        className="relative w-full h-full preserve-3d"
      >
        {/* ---------------- FRONT ---------------- */}
        <div
          className="
            absolute inset-0 backface-hidden rounded-3xl
            bg-white/2 border border-white/10 backdrop-blur-sm

            /* padding responsive */
            p-4 sm:p-6 md:p-8

            flex flex-col items-center justify-center
            space-y-4 sm:space-y-6
            transition-all duration-500
            group-hover:border-accent group-hover:shadow-[0_0_20px_var(--accent-color)]
          "
        >
          {/* Icono */}
          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-accent/20 scale-150 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <Icon
              className="relative text-white group-hover:text-accent transition-colors duration-1000
                         w-6 h-6 md:w-8 md:h-8 "
              strokeWidth={1}
            />
          </div>

          <h3
            className="
              font-light tracking-tight text-white/80
              text-lg sm:text-xl md:text-2xl
              group-hover:text-white transition-colors
            "
          >
            {reason.reasonNumber}
          </h3>

          <div className="absolute bottom-4 w-1 h-1 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-[3]" />
        </div>

        {/* ---------------- BACK ---------------- */}
        <div
          className="
            absolute inset-0 backface-hidden rotate-y-180
            rounded-3xl
            bg-linear-to-br from-accent to-[#0a0a0a]
            border border-gray-600

            /* padding responsive */
            p-5 sm:p-6 md:p-10

            flex flex-col items-center justify-center text-center
            group-hover:border-accent group-hover:shadow-[0_0_20px_var(--accent-color)]
          "
        >
          <h3
            className="
              font-light tracking-tight text-white/80
              text-base sm:text-lg md:text-xl
              group-hover:text-white transition-colors
            "
          >
            {reason.title}
          </h3>

          <div className="mt-3 mb-3 flex items-center gap-2">
            <div className="h-px w-6 sm:w-8 bg-white/20" />
            <LucideIcons.Heart size={12} className="text-white/40 fill-white/20" />
            <div className="h-px w-6 sm:w-8 bg-white/20" />
          </div>

          <p
            className="
              text-white italic tracking-tight leading-relaxed
              text-sm sm:text-base md:text-lg
            "
          >
            "{reason.description}"
          </p>
        </div>
      </motion.div>
    </div>
  )
}
