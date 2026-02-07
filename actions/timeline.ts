// actions/timeline.ts
'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addTimelineEvent(projectId: string, formData: FormData) {
  try {
    await prisma.timelineEvent.create({
      data: {
        projectId,
        eventDate: formData.get('eventDate') as string,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        imageUrl: formData.get('imageUrl') as string,
        order: 0,
        
      }
    });
    revalidatePath(`/admin/[slug]`);
    revalidatePath(`/[slug]`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al guardar el evento" };
  }
}

export async function deleteTimelineEvent(id: string, slug: string) {
  await prisma.timelineEvent.delete({ where: { id } });
  revalidatePath(`/admin/${slug}`);
  revalidatePath(`/${slug}`);
}