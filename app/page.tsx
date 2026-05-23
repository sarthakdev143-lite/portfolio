import Hero from "@/components/HeroSection";
import CurvedLoop from "@/components/CurvedLoop";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectGallery from "@/components/ProjectGallery";
import ExperienceShowcase from "@/components/ExperienceShowcase";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* 1. Hero Introduction Entrypoint */}
      <Hero />

      {/* 2. Interactive Ambient Separator Belt */}
      <div className="py-8 bg-[#0f0f11] overflow-hidden">
        <CurvedLoop
          marqueeText="INGENIOUS BUILDER // SARTHAK PARULEKAR // "
          speed={2.5}
          interactive={true}
        />
      </div>

      {/* 3. Narrative Cinematic Manifest Segment */}
      <section className="max-w-6xl mx-auto px-6 pt-32 md:pt-48">
        <ScrollReveal
          baseOpacity={0.05}
          baseRotation={4}
          blurStrength={12}
          wordAnimationEnd="top 30%"
        >
          I ARCHITECT HIGH PERFORMANCE APPLICATIONS BY INTEGRATING INTERACTIVE PHYSICS INTERFACES DIRECTLY INTO THE DATA PIPELINE, WE ERASE THE SEAMS BETWEEN RAW LOGIC AND KINETIC BEAUTY.
        </ScrollReveal>
      </section>

      {/* 4. Active Experience Showcase Circuit Pipeline */}
      <ExperienceShowcase />

      {/* 5. Production Application Showcases & Interactive Console Terminal */}
      <ProjectGallery />
    </div>
  );
}