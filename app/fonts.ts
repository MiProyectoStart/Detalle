// app/fonts.ts
import { Playfair_Display, Dancing_Script } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic"],
  variable: "--font-playfair", // Opcional: para usar como variable CSS
});

export const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing-script',
});