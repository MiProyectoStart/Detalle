// components/love-bubbles/PolaroidCard.tsx
'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { dancingScript } from '@/app/fonts';
import { Heart } from 'lucide-react';


interface PolaroidCardProps {
  bubble: any;
  index: number;
  rotation: number;
}

export default function PolaroidCard({ bubble, index, rotation }: PolaroidCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  return (
    <div
      className="relative w-full aspect-[4/5] cursor-pointer group perspective-1000"
      onClick={handleFlip}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6}}
        onAnimationComplete={() => setIsAnimating(false)}
        className="absolute inset-0 w-full h-full preserve-3d shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
      >
        {/* --- LADO FRONTAL (Imagen + Leyenda) --- */}
        <div className="absolute inset-0 w-full h-full bg-white p-2 pb-8 sm:p-3 sm:pb-12 flex flex-col backface-hidden">
          <div className="relative w-full flex-grow bg-gray-100">
            <Image
              src={bubble.imageUrl}
              alt={`Recuerdo ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
            />
          </div>
          <div className="absolute bottom-1 sm:bottom-2 left-0 w-full text-center">
            <p className={`${dancingScript.className} text-gray-800 text-lg sm:text-xl`}>
               #{index + 1}
            </p>
          </div>
        </div>

        {/* --- LADO TRASERO (Texto Revelado) --- */}
        <div className="absolute inset-0 w-full h-full bg-white p-4 sm:p-6 flex flex-col justify-center items-center text-center rotate-y-180 backface-hidden border-2 border-gray-100">
          <p className={`${dancingScript.className} text-gray-700 text-lg sm:text-xl md:text-2xl leading-relaxed`}>
            "{bubble.revealedText}"
          </p>


          <div className="mt-3 sm:mt-4 ">
            <Heart size={14} className="text-accent shadow-sm" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}