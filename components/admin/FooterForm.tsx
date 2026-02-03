// components/admin/FooterForm.tsx
'use client'
import { updateFooter } from '@/actions/footer';
import { Layout } from 'lucide-react';

export default function FooterForm({ project }: { project: any }) {
  return (
    <form 
      action={async (formData) => { await updateFooter(project.id, formData); }}
      className="bg-gray-900/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6 shadow-xl"
    >
      <h3 className="text-lg font-bold flex items-center gap-2 text-accent">
        <Layout size={20} /> Detalles del Cierre
      </h3>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">Subtítulo del Footer</label>
          <input 
            name="footerSubtitle" 
            defaultValue={project.footerSubtitle} 
            className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none focus:border-accent text-sm italic" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">Nombres de Firma (Footer)</label>
          <input 
            name="footerNames" 
            defaultValue={project.footerNames} 
            className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none focus:border-accent text-sm" 
          />
        </div>

        <button type="submit" className="w-full py-4 bg-accent rounded-2xl font-bold text-sm hover:opacity-90 transition-all">
          Actualizar Footer
        </button>
      </div>
    </form>
  );
}