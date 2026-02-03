// actions/footer.ts
'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateFooter(projectId: string, formData: FormData) {
  try {
    await prisma.project.update({
      where: { id: projectId },
      data: {
        footerSubtitle: formData.get('footerSubtitle') as string,
        footerNames: formData.get('footerNames') as string,
      }
    });

    revalidatePath(`/admin/[slug]`);
    revalidatePath(`/[slug]`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al actualizar el cierre" };
  }
}