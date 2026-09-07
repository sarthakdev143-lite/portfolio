"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Terminal from "./Terminal";
import { AnimatePresence } from "motion/react";
import { PROJECTS } from "@/lib/config";
import ProjectCard, { type Project } from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectGallery() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);

    useEffect(() => {
        const track = trackRef.current;
        const container = scrollContainerRef.current;
        if (!track || !container) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // 💻 DESKTOP: Horizontal Scroll Matrix
            mm.add("(min-width: 768px)", () => {
                const totalScrollDistance = track.scrollWidth - window.innerWidth;

                const scrollTween = gsap.to(track, {
                    x: () => -totalScrollDistance,
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        pin: true,
                        scrub: 1,
                        start: "top top",
                        end: () => `+=${track.scrollWidth}`,
                        invalidateOnRefresh: true,
                    }
                });

                // Spatial distortion on individual cards
                gsap.utils.toArray<HTMLElement>(".project-panel").forEach((panel) => {
                    gsap.fromTo(panel.querySelector(".panel-content"),
                        { scale: 0.9, rotateY: 15, opacity: 0.6 },
                        {
                            scale: 1, rotateY: 0, opacity: 1, ease: "power2.out",
                            scrollTrigger: {
                                trigger: panel,
                                containerAnimation: scrollTween,
                                start: "left right-=20%",
                                end: "center center",
                                scrub: true,
                            }
                        }
                    );
                });

                // The Black Hole Footer 
                gsap.fromTo(".void-bg",
                    { scale: 0.3, borderRadius: "500px", opacity: 0 },
                    {
                        scale: 1, borderRadius: "0px", opacity: 1, ease: "none",
                        scrollTrigger: {
                            trigger: ".void-panel",
                            containerAnimation: scrollTween,
                            start: "left right",
                            end: "left left",
                            scrub: true,
                        }
                    }
                );
            });

            // 📱 MOBILE: Standard vertical flow
            mm.add("(max-width: 767px)", () => {
                // Ensure the track doesn't try to stretch off-screen on phones
                gsap.set(track, { width: "100%", x: 0 });
                gsap.set(".project-panel", { width: "100%", height: "auto" });
                gsap.set(".void-panel", { width: "100%", height: "100vh" });

                // Simple slide-up reveals for the cards as you scroll down
                gsap.utils.toArray<HTMLElement>(".project-panel").forEach((panel) => {
                    gsap.fromTo(panel.querySelector(".panel-content"),
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                            scrollTrigger: {
                                trigger: panel,
                                start: "top 85%",
                            }
                        }
                    );
                });
            });

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div className="mx-auto max-w-7xl flex flex-col items-start px-4 sm:px-6 md:px-8 py-16 md:py-20">
                <span className="text-[10px] sm:text-xs font-mono text-white/40 uppercase tracking-[0.24em] sm:tracking-[0.4em] mb-3">
                    {"// COMPILED ARTIFACTS"}
                </span>
                <h2 className="text-[clamp(2.1rem,12vw,3.75rem)] md:text-6xl flex-wrap font-bold font-mono text-white uppercase tracking-tighter leading-none">
                    PROJECTS <span className="text-brand/30">BUILD LOG</span>
                </h2>
            </div>
            <div ref={scrollContainerRef} className="relative w-full md:h-screen bg-[#0f0f11] overflow-hidden" style={{ "--projects-count": PROJECTS.length } as React.CSSProperties}>
                <div ref={trackRef} className="relative md:absolute top-0 left-0 h-full flex flex-col md:flex-row items-center will-change-transform md:w-[calc((var(--projects-count)+1)*100vw)] w-full">

                    {/* PROJECT LAYOUT CAPSULES */}
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project as Project} />
                    ))}

                    {/* THE VOID / BLACK HOLE CLOSING TERMINAL FOOTER */}
                    <section className="void-panel w-full md:w-screen min-h-screen md:h-screen relative flex items-center justify-center shrink-0 overflow-hidden bg-[#0f0f11] max-sm:mt-20">
                        {/* Expanding background layer triggered directly by horizontal scroll tracking */}
                        <div className="void-bg absolute inset-0 bg-brand z-0" />

                        <div className="relative z-10 text-center text-black px-6 max-w-3xl flex flex-col items-center">
                            <span className="font-mono text-xs tracking-[0.3em] font-bold uppercase mb-4 text-black/60">[ END OF PIPELINE ]</span>
                            <h2 className="text-[clamp(2.6rem,15vw,5rem)] md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
                                LET&apos;S EXECUTE SOMETHING.
                            </h2>
                            <p className="text-sm md:text-base font-medium max-w-md mb-12 text-black/80">
                                Have an engine architecture configuration, infrastructure optimization problem, or highly responsive UI workspace layout that needs assembly?
                            </p>

                            <button
                                onClick={() => setIsTerminalOpen(true)}
                                className="magnetic-target bg-black text-brand font-mono text-xs font-bold py-5 px-10 rounded-full hover:scale-105 transition-transform duration-300 shadow-2xl tracking-widest uppercase cursor-pointer"
                            >
                                INITIALIZE_HANDSHAKE_
                            </button>
                        </div>
                    </section>

                </div>
            </div>

            <AnimatePresence>
                {isTerminalOpen && <Terminal onClose={() => setIsTerminalOpen(false)} />}
            </AnimatePresence>
        </>
    );
}
