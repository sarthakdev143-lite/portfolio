import SmoothScroll from "@/components/SmoothScroll";
import MagneticButton from "@/components/MagneticButton";
import CurvedLoop from "@/components/CurvedLoop";
import ProjectGallery from "@/components/ProjectGallery";
import Hero from "@/components/HeroSection";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="bg-[#0f0f11] text-[#f3f3f3] min-h-screen font-sans selection:bg-[#ccff00] selection:text-black overflow-x-hidden">

        <Hero />
        <CurvedLoop marqueeText="Sarthak Parulekar ✦" />

        {/* HOVER GALLERY SECTION */}
        <section className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto w-full py-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-16 gap-6">
            <p className="text-xl md:text-2xl text-gray-400 max-w-md font-light leading-relaxed">
              Tying custom interaction design directly to physics to make interfaces feel raw and responsive.
            </p>

            <MagneticButton>
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#ccff00] flex items-center justify-center text-black font-medium shadow-lg text-lg">
                Connect
              </div>
            </MagneticButton>
          </div>

        </section>
        <ProjectGallery />

      </main>
    </SmoothScroll>
  );
}