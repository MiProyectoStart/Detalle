// components/admin/ReasonList.tsx
'use client'
import { Trash2, Star } from 'lucide-react';
import { deleteReason } from '@/actions/reasons';

export default function ReasonList({ reasons, slug }: { reasons: any[], slug: string }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2 border-b border-white/5 pb-2">
        <Star size={20} className="text-accent" /> Razones Registradas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {reasons.map((r) => (
          <div key={r.id} className="flex items-center justify-between bg-gray-900/50 p-4 rounded-2xl border border-gray-800 group">
            <div className="flex items-center gap-3">
              <span className="text-accent font-bold text-xs">{r.reasonNumber}</span>
              <p className="font-medium text-sm">{r.title}</p>
            </div>
            <button 
              onClick={async () => await deleteReason(r.id, slug)}
              className="text-gray-600 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}