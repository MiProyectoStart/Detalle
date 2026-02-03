// actions/bubbles.ts
'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addLoveBubble(projectId: string, formData: FormData) {
  try {
    await prisma.loveBubble.create({
      data: {
        projectId,
        imageUrl: formData.get('imageUrl') as string,
        revealedText: formData.get('revealedText') as string,
        order: 0,
      }
    });
    revalidatePath(`/admin/[slug]`);
    revalidatePath(`/[slug]`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al crear la burbuja" };
  }
}

export async function deleteLoveBubble(id: string, slug: string) {
  await prisma.loveBubble.delete({ where: { id } });
  revalidatePath(`/admin/${slug}`);
  revalidatePath(`/[slug]`);
}