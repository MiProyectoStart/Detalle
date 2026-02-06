import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { playfair, poppins  } from "./fonts";
// 1. Configuración de fuentes


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. Metadata (SOLO en Server Components)
export const metadata: Metadata = {
  title: "Nuestra Historia",
  description: "Un viaje de amor eterno capturado en una experiencia digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${playfair.variable} 
          antialiased bg-[#0a0a0a]
        `}
      >
        {children}
      </body>
    </html>
  );
}

// Exportamos la fuente para usarla en otros componentes
export { playfair };