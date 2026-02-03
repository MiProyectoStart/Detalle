'use client'
import { useState } from 'react';
import UploadWidget from '@/components/UploadWidget';
import { addLoveBubble } from '@/actions/bubbles';

export default function AddBubbleForm({ projectId }: { projectId: string }) {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('imageUrl', url);
    await addLoveBubble(projectId, formData);
    setUrl("");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-[2rem] border border-gray-700 space-y-4">
      <h3 className="text-lg font-bold text-accent">Añadir Burbuja de Amor</h3>
      <UploadWidget onUpload={(url) => setUrl(url)} />
      <textarea 
        name="revealedText" 
        placeholder="Texto secreto al dar clic..." 
        className="w-full p-3 rounded-xl bg-gray-950 border border-gray-700 outline-none text-sm" 
        rows={2} 
        required 
      />
      <button type="submit" disabled={!url} className="w-full py-3 bg-accent rounded-xl font-bold disabled:opacity-50">
        Guardar Burbuja
      </button>
    </form>
  );
}