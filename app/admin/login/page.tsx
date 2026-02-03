// app/admin/login/page.tsx
'use client'
import { useActionState } from 'react';
import { loginAdmin } from '@/actions/auth';
import { Lock, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdmin, null);

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(219,39,119,0.05)_0%,transparent_70%)]" />
      
      <div className="relative w-full max-w-md bg-gray-900/50 border border-white/5 p-12 rounded-[3rem] backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col items-center text-center space-y-6 mb-10">
          <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center text-pink-500 border border-pink-500/20">
            <Lock size={28} />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tighter text-white">Área Restringida</h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Ingresa tu PIN de Acceso</p>
          </div>
        </div>

        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <input 
              type="password" 
              name="pin"
              maxLength={6}
              placeholder="••••••"
              className="w-full bg-black border border-gray-800 rounded-2xl p-5 text-center text-3xl tracking-[1em] focus:border-pink-500 outline-none transition-all placeholder:tracking-normal placeholder:text-gray-800"
              required
              autoFocus
            />
            {state?.error && (
              <p className="text-red-500 text-[10px] font-bold uppercase text-center tracking-widest animate-pulse">
                {state.error}
              </p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full py-5 bg-pink-600 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-pink-700 transition-all shadow-xl shadow-pink-600/20 disabled:opacity-50"
          >
            {isPending ? "Verificando..." : "Acceder al Panel"}
          </button>
        </form>

        <div className="mt-12 flex justify-center gap-2 text-gray-700 items-center">
            <ShieldCheck size={14} />
            <span className="text-[9px] uppercase font-black tracking-[0.3em]">Sesión Segura activada</span>
        </div>
      </div>
    </main>
  );
}