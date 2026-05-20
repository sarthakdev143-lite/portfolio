import Hero from "@/components/HeroSection";
import CurvedLoop from "@/components/CurvedLoop";
import ScrollReveal from "@/components/ScrollReveal";
import CircularText from "@/components/CircularText";
import MagneticButton from "@/components/MagneticButton";
import ProjectGallery from "@/components/ProjectGallery";

export default function Home() {
  return (
    <main className="bg-[#0f0f11] text-[#f3f3f3] min-h-screen font-sans selection:bg-[#ccff00] selection:text-black overflow-x-hidden">

      {/* 1. KINETIC DECONSTRUCTION HERO BLOCK */}
      <Hero />

      {/* 2. HYPER-FAST CONTINUOUS WAVE MARQUEE SEPARATOR */}
      <CurvedLoop marqueeText="Sarthak Parulekar ✦ CREATIVE SOFTWARE ENGINE ✦" speed={4} className="text-[#ccff00]/10 font-black" />

      {/* 3. THE MANIFESTO CONSOLE */}
      <section className="min-h-screen flex flex-col items-center justify-center max-w-6xl mx-auto w-full py-32 px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-16">

          <div className="max-w-2xl">
            <ScrollReveal baseOpacity={0.05} blurStrength={8} rotationEnd="top top" wordAnimationEnd="top top+=150">
              TYING CUSTOM INTERACTION DESIGN DIRECTLY TO PHYSICS TO MAKE APPLICATIONS FEEL UNAPOLOGETICALLY RAW, HIGH-PERFORMANCE, AND RESPONSIVE.
            </ScrollReveal>
          </div>

          {/* Kinetic Orbit Target Cluster */}
          <div className="relative flex items-center justify-center pt-8 md:pt-0 shrink-0 self-end md:self-center">
            <MagneticButton>
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border border-white/10 hover:border-[#ccff00] bg-transparent transition-colors duration-500 flex items-center justify-center text-white font-mono text-xs uppercase tracking-wider shadow-xl cursor-pointer">
                SYS_STATUS
              </div>
            </MagneticButton>
          </div>

        </div>
      </section>

      {/* 4. THE SPATIAL HORIZONTAL WARP MATRIX GALLERY + CLOSING VOID */}
      <ProjectGallery />

    </main>
  );
}