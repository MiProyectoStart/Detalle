

//lib/util.ts
//calcular dias que llevan juntos

export function calculateDaysTogether(startDate: Date | string): number {
  const start = new Date(startDate);
  const now = new Date();
  
  // Resetear horas, minutos y segundos para comparar solo días naturales
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffTime = now.getTime() - start.getTime();
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  return totalDays > 0 ? totalDays : 0;
}