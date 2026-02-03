// components/Counter.tsx
'use client'
import { useEffect, useState } from 'react';

export default function Counter({ startDate }: { startDate: Date }) {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const calculateDays = () => {
      const start = new Date(startDate);
      const now = new Date();
      const difference = now.getTime() - start.getTime();
      const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(totalDays);
    };

    calculateDays();
  }, [startDate]);

  return (
    <div className="text-center">
      <h2 className="text-[12vw] sm:text-5xl md:text-6xl lg:text-8xl font-bold mt-2">
        {days.toLocaleString()} Días
      </h2>
      
    </div>
  );
}