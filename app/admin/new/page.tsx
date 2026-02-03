// app/admin/new/page.tsx
'use client'
import { useState, use } from 'react';
import { createProject } from '@/actions/project';
import UploadWidget from '@/components/UploadWidget';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function NewProjectPage() {
  const [bgUrl, setBgUrl] = useState("");
  const [isPending, setIsPending] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin" className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition">
          <ArrowLeft size={20} /> Volver al Panel
        </Link>

        <h1 className="text-4xl font-black tracking-tighter text-pink-500 mb-10">Registrar Nuevo Regalo</h1>

        <form 
          action={async (formData) => {
            setIsPending(true);
            formData.append('heroBgImage', bgUrl);
            await createProject({}, formData);
            setIsPending(false);
          }} 
          className="bg-gray-900/50 p-8 rounded-[2.5rem] border border-white/5 space-y-8 shadow-2xl"
        >
          {/* Datos del Proyecto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">URL Personalizada (Slug)</label>
              <input name="slug" placeholder="ej: para-mi-amor" className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none focus:border-pink-500" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Tipo de Plan</label>
              <select name="planType" className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none">
                <option value="BASIC">Básico</option>
                <option value="PREMIUM">Premium</option>
              </select>
            </div>
          </div>

          {/* Sección Hero */}
          <div className="space-y-4 border-t border-white/5 pt-8">
            <h2 className="text-xl text-pink-400 font-serif">Portada (Hero)</h2>
            <UploadWidget onUpload={(url) => setBgUrl(url)} />
            <input name="coupleNames" placeholder="Nombres (Mateo & Valentina)" className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none" required />
            <div className="grid grid-cols-2 gap-4">
              <input name="namesLogo" placeholder="Logo (M&V)" className="p-4 rounded-2xl bg-black border border-gray-800 outline-none" required />
              <input name="startDate" type="date" className="p-4 rounded-2xl bg-black border border-gray-800 outline-none" required />
            </div>
            <input name="heroTitle" placeholder="Título (365 días juntos)" className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none" required />
            <textarea name="heroDescription" placeholder="Descripción corta..." className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none" rows={3} />
          </div>

          {/* Carta de Amor */}
          <div className="space-y-4 border-t border-white/5 pt-8">
            <h2 className="text-xl text-pink-400 font-serif">La Carta</h2>
            <input name="letterTitle" placeholder="Título de la carta" className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none" required />
            <textarea name="letterContent" placeholder="Escribe aquí el contenido..." className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none" rows={6} required />
            <div className="grid grid-cols-2 gap-4">
              <input name="farewellPhrase" placeholder="Despedida" className="p-4 rounded-2xl bg-black border border-gray-800 outline-none" required />
              <input name="senderName" placeholder="Firma" className="p-4 rounded-2xl bg-black border border-gray-800 outline-none" required />
            </div>
          </div>

          {/* Color de Acento */}
          <div className="flex items-center gap-4 border-t border-white/5 pt-8">
            <div className="flex-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 block mb-2">Color del Tema</label>
              <input type="color" name="accentColor" defaultValue="#F42559" className="w-full h-12 bg-transparent cursor-pointer" />
            </div>
            <p className="text-xs text-gray-600 italic max-w-[200px]">Este color se aplicará a botones, iconos y detalles.</p>
          </div>

          <button 
            type="submit" 
            disabled={isPending || !bgUrl} 
            className="w-full py-5 bg-pink-600 rounded-2xl font-black uppercase tracking-widest hover:bg-pink-700 transition-all disabled:opacity-50"
          >
            {isPending ? "Generando Magia..." : "Crear Web de Regalo"}
          </button>
        </form>
      </div>
    </div>
  );
}