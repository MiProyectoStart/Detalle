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
    // Optional: Update every minute or hour if needed, but for "days" it's fine once.
  }, [startDate]);

  // Use suppressHydrationWarning to avoid mismatches if SSR differs from Client (though 0 is initial)
  return (
    <span suppressHydrationWarning>
      {days.toLocaleString()} Días
    </span>
  );
}