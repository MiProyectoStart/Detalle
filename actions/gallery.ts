// actions/gallery.ts
'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addGalleryMoment(projectId: string, formData: FormData) {
  const imageUrl = formData.get('imageUrl') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  try {
    await prisma.galleryMoment.create({
      data: {
        projectId,
        imageUrl,
        title,
        description,
        order: 0, // Podrías implementar lógica de orden después
      }
    });
    revalidatePath(`/admin/[slug]`);
    revalidatePath(`/[slug]`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al guardar en la base de datos" };
  }
}

export async function deleteMoment(id: string, slug: string) {
  await prisma.galleryMoment.delete({ where: { id } });
  revalidatePath(`/admin/${slug}`);
  revalidatePath(`/${slug}`);
}