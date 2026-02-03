// actions/reasons.ts
'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addReason(projectId: string, formData: FormData) {
  try {
    
    await prisma.reasonToLove.create({
      data: {
        projectId,
        reasonNumber: formData.get('reasonNumber') as string,
        iconName: formData.get('iconName') as string,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
      }
    });
    revalidatePath(`/admin/[slug]`);
    revalidatePath(`/[slug]`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al crear la razón" };
  }
}

export async function deleteReason(id: string, slug: string) {
  await prisma.reasonToLove.delete({ where: { id } });
  revalidatePath(`/admin/${slug}`);
  revalidatePath(`/[slug]`);
}