import MagneticButton from "@/components/MagneticButton";
import CurvedLoop from "@/components/CurvedLoop";
import ProjectGallery from "@/components/ProjectGallery";
import Hero from "@/components/HeroSection";
import ScrollReveal from "@/components/ScrollReveal"; 
import CircularText from "@/components/CircularText"; 

export default function Home() {
  return (
    <main className="bg-[#0f0f11] text-[#f3f3f3] min-h-screen font-sans selection:bg-[#ccff00] selection:text-black overflow-x-hidden">

      {/* 1. HERO */}
      <Hero />

      {/* 2. INFINITE WAVE SEPARATOR */}
      <CurvedLoop marqueeText="Sarthak Parulekar ✦" speed={3} className="text-[#ccff00]/10 font-black" />

      {/* 3. MANIFESTO (With Scroll-Driven Text Unblurring) */}
      <section className="min-h-[80vh] flex flex-col justify-center max-w-6xl mx-auto w-full py-32 px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-12">

          {/* We use your ScrollReveal component here instead of a raw <p> tag */}
          <div className="max-w-2xl">
            <ScrollReveal baseOpacity={0} blurStrength={6} rotationEnd="top top" wordAnimationEnd="top top+=200">
              Tying custom interaction design directly to physics to make interfaces feel raw and responsive.
            </ScrollReveal>
          </div>

          {/* Interactive Magnetic Cluster */}
          <div className="relative flex items-center justify-center pt-8 md:pt-0">
            <CircularText
              text="EXPLORE*WORK*"
              spinDuration={15}
              onHover="slowDown"
              className="absolute text-white/20 text-xs tracking-widest scale-120"
            />
            <MagneticButton>
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-[#ccff00] hover:scale-105 transition-transform duration-300 flex items-center justify-center text-black font-semibold shadow-lg text-base">
                Connect
              </div>
            </MagneticButton>
          </div>

        </div>
      </section>

      {/* 4. PROJECTS */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-8 mb-8">
          <p className="font-mono text-xs tracking-widest text-gray-500 uppercase">[ Selected Works ]</p>
        </div>
        <ProjectGallery />
      </div>

    </main>
  );
}