// app/admin/[slug]/page.tsx
import { getProjectBySlug } from "@/actions/project";
import AddMomentForm from "@/components/admin/AddMomentForm";
import AddTimelineForm from "@/components/admin/AddTimelineForm";
import TimelineList from "@/components/admin/TimelineList";
import { deleteMoment } from "@/actions/gallery";
import { notFound } from "next/navigation";

import {
  Trash2,
  ExternalLink,
  LayoutDashboard,
  Image as ImageIcon,
  History, Heart,
  Import,
} from "lucide-react";
import Link from "next/link";
import ReasonList from "@/components/admin/ReasonList";
import AddReasonForm from "@/components/admin/AddReasonForm";

import AddVowForm from "@/components/admin/AddVowForm";

import VowList from "@/components/admin/VowList";
import BubbleList from "@/components/admin/BubbleList";
import AddBubbleForm from "@/components/admin/AddBubbleForm";
import SoundtrackForm from "@/components/admin/SoundtrackForm";
import FooterForm from "@/components/admin/FooterForm";


export default async function AdminProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Importante: Asegúrate que getProjectBySlug incluya 'timeline' en su include de Prisma
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const dynamicStyle = {
    "--accent-color": project.accentColor,
  } as React.CSSProperties;

  return (
    <main
      style={dynamicStyle}
      className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans"
    >
      {/* HEADER DEL DASHBOARD */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-accent">
            <LayoutDashboard size={18} />
            <span className="text-[10px] uppercase font-bold tracking-[0.3em]">
              Panel de Control
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter">
            Editando a{" "}
            <span className="text-accent italic font-serif">
              {project.coupleNames}
            </span>
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Ruta activa: <span className="text-white">/{project.slug}</span>
          </p>
        </div>

        <Link
          href={`/${project.slug}`}
          target="_blank"
          className="group flex items-center gap-3 px-8 py-3 bg-accent rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-accent/20"
        >
          Ver Web en Vivo <ExternalLink size={16} />
        </Link>
      </header>

      {/* GRID DE GESTIÓN */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* --- COLUMNA IZQUIERDA: CREACIÓN (4/12) --- */}
        <div className="xl:col-span-4 space-y-10">
          <section className="space-y-6">
            <SoundtrackForm project={project} />
            <AddMomentForm projectId={project.id} />
            <AddTimelineForm projectId={project.id} />
            <AddReasonForm projectId={project.id} />
            <AddVowForm projectId={project.id} />
            <AddBubbleForm projectId={project.id} />

            <FooterForm project={project}/>
          </section>
        </div>

        {/* --- COLUMNA DERECHA: GESTIÓN DE CONTENIDO (8/12) --- */}
        <div className="xl:col-span-8 space-y-16">
          {/* GESTIÓN DE GALERÍA */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3 border-b border-white/5 pb-4">
              <ImageIcon size={24} className="text-accent" /> Galería de
              Momentos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.gallery.map((moment) => (
                <div
                  key={moment.id}
                  className="group relative bg-gray-900/50 rounded-[2rem] overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-500"
                >
                  <img
                    src={moment.imageUrl}
                    alt={moment.title}
                    className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="p-5">
                    <h4 className="font-bold text-lg">{moment.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {moment.description}
                    </p>
                  </div>

                  <button
                    onClick={async () => {
                      "use server";
                      await deleteMoment(moment.id, project.slug);
                    }}
                    className="absolute top-4 right-4 p-2.5 bg-red-500/90 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* GESTIÓN DE LÍNEA DE TIEMPO */}
          <section>
            <TimelineList events={project.timeline} slug={project.slug} />
          </section>

          <section>
            <ReasonList reasons={project.reasons} slug={project.slug} />{" "}
            {/* 🚀 Nueva lista */}
          </section>

          <section>
            <VowList vows={project.vows} slug={project.slug}/>

          </section>


          <section>
            <BubbleList bubbles={project.bubbles} slug={project.slug} />
          </section>


          {/* Footer del Admin */}
          <footer className="pt-20 border-t border-white/5 text-center">
            <div className="flex justify-center gap-4 text-accent opacity-20 mb-4">
              <Heart size={20} /> <Heart size={20} /> <Heart size={20} />
            </div>
            <p className="text-gray-600 text-[10px] uppercase tracking-widest font-bold">
              Finalización de Proyecto 
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
