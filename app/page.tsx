// app/page.tsx
import Link from "next/link";
import { Heart, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden font-sans">
      
      {/* Decoración de fondo: Un sutil resplandor neón */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 space-y-8">
        
        {/* Badge superior */}
        <div className="flex items-center gap-2 px-4 py-1.5  bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] font-bold text-pink-400">
         
          Experiencias Digitales Eternas
        </div>

        {/* Titular Principal */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            Love<span className="text-pink-600 italic font-serif">Stack</span>
          </h1>
          <p className="max-w-md mx-auto text-gray-400 text-sm md:text-base leading-relaxed font-medium">
            Transforma tus recuerdos en un refugio digital interactivo. 
            El regalo perfecto para quienes lo son todo.
          </p>
        </div>


        {/* Footer sutil */}
        <div className="pt-20 flex items-center gap-2 text-gray-600 text-[10px] uppercase tracking-widest font-black">
          <Heart size={12} className="text-pink-900" />
          Hecho con amor y código
        </div>
      </div>
    </main>
  );
}