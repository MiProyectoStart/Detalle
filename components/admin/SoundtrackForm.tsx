// components/admin/SoundtrackForm.tsx
'use client'
import { updateSoundtrack } from '@/actions/soundtrack';
import { Music, Settings2 } from 'lucide-react';

export default function SoundtrackForm({ project }: { project: any }) {
  return (
    <form 
      action={async (formData) => { await updateSoundtrack(project.id, formData); }}
      className="bg-gray-900/50 p-8 rounded-[2.5rem] border border-white/5 space-y-6 shadow-2xl"
    >
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <h3 className="text-lg font-bold flex items-center gap-2 text-accent">
          <Music size={20} /> Banda Sonora
        </h3>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            name="showSoundtrack" 
            type="checkbox" 
            defaultChecked={project.showSoundtrack} 
            className="sr-only peer" 
          />
          <div className="w-11 h-6 bg-gray-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
          <span className="ml-3 text-xs font-bold text-gray-500 uppercase tracking-widest">Mostrar</span>
        </label>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 ml-1">ID de la canción o Link</label>
          <input 
            name="spotifyTrackId" 
            defaultValue={project.spotifyTrackId || ""} 
            placeholder="Ej: https://open.spotify.com/track/..." 
            className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none focus:border-accent/50 text-sm transition-all" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 ml-1">Texto de Introducción</label>
          <textarea 
            name="soundtrackIntro" 
            defaultValue={project.soundtrackIntro || ""} 
            placeholder="Escribe algo romántico sobre esta canción..." 
            className="w-full p-4 rounded-2xl bg-black border border-gray-800 outline-none focus:border-accent/50 text-sm italic" 
            rows={3} 
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-4 bg-accent rounded-2xl font-bold text-sm hover:scale-[1.01] transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
        >
          <Settings2 size={18} /> Actualizar Configuración
        </button>
      </div>
    </form>
  );
}