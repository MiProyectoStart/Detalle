import { getLandingProject } from "@/actions/project";
import Image from "next/image";
import { Metadata } from "next";
import Counter from "@/components/Counter";
import Navbar from "@/components/layout/Navbar"; // Nuevo componente
import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, Heart } from "lucide-react";
import { playfair } from "@/app/layout";
import ScrollIndicator from "@/components/ScrollIndicator";
import GallerySection from "@/components/gallery/GallerySection";
import TimelineSection from "@/components/timeline/TimeLineSection";
import ReasonsSection from '@/components/reasons/ReasonsSection'; // Importa el nuevo módulo
import VowsSection from "@/components/vows/VowsSection"
import LoveBubblesSection from "@/components/love-bubbles/LoveBubblesSection";
import SoundtrackSection from "@/components/soundtrack/SoundtrackSection";
import Footer from "@/components/layout/Footer";

import PolaroidCard from "@/components/love-bubbles/PolaroidCard";

// app/[slug]/page.tsx
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getLandingProject(slug);
  if (!project) return {};

  return {
    title: project.heroTitle,
    description: project.heroDescription,
    openGraph: {
      images: [project.heroBgImage],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getLandingProject(slug);
  if (!project) notFound();

  const dynamicStyle = {
    '--accent-color': project.accentColor || '#F42559',
  } as React.CSSProperties;

  return (
    <main
      style={dynamicStyle}
      className="relative min-h-screen bg-[#050505] text-white font-sans"
    >
      {/* 1. HERO SECTION INTEGRADA (Navbar + Contenido + Fondo) */}
      <section
        id="inicio"
        className="relative min-h-screen flex flex-col overflow-hidden"
      >
        {/* FONDO: Ahora usa Next/Image para optimización */}
        <div className="absolute inset-0 z-0">
          <Image
            src={project.heroBgImage}
            alt="Background"
            fill
            priority
            className="object-cover object-[center_20%] transition-transform duration-[10s] hover:scale-105"
          />
          {/* Overlay que se funde con el fondo negro de la galería */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#050505]" />
        </div>

        {/* CONTENIDO SOBRE EL FONDO (z-10 para visibilidad) */}
        <div className="relative z-10 flex flex-col min-h-screen">

          {/* A. NAVBAR: Dentro del flujo del Hero */}
          <Navbar logo={project.namesLogo} slug={slug} />

          {/* B. CONTENIDO CENTRAL: flex-1 lo centra verticalmente en el espacio sobrante */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 w-full items-center px-6 sm:px-12 lg:px-20 py-24 lg:py-0">

            {/* LADO IZQUIERDO: Texto y Contador */}
            <div className="flex flex-col items-start text-left space-y-4 md:space-y-6">
              <p className="text-accent font-bold tracking-[0.3em] text-xs sm:text-[14px] uppercase animate-fade-in">
                Nuestra historia continúa...
              </p>

              <div className="flex flex-col items-start">
                <h1 className="text-[18vw] sm:text-7xl md:text-8xl lg:text-[120px] font-bold leading-[0.85] tracking-tighter">
                  <Counter startDate={project.startDate} />
                </h1>
                <span className="text-[12vw] sm:text-5xl md:text-6xl lg:text-8xl font-bold mt-2">
                  Amándote
                </span>
              </div>

              <p className="max-w-md text-gray-300 text-base sm:text-lg font-light leading-relaxed">
                {project.heroDescription}
              </p>

              <Link
                href={`/${project.slug}/carta`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md hover:bg-white/10 transition group"
              >
                <BookOpen size={20} className="text-accent" />
                <span className="text-sm font-medium tracking-wide">Leer más</span>
              </Link>
            </div>

            {/* LADO DERECHO: Tarjeta de Cristal (Glassmorphism) */}
            <div className="flex justify-center lg:justify-end mt-16 lg:mt-0">
              <div className="relative px-8 py-10 sm:px-16 sm:py-12 bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl rounded-[3rem] sm:rounded-full max-w-sm sm:max-w-md w-full">
                <div className="flex flex-col items-start space-y-6 mx-auto w-fit">
                  <p className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold">
                    Nuestra Historia
                  </p>
                  <h2 className={`text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-white ${playfair.className}`}>
                    {project.coupleNames.split("&")[0]}{" "}
                    <span className="text-accent not-italic">&</span>
                    <br />
                    {project.coupleNames.split("&")[1]}
                  </h2>
                  <div className="flex items-center gap-2 text-[10px] tracking-widest opacity-60 uppercase font-bold">
                    <Heart size={12} className="text-white " />
                    <span>Te Amo</span>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* 2. SIGUIENTE SECCIÓN: GALERÍA (Fondo negro sólido) */}
      <GallerySection moments={project.gallery} />


      <TimelineSection events={project.timeline} />

      <SoundtrackSection project={project} />


      <ReasonsSection reasons={project.reasons} />



      <LoveBubblesSection bubbles={project.bubbles} />


      <VowsSection vows={project.vows} />



      <Footer project={project} />


    </main>
  );
}