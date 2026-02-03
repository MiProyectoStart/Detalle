// components/admin/AddReasonForm.tsx
'use client'
import { addReason } from '@/actions/reasons';
import { Sparkles } from 'lucide-react';

export default function AddReasonForm({ projectId }: { projectId: string }) {
  return (
    <form 
      action={async (formData) => { await addReason(projectId, formData); }}
      className="bg-gray-800 p-6 rounded-[2rem] border border-gray-700 space-y-4 shadow-2xl">


        <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-accent">Nueva Razón</h3>
        <a href="https://lucide.dev/icons" target="_blank" className="text-[10px] text-gray-500 hover:text-accent underline">
          Ver lista de iconos
        </a>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <input name="reasonNumber" placeholder="N° (01)" className="p-3 rounded-xl bg-gray-950 border border-gray-700 outline-none text-xs" required />
        {/* Aquí es donde pones el nombre de Lucide (ej: Heart, Star, Music) */}
        <input name="iconName" placeholder="Icono (ej: Heart)" className="col-span-2 p-3 rounded-xl bg-gray-950 border border-gray-700 outline-none text-xs" required />
      </div>
      <h3 className="text-lg font-bold flex items-center gap-2 text-accent">
        <Sparkles size={20} /> Añadir Razón
      </h3>
      
    
      
      <input name="title" placeholder="Título corto (ej: Tu sonrisa)" className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 outline-none focus:border-accent text-sm" required />
      <textarea name="description" placeholder="¿Por qué amas esto?..." className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 outline-none focus:border-accent text-sm" rows={3} required />
      
      <button type="submit" className="w-full py-3 bg-accent rounded-xl font-bold hover:scale-105 transition-transform">
        Guardar Razón
      </button>
    </form>
  );
}