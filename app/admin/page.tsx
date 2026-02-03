// app/admin/page.tsx
import { getAllProjects, deleteProject } from '@/actions/project';
import Link from 'next/link';
import { Edit, Trash2, Plus, ExternalLink, Layers } from 'lucide-react'; // Añadido Layers

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const projects = await getAllProjects().catch((error) => {
    console.error("Error fetching projects during render:", error);
    return [];
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-pink-500 uppercase">Panel de Control</h1>
            <p className="text-gray-500 text-sm">Gestiona los regalos de tus clientes</p>
          </div>
          <Link href="/admin/new" className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-2xl font-bold transition shadow-lg shadow-pink-600/20">
            <Plus size={20} /> Nuevo Cliente
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-900/50 border border-white/5 p-6 rounded-[2rem] flex items-center justify-between group hover:border-pink-500/30 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-cover bg-center border border-white/10" style={{ backgroundImage: `url(${project.heroBgImage})` }} />
                <div>
                  <h3 className="text-xl font-bold">{project.coupleNames}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-mono mt-1">
                    <span className="bg-pink-500/10 text-pink-400 px-2 py-0.5 rounded uppercase">{project.planType}</span>
                    <span>/{project.slug}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* BOTÓN 1: VER WEB */}
                <Link href={`/${project.slug}`} target="_blank" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition text-gray-400 hover:text-white" title="Ver Web">
                  <ExternalLink size={20} />
                </Link>

                {/* NUEVO BOTÓN: GESTIONAR SECCIONES (Galería, Razones, etc.) */}
                <Link
                  href={`/admin/${project.slug}`}
                  className="p-3 bg-white/5 hover:bg-blue-500/20 rounded-xl transition text-gray-400 hover:text-blue-400"
                  title="Gestionar Secciones"
                >
                  <Layers size={20} />
                </Link>

                {/* BOTÓN 3: EDITAR DATOS BÁSICOS */}
                <Link href={`/admin/edit/${project.slug}`} className="p-3 bg-white/5 hover:bg-pink-500/20 rounded-xl transition text-gray-400 hover:text-pink-400" title="Editar Datos">
                  <Edit size={20} />
                </Link>

                {/* BOTÓN 4: ELIMINAR */}
                <form action={async () => { 'use server'; await deleteProject(project.id); }}>
                  <button className="p-3 bg-white/5 hover:bg-red-500/20 rounded-xl transition text-gray-400 hover:text-red-500" title="Eliminar">
                    <Trash2 size={20} />
                  </button>
                </form>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p className="text-center py-20 text-gray-600 italic">No hay proyectos creados aún.</p>}
        </div>
      </div>
    </div>
  );
}