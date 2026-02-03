// components/admin/BubbleList.tsx
'use client'
import { Trash2, CircleDot } from 'lucide-react';
import { deleteLoveBubble } from '@/actions/bubbles';
import Image from 'next/image';

export default function BubbleList({ bubbles, slug }: { bubbles: any[], slug: string }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-3 border-b border-white/5 pb-4">
        <CircleDot size={24} className="text-accent" /> Burbujas en Pantalla
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bubbles.map((bubble) => (
          <div key={bubble.id} className="group relative bg-gray-900 p-4 rounded-[2rem] border border-white/5 hover:border-accent/30 transition-all flex flex-col items-center">
            
            {/* Vista previa de la burbuja */}
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-accent/20 mb-4">
              <Image 
                src={bubble.imageUrl} 
                alt="Burbuja" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            
            <div className="text-center w-full">
              <p className="text-[10px] text-accent font-bold uppercase tracking-widest mb-1">Orden: {bubble.order}</p>
              <p className="text-sm text-gray-400 italic line-clamp-2">"{bubble.revealedText}"</p>
            </div>

            {/* Botón Eliminar */}
            <button 
              onClick={async () => await deleteLoveBubble(bubble.id, slug)}
              className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        
        {bubbles.length === 0 && (
          <p className="text-gray-600 italic text-sm col-span-full py-10 text-center">
            No has creado ninguna burbuja todavía.
          </p>
        )}
      </div>
    </div>
  );
}