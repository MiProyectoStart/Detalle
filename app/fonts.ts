// app/fonts.ts
import { Playfair_Display, Dancing_Script, Poppins, Nunito } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic"],
  variable: "--font-playfair",
});

export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dancing-script",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "300",
    "400",

  ], // pesos más usados en UI
  display: "swap",
  variable: "--font-poppins",
});


export const cormorant = Nunito({
  subsets: ["latin"],
  weight: [
    "300",
    "400",

  ], // pesos más usados en UI
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-nunito",
});
