// app/[slug]/juego/page.tsx
import { getProjectBySlug } from "@/actions/project";
import PuzzleBoard from "@/components/game/PuzzleBoard";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project || !project.puzzle) notFound();

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
      {/* Botón para volver */}
      <Link 
        href={`/${slug}`}
        className="fixed top-8 left-8 flex items-center gap-3 text-white/30 hover:text-accent transition-all group"
      >
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent">
          <ArrowLeft size={18} />
        </div>
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold hidden md:block">Regresar</span>
      </Link>

      {/* Tablero del Juego */}
      <div className="w-full max-w-4xl animate-fade-in">
        <PuzzleBoard imageUrl={project.puzzle.imageUrl} />
      </div>
    </main>
  );
}