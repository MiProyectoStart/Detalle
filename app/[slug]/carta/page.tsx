// app/[slug]/carta/page.tsx
import { getProjectBySlug } from '@/actions/project';
import { notFound } from 'next/navigation';
import LetterInteraction from '@/components/letter/LetterInteraction';

export default async function LetterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project || !project.letter) notFound();

  return (
    <main className="bg-black min-h-screen">
      {/* Pasamos los datos dinámicos y el slug para el botón de volver */}
      <LetterInteraction letter={project.letter} slug={project.slug} />
    </main>
  );
}