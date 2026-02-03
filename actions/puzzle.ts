'use server'
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updatePuzzle(projectId: string, imageUrl: string) {
  try {
    await prisma.puzzleGame.upsert({
      where: { projectId },
      update: { imageUrl },
      create: { projectId, imageUrl }
    });
    revalidatePath(`/admin/sections/${projectId}`);
    return { success: true };
  } catch (error) {
    return { error: "No se pudo guardar el rompecabezas." };
  }
}