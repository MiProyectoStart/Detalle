// components/admin/TimelineList.tsx
'use client'
import { Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { deleteTimelineEvent } from '@/actions/timeline';

export default function TimelineList({ events, slug }: { events: any[], slug: string }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold border-b border-gray-800 pb-2 flex items-center gap-2">
        <CalendarIcon size={20} className="text-accent" /> Eventos de la Historia
      </h2>
      
      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="group flex items-center justify-between bg-gray-900 p-4 rounded-2xl border border-gray-800 hover:border-accent/30 transition">
            <div className="flex items-center gap-4">
              <img src={event.imageUrl} className="w-16 h-16 rounded-lg object-cover" alt="" />
              <div>
                <p className="text-accent text-[10px] font-bold uppercase tracking-widest">{event.eventDate}</p>
                <h4 className="font-bold">{event.title}</h4>
                <p className="text-xs text-gray-500 line-clamp-1">{event.description}</p>
              </div>
            </div>

            <button 
              onClick={async () => await deleteTimelineEvent(event.id, slug)}
              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {events.length === 0 && <p className="text-gray-600 italic text-sm">No hay hitos registrados.</p>}
      </div>
    </div>
  );
}