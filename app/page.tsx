
import Hero from "@/components/HeroSection";
import CurvedLoop from "@/components/CurvedLoop";
// import ScrollReveal from "@/components/ScrollReveal";
import ProjectGallery from "@/components/ProjectGallery";
import ExperienceShowcase from "@/components/ExperienceShowcase";

export default function Home() {
  return (
    <div className="relative w-full overflow-x-hidden">
      {/* 1. Hero Introduction Entrypoint */}
      <Hero />

      {/* 2. Interactive Ambient Separator Belt */}
      <div className="hidden md:block py-8 bg-[#0f0f11] overflow-hidden">
        <CurvedLoop
          marqueeText="INGENIOUS BUILDER // SARTHAK PARULEKAR // "
          speed={2.5}
          interactive={true}
        />
      </div>

      {/* 3. Active Experience Showcase Circuit Pipeline */}
      <ExperienceShowcase />

      {/* 4. Production Application Showcases & Interactive Console Terminal */}
      <ProjectGallery />
    </div>
  );
}
