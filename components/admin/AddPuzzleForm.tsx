// components/admin/AddPuzzleForm.tsx
'use client'
import { useState } from 'react';
import { updatePuzzle } from '@/actions/puzzle';
import UploadWidget from '@/components/UploadWidget';
import { Gamepad2, Save, Loader2 } from 'lucide-react';

export default function AddPuzzleForm({ project }: { project: any }) {
  const [imageUrl, setImageUrl] = useState(project.puzzle?.imageUrl || "");
  const [isPending, setIsPending] = useState(false);

  const handleSave = async () => {
    if (!imageUrl) return;
    setIsPending(true);
    await updatePuzzle(project.id, imageUrl);
    setIsPending(false);
  };

  return (
    <div className="bg-gray-900/50 p-8 rounded-[2.5rem] border border-white/5 space-y-6 shadow-2xl">
      <div className="flex items-center gap-3 text-accent border-b border-white/5 pb-4">
        <Gamepad2 size={20} />
        <h3 className="text-lg font-bold">Rompecabezas Deslizante</h3>
      </div>

      <div className="space-y-4">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
          Foto del Juego
        </p>
        
        <UploadWidget onUpload={(url) => setImageUrl(url)} />

        {imageUrl && (
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
            <img src={imageUrl} alt="Preview Puzzle" className="w-full h-full object-cover" />
          </div>
        )}

        <button 
          onClick={handleSave}
          disabled={isPending || !imageUrl}
          className="w-full py-4 bg-accent rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
        >
          {isPending ? <Loader2 className="animate-spin" /> : <Save size={18} />}
          {project.puzzle ? "Actualizar Juego" : "Configurar Juego"}
        </button>
      </div>
    </div>
  );
}