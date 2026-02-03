// components/admin/AddVowForm.tsx
'use client'
import { addFutureVow } from '@/actions/vows';
import { Sunrise } from 'lucide-react';

export default function AddVowForm({ projectId }: { projectId: string }) {
  return (
    <form 
      action={async (formData) => { await addFutureVow(projectId, formData); }}
      className="bg-gray-800 p-6 rounded-[2rem] border border-gray-700 space-y-4 shadow-2xl"
    >
      <h3 className="text-lg font-bold flex items-center gap-2 text-accent">
        <Sunrise size={20} /> Nueva Promesa de Futuro
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        <input name="iconName" placeholder="Icono (ej: Home, Heart)" className="p-3 rounded-xl bg-gray-950 border border-gray-700 outline-none text-xs" required />
        <input name="keywordValue" placeholder="Palabra Clave (HOGAR)" className="p-3 rounded-xl bg-gray-950 border border-gray-700 outline-none text-xs uppercase" required />
      </div>
      
      <textarea 
        name="promiseText" 
        placeholder="Escribe la promesa aquí..." 
        className="w-full p-3 rounded-xl bg-gray-950 border border-gray-700 outline-none text-sm italic" 
        rows={3} 
        required 
      />
      
      <button type="submit" className="w-full py-3 bg-accent rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
        Registrar Voto de Futuro
      </button>
    </form>
  );
}