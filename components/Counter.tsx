// components/Counter.tsx
'use client'
import { useEffect, useState } from 'react';

export default function Counter({ startDate }: { startDate: string | Date }) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const calculateDays = () => {
      const start = new Date(startDate);
      const now = new Date();
      
      // Diferencia en milisegundos
      const difference = now.getTime() - start.getTime();
      
      // Cálculo de días totales
      const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      
      setDays(totalDays);
    };

    // 1. Calculamos inmediatamente al montar
    calculateDays();

    // 2. Creamos un intervalo para actualizar cada hora (3600000 ms)
    // Así nos aseguramos de que si pasa la medianoche, el número cambie solo.
    const timer = setInterval(calculateDays, 3600000);

    // 3. Limpieza: Cerramos el intervalo al desmontar el componente
    return () => clearInterval(timer);
  }, [startDate]);

  // Evitamos el parpadeo de "0" antes de calcular
  if (days === null) return <span className="opacity-0">...</span>;

  return (
    <span 
      suppressHydrationWarning 
      className="font-black tabular-nums tracking-tighter"
    >
      {days.toLocaleString()} Días
    </span>
  );
}