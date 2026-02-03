// components/reasons/ReasonsSection.tsx
'use client'
import { motion } from 'framer-motion';
import ReasonCard from './ReasonCard';

export default function ReasonsSection({ reasons }: { reasons: any[] }) {
  if (reasons.length === 0) return null;

  // Ordenamos por número por si acaso
  const sortedReasons = [...reasons].sort((a, b) => parseInt(a.reasonNumber) - parseInt(b.reasonNumber));

  return (
    <section id="razones" className="py-24 mt-8 px-6 md:px-12 lg:px-20 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto space-y-16 ">
        
        {/* Cabecera inspirada en la imagen */}
        <div className="text-center space-y-6 max-w-3xl mx-auto ">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
            10 Razones por las que te Amo
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed font-medium">
            Cada tarjeta guarda un secreto de por qué eres la persona más especial en mi vida. 
            <span className="text-accent"> Haz clic en cada una para descubrirlas todas.</span>
          </p>
        </div>

        {/* Grid de 5 columnas como en la referencia */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {sortedReasons.map((reason, index) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <ReasonCard reason={reason} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}