// components/admin/AddMomentForm.tsx
'use client'
import { useState } from 'react';
import UploadWidget from '@/components/UploadWidget';
import { addGalleryMoment } from '@/actions/gallery';
import { Plus, Image as ImageIcon } from 'lucide-react';

export default function AddMomentForm({ projectId }: { projectId: string }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append('imageUrl', url);
    
    await addGalleryMoment(projectId, formData);
    
    setUrl(""); // Limpiamos la imagen
    (e.target as HTMLFormElement).reset(); // Limpiamos el texto
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 space-y-4">
      <h3 className="text-lg font-bold flex items-center gap-2">
        <Plus size={20} className="text-accent" /> Añadir Nuevo Momento
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <UploadWidget onUpload={(url) => setUrl(url)} />
          {url && (
            <div className="relative aspect-video rounded-lg overflow-hidden border border-accent/30">
              <img src={url} alt="Preview" className="object-cover w-full h-full" />
            </div>
          )}
        </div>

        <div className="space-y-3">
          <input name="title" placeholder="Título del recuerdo" className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 outline-none focus:border-accent" required />
          <textarea name="description" placeholder="Descripción o historia..." className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 outline-none focus:border-accent" rows={4} required />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={!url || loading}
        className="w-full py-3 bg-accent rounded-xl font-bold disabled:opacity-50 transition hover:scale-[1.02]"
      >
        {loading ? "Guardando..." : "Guardar Momento en Galería"}
      </button>
    </form>
  );
}