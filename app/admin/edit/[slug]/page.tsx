// app/admin/edit/[slug]/page.tsx
'use client'
import React, { useState, useEffect, use } from 'react';
import { updateProject, getProjectBySlug } from '@/actions/project';
import UploadWidget from '@/components/UploadWidget';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function EditProjectPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = use(paramsPromise); 
  
  const [project, setProject] = useState<any>(null);
  const [bgUrl, setBgUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getProjectBySlug(params.slug).then(data => {
      setProject(data);
      setBgUrl(data?.heroBgImage ?? "");
      setLoading(false);
    });
  }, [params.slug]);

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
       <div className="animate-pulse text-pink-500 font-bold tracking-widest uppercase">Cargando datos...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin" className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition">
          <ArrowLeft size={20} /> Volver al Dashboard
        </Link>
        
        <h1 className="text-4xl font-black text-white mb-10">Editar: <span className="text-pink-500">{project.coupleNames}</span></h1>

        <form 
          action={async (formData) => {
            setIsSaving(true);
            formData.append('heroBgImage', bgUrl); // Inyectamos la URL de la imagen
            await updateProject(project.id, formData);
            setIsSaving(false);
          }} 
          className="bg-gray-900/50 p-8 rounded-[2.5rem] border border-white/5 space-y-8"
        >
          {/* Fila 1: Configuración Crítica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">URL del Proyecto (Slug)</label>
                <input name="slug" defaultValue={project.slug} className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none focus:border-pink-500" required />
             </div>
             <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Plan</label>
                <select name="planType" defaultValue={project.planType} className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none">
                   <option value="BASIC">Básico</option>
                   <option value="PREMIUM">Premium</option>
                </select>
             </div>
          </div>

          {/* Fila 2: Identidad y Hero */}
          <div className="space-y-6 pt-4 border-t border-white/5">
             <h2 className="text-xl text-pink-400 font-serif">Visuales y Hero</h2>
             <UploadWidget onUpload={(url) => setBgUrl(url)} />
             
             {/* Preview de imagen actual */}
             {bgUrl && (
               <div className="w-full h-40 rounded-2xl bg-cover bg-center border border-white/10" style={{ backgroundImage: `url(${bgUrl})` }} />
             )}

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Nombres de la Pareja</label>
                  <input name="coupleNames" defaultValue={project.coupleNames} className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Logo Iniciales</label>
                  <input name="namesLogo" defaultValue={project.namesLogo} className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none" required />
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Fecha de Inicio</label>
                  <input name="startDate" type="date" defaultValue={new Date(project.startDate).toISOString().split('T')[0]} className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Título Hero (Faltaba este campo)</label>
                  <input name="heroTitle" defaultValue={project.heroTitle} placeholder="Ej: 365 días juntos" className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none" required />
                </div>
             </div>

             <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Descripción Hero</label>
                <textarea name="heroDescription" defaultValue={project.heroDescription} className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none" rows={3} />
             </div>
          </div>

          {/* Fila 3: La Carta */}
          <div className="space-y-6 border-t border-white/5 pt-8">
             <h2 className="text-xl text-pink-400 font-serif">Contenido de la Carta</h2>
             <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Título de la Carta</label>
                <input name="letterTitle" defaultValue={project.letter?.title} className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none" required />
             </div>
             <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Cuerpo de la Carta</label>
                <textarea name="letterContent" defaultValue={project.letter?.content} className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none" rows={6} required />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Frase de Despedida</label>
                  <input name="farewellPhrase" defaultValue={project.letter?.farewellPhrase} className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Firma (Remitente)</label>
                  <input name="senderName" defaultValue={project.letter?.senderName} className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none" required />
                </div>
             </div>
          </div>

          {/* Color de Acento */}
          <div className="flex items-center gap-6 border-t border-white/5 pt-8">
            <div className="flex-shrink-0">
               <label className="text-[10px] uppercase font-bold text-gray-500 block mb-2">Color del Tema</label>
               <input type="color" name="accentColor" defaultValue={project.accentColor} className="w-20 h-12 bg-transparent cursor-pointer" />
            </div>
            <p className="text-xs text-gray-500 italic">Este color actualizará automáticamente todos los botones y detalles neón de la web del cliente.</p>
          </div>

          <button 
            type="submit" 
            disabled={isSaving}
            className="w-full py-5 bg-pink-600 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-pink-600/20 hover:bg-pink-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Guardando cambios...
              </>
            ) : (
              <>
                <Save size={20} />
                Guardar cambios del proyecto
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}