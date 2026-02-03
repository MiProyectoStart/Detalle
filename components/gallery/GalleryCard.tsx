// components/gallery/GalleryCard.tsx
'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Camera, Maximize2 } from 'lucide-react';

export default function GalleryCard({ url, title, index, onClick }: any) {
  return (
    <motion.div 
      onClick={onClick}
      className="relative flex-shrink-0 w-[80vw] sm:w-[400px] aspect-[5/5] group cursor-pointer overflow-hidden rounded-[2.5rem] bg-black/40 border border-white/10"
    >
      <Image 
        src={url} 
        alt={title} 
        fill 
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

      <div className="absolute inset-0 p-5 sm:p-6 lg:p-8 flex flex-col justify-end">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent">
              Momento {index + 1}
            </span>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
              {title}
            </h3>
          </div>

          <div className="
            p-2.5 lg:p-3
            bg-accent/20 backdrop-blur-md rounded-full text-white
            opacity-0 group-hover:opacity-100
            transition-all transform translate-y-4 group-hover:translate-y-0
          ">
            <Maximize2 size={18} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}