// components/admin/VowList.tsx
'use client'
import { Trash2, Sunrise } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { deleteFutureVow } from '@/actions/vows';

export default function VowList({ vows, slug }: { vows: any[], slug: string }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-3 border-b border-white/5 pb-4">
        <Sunrise size={24} className="text-accent" /> Promesas de Futuro
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vows.map((vow) => {
          const Icon = (LucideIcons as any)[vow.iconName] || LucideIcons.Sparkles;
          return (
            <div key={vow.id} className="group relative bg-gray-900/40 p-6 rounded-3xl border border-white/5 hover:border-accent/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-accent/10 rounded-2xl text-accent">
                  <Icon size={20} />
                </div>
                <button 
                  onClick={async () => await deleteFutureVow(vow.id, slug)}
                  className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <h4 className="text-accent text-[10px] font-black tracking-[0.4em] uppercase mb-2">
                {vow.keywordValue}
              </h4>
              <p className="text-sm text-gray-400 italic line-clamp-3">
                "{vow.promiseText}"
              </p>
            </div>
          );
        })}
        {vows.length === 0 && (
          <p className="text-gray-600 italic text-sm col-span-full text-center py-10">
            Aún no has definido promesas para el futuro.
          </p>
        )}
      </div>
    </div>
  );
}