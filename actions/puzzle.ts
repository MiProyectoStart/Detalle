// actions/puzzle.ts
'use server'
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updatePuzzle(projectId: string, imageUrl: string) {
  try {
    const puzzle = await prisma.puzzleGame.upsert({
      where: { projectId },
      update: { imageUrl },
      create: { projectId, imageUrl },
      include: { project: true } // Incluimos el proyecto para obtener el slug
    });

    // Refrescamos la ruta del admin usando el slug real
    revalidatePath(`/admin/${puzzle.project.slug}`);
    revalidatePath(`/${puzzle.project.slug}/juego`);
    
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "No se pudo guardar el rompecabezas." };
  }
}