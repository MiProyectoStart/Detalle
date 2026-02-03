// components/admin/AddTimelineForm.tsx
'use client'
import { useState } from 'react';
import UploadWidget from '@/components/UploadWidget';
import { addTimelineEvent } from '@/actions/timeline';
import { History } from 'lucide-react';

export default function AddTimelineForm({ projectId }: { projectId: string }) {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('imageUrl', url);
    await addTimelineEvent(projectId, formData);
    setUrl("");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 space-y-4">
      <h3 className="text-lg font-bold flex items-center gap-2 text-accent">
        <History size={20} /> Añadir Hito en la Historia
      </h3>
      
      <div className="space-y-4">
        <UploadWidget onUpload={(url) => setUrl(url)} />
        <input name="eventDate" placeholder="Fecha (ej: Mayo 2023)" className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 outline-none" required />
        <input name="title" placeholder="Título del hito" className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 outline-none" required />
        <textarea name="description" placeholder="¿Qué pasó este día?" className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 outline-none" rows={3} required />
        <button type="submit" disabled={!url} className="w-full py-3 bg-accent rounded-xl font-bold">Guardar Hito</button>
      </div>
    </form>
  );
}