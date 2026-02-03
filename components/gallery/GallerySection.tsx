// components/gallery/GallerySection.tsx
'use client'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import GalleryCard from './GalleryCard'
import GalleryModal from './GalleryModal'

export default function GallerySection({ moments }: { moments: any[] }) {
  const [selectedMoment, setSelectedMoment] = useState<any>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  if (moments.length === 0) return null

  // Función de scroll optimizada para el ancho de tus tarjetas
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return

    const cardWidth = 424 // 400px de la tarjeta + 24px de gap
    scrollRef.current.scrollBy({
      left: direction === 'right' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    })
  }

  return (
    <section id="galeria" className="relative py-6 lg:py-24 bg-[#050505] overflow-hidden">
      
      {/* Cabecera Editorial con Icono */}
      <div className="px-6 md:px-20 mb-16 space-y-4">
        <div className="flex items-center gap-3 text-white">
          <Sparkles size={20} />
          <p className="font-bold tracking-[0.4em] text-[10px] uppercase">Nuestra Galería</p>
        </div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight"
        >
          Fragmentos de <span className="text-accent italic font-serif">Felicidad</span>
        </motion.h2>
      </div>

      {/* CONTENEDOR RELATIVO PARA LAS FLECHAS Y EL CARRUSEL */}
      <div className="relative group px-6 md:px-20">
        
        {/* FLECHA IZQUIERDA: Ubicada al inicio del contenedor */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-8 lg:left-24 top-1/2 -translate-y-1/2 z-30 
                     p-4 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 
                     text-white hover:bg-accent hover:border-accent transition-all duration-300
                     hidden md:flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={28} />
        </button>

        {/* CARRUSEL HORIZONTAL */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {moments.map((moment, index) => (
            <div key={moment.id} className="snap-center shrink-0">
              <GalleryCard
                url={moment.imageUrl}
                title={moment.title}
                index={index}
                onClick={() => setSelectedMoment(moment)}
              />
            </div>
          ))}
        </div>

        {/* FLECHA DERECHA: Ubicada al final del contenedor */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-8 lg:right-24 top-1/2 -translate-y-1/2 z-30 
                     p-4 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 
                     text-white hover:bg-accent hover:border-accent transition-all duration-300
                     hidden md:flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Decoración Final */}
      <div className="flex justify-center mt-4">
        <div className="w-px h-20 bg-gradient-to-b from-accent to-transparent opacity-30" />
      </div>

      {/* Modal Detallado */}
      {selectedMoment && (
        <GalleryModal 
          moment={selectedMoment} 
          onClose={() => setSelectedMoment(null)} 
        />
      )}
    </section>
  )
}