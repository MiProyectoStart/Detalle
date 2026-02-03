// actions/soundtrack.ts
'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateSoundtrack(projectId: string, formData: FormData) {
  try {
    const showSoundtrack = formData.get('showSoundtrack') === 'on';
    const rawTrackId = formData.get('spotifyTrackId') as string;
    const soundtrackIntro = formData.get('soundtrackIntro') as string;

    // Limpiador de ID: Extrae el ID si pegan la URL completa
    // Ejemplo: https://open.spotify.com/track/4cOdK2wGqyBMY3pXv9P70Y?si=...
    const spotifyTrackId = rawTrackId.includes('track/') 
      ? rawTrackId.split('track/')[1].split('?')[0] 
      : rawTrackId;

    await prisma.project.update({
      where: { id: projectId },
      data: {
        showSoundtrack,
        spotifyTrackId,
        soundtrackIntro,
      }
    });

    revalidatePath(`/admin/[slug]`);
    revalidatePath(`/[slug]`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error al actualizar la música" };
  }
}