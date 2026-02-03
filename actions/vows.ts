// actions/vows.ts
'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addFutureVow(projectId: string, formData: FormData) {
  try {
    await prisma.futureVow.create({
      data: {
        projectId,
        iconName: formData.get('iconName') as string,
        keywordValue: (formData.get('keywordValue') as string).toUpperCase(),
        promiseText: formData.get('promiseText') as string,
      }
    });
    revalidatePath(`/admin/[slug]`);
    revalidatePath(`/[slug]`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al crear la promesa" };
  }
}

export async function deleteFutureVow(id: string, slug: string) {
  await prisma.futureVow.delete({ where: { id } });
  revalidatePath(`/admin/${slug}`);
  revalidatePath(`/[slug]`);
}