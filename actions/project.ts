'use server'
'use server'
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export type FormState = {
  error?: string;
  success?: boolean;
};

export async function createProject(prevState: FormState, formData: FormData): Promise<FormState> {
  
  console.log("--- INICIANDO CREACIÓN ---");
  const slug = formData.get('slug') as string;
  const heroBgImage = formData.get('heroBgImage') as string;
  
  console.log("Slug recibido:", slug);
  console.log("Imagen recibida:", heroBgImage ? " URL PRESENTE" : "VACÍA");

  if (!heroBgImage || heroBgImage === "") {
    return { error: "La imagen de fondo es obligatoria." };
  }

  let projectSlug = "";

  try {
    const project = await prisma.project.create({
      data: {
        slug,
        planType: formData.get('planType') as string,
        coupleNames: formData.get('coupleNames') as string, // nombres de personas
        namesLogo: formData.get('namesLogo') as string,
        startDate: new Date(formData.get('startDate') as string),
        heroTitle: formData.get('heroTitle') as string,
        heroDescription: formData.get('heroDescription') as string,
        heroBgImage: heroBgImage,
        accentColor: formData.get('accentColor') as string || "#F42559",
        footerSubtitle: "Esta página es solo para ti",
        footerNames: formData.get('namesLogo') as string,

        // Creamos la carta al mismo tiempo
        letter: {
          create: {
            title: formData.get('letterTitle') as string,
            content: formData.get('letterContent') as string,
            farewellPhrase: formData.get('farewellPhrase') as string,
            senderName: formData.get('senderName') as string,
          }
        }
      }
    });
    
    projectSlug = project.slug;
    console.log("✅ PROYECTO CREADO EN DB:", projectSlug);

    
  } catch (e: any) {
    console.error("❌ ERROR DE PRISMA:", e.message);
    if (e.code === 'P2002') {
      return { error: "Esa URL ya está en uso." };
    }
    return { error: "Error en la base de datos: " + e.message };
  }

  // 3. IMPORTANTE: El redirect va FUERA del try/catch
  redirect(`/${projectSlug}`);
}

// actions/project.ts

export async function getProjectBySlug(slug: string) {
  // Si por alguna razón el slug llega vacío, retornamos null de inmediato
  if (!slug) return null;

  return await prisma.project.findUnique({
    where: { slug },
    include: {
      letter: true, 
      gallery: {
        orderBy: {
          order: 'asc' // Los momentos aparecerán en el orden que tú decidas
        }
      },
      timeline: { 
        orderBy: { 
          order: 'asc' 
        } 
      },
      reasons: { 
        orderBy: { reasonNumber: 'asc' } 
      },
      vows: true,
      bubbles: { orderBy: { order: 'asc' } },
      

      
    }
  });
}


//new
export async function getAllProjects() {
  return await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { gallery: true, timeline: true } } }
  });
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { error: "No se pudo eliminar el proyecto." };
  }
}


export async function updateProject(id: string, formData: FormData) {
  const slug = formData.get('slug') as string;
  
  try {
    await prisma.project.update({
      where: { id },
      data: {
        slug: slug,
        planType: formData.get('planType') as string,
        coupleNames: formData.get('coupleNames') as string,
        namesLogo: formData.get('namesLogo') as string,
        startDate: new Date(formData.get('startDate') as string),
        heroTitle: formData.get('heroTitle') as string, // Asegúrate de que este campo esté en el form
        heroDescription: formData.get('heroDescription') as string,
        heroBgImage: formData.get('heroBgImage') as string,
        accentColor: formData.get('accentColor') as string,
        
        // Usamos UPSERT para que sea a prueba de errores
        letter: {
          upsert: {
            create: {
              title: formData.get('letterTitle') as string,
              content: formData.get('letterContent') as string,
              farewellPhrase: formData.get('farewellPhrase') as string,
              senderName: formData.get('senderName') as string,
            },
            update: {
              title: formData.get('letterTitle') as string,
              content: formData.get('letterContent') as string,
              farewellPhrase: formData.get('farewellPhrase') as string,
              senderName: formData.get('senderName') as string,
            }
          }
        }
      }
    });

    // Limpiamos cache para ver cambios inmediatos
    revalidatePath('/admin');
    revalidatePath(`/${slug}`);
  } catch (e: any) {
    console.error("Error al actualizar:", e);
    return { error: "Error en la base de datos: " + e.message };
  }
  
  // El redirect debe ir fuera del bloque try/catch
  redirect('/admin');
}