// actions/auth.ts
'use server'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Agregamos 'prevState' como primer argumento
export async function loginAdmin(prevState: any, formData: FormData) {
  const pin = formData.get('pin') as string;
  const masterPin = process.env.ADMIN_PIN;

  if (pin === masterPin) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    
    // El redirect debe estar fuera para evitar errores de Next.js
  } else {
    return { error: "PIN incorrecto. Intenta de nuevo." };
  }

  // Redirección exitosa
  redirect('/admin');
}