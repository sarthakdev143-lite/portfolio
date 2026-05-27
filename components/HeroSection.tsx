"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_PANELS } from "@/lib/config";
import { AnimatePresence } from "motion/react";
import Terminal from "./Terminal";

const { panel1, panel2, panel3, panel4 } = HERO_PANELS;

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleContainerRef = useRef<HTMLDivElement>(null);
    const panelGridRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // 💻 DESKTOP: Full kinetic explosion and pinning
            mm.add("(min-width: 768px)", () => {
                // 1. Initial Intro
                const introTimeline = gsap.timeline();
                introTimeline.to(navRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" })
                    .to(".intro-mask-line", { y: "0%", duration: 1.2, ease: "power4.out", stagger: 0.1 }, "-=0.5")

                // 2. The Flying Deconstruction
                const scrollTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "+=150%",
                        scrub: 1,
                        pin: true,
                        invalidateOnRefresh: true,
                    }
                });

                scrollTimeline
                    .to(titleContainerRef.current, { scale: 2.5, opacity: 0, y: -100, rotateX: 15, transformOrigin: "center center", ease: "none" }, 0)
                    .to(".f-panel-1", { x: "0vw", y: "0vh", rotate: -2, scale: 1, ease: "none" }, 0)
                    .to(".f-panel-2", { x: "0vw", y: "0vh", rotate: 1, scale: 1, ease: "none" }, 0)
                    .to(".f-panel-3", { x: "0vw", y: "0vh", rotate: -1, scale: 1, ease: "none" }, 0)
                    .to(".f-panel-4", { x: "0vw", y: "0vh", rotate: 3, scale: 1, ease: "none" }, 0)
                    .to(navRef.current, { opacity: 0, y: -30, ease: "none" }, 0);
            });

            // 📱 MOBILE: Clean static fade-ins, no scroll-jacking
            mm.add("(max-width: 767px)", () => {
                const mobileTimeline = gsap.timeline();
                mobileTimeline.to(navRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
                    .to(".intro-mask-line", { y: "0%", duration: 1, ease: "power3.out", stagger: 0.1 }, "-=0.4")
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div ref={containerRef} className="relative w-full h-screen bg-[#0f0f11] text-[#f3f3f3] overflow-hidden perspective-1000">
                {/* HEADLINE */}
                <div ref={titleContainerRef} className="absolute inset-0 flex flex-col items-center justify-center z-10 select-none pointer-events-none">
                    <h1 className="text-7xl md:text-[8vw] font-black tracking-tighter leading-[0.85] uppercase text-center w-full max-w-7xl mx-auto">
                        <div className="overflow-hidden block py-2">
                            <span className="intro-mask-line block will-change-transform translate-y-[110%]">DISRUPTIVE</span>
                        </div>
                        <div className="overflow-hidden block py-2">
                            <span className="intro-mask-line block will-change-transform text-transparent translate-y-[110%] bg-clip-text bg-linear-to-r from-gray-500 via-gray-300 to-white">
                                ARCHITECT
                            </span>
                        </div>
                    </h1>
                </div>

                {/* PANELS */}
                <div
                    ref={panelGridRef}
                    className="absolute inset-0 w-full h-full pointer-events-none z-20 px-8 flex flex-col gap-9 justify-center"
                >
                    <div className="flex flex-row gap-6 w-full items-stretch">

                        {/* PANEL 2 */}
                        <div className="f-panel-2 floating-panel-initial bg-[#16161a] border border-white/5 rounded-2xl p-8 flex-1 flex flex-col justify-between transform translate-x-[-120vw] translate-y-[-20vh] rotate-[-25deg] scale-150 pointer-events-auto backdrop-blur-md shadow-2xl">
                            <div className="flex justify-between items-start border-b border-white/5 pb-4">
                                <span className="font-mono text-xs text-brand">{panel2.tag}</span>
                                <span className="font-mono text-xs text-gray-500">{panel2.meta}</span>
                            </div>
                            <div className="my-auto">
                                <h2 className="text-4xl font-black tracking-tighter uppercase leading-[0.9] whitespace-pre-line">
                                    {panel2.headline}
                                </h2>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <p className="text-base font-medium max-w-xs text-gray-400">{panel2.subtext}</p>
                                <span className="text-2xl">✦</span>
                            </div>
                        </div>

                        {/* PANEL 1 */}
                        <div className="f-panel-1 floating-panel-initial bg-brand text-black rounded-2xl p-8 flex-[1.3] flex flex-col justify-between transform translate-x-[120vw] translate-y-[30vh] rotate-35 scale-125 pointer-events-auto shadow-2xl">
                            <div className="flex justify-between items-start border-b border-black/10 pb-4">
                                <span className="font-mono text-xs font-bold">{panel1.tag}</span>
                                <span className="font-mono text-xs font-bold opacity-60">{panel1.meta}</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tight mb-2 uppercase whitespace-pre-line">
                                    {panel1.title}
                                </h2>
                                <p className="text-base text-black leading-relaxed">{panel1.desc}</p>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-4">
                                {panel1.stack?.map((tech) => (
                                    <span key={tech} className="font-mono text-sm bg-black/15 px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* PANEL 3 */}
                        <div className="f-panel-3 floating-panel-initial bg-[#16161a] border border-white/5 rounded-2xl p-6 flex-1 flex flex-col justify-between transform translate-y-[150vh] rotate-[-15deg] pointer-events-auto shadow-2xl">
                            <div className="flex justify-between items-center">
                                <span className="font-mono text-[10px] text-gray-500">{panel3.tag}</span>
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            </div>
                            <div className="py-2">
                                <div className="text-3xl font-mono tracking-tighter text-white font-bold whitespace-pre-line">
                                    {panel3.title}
                                </div>
                                <p className="text-base text-gray-400 mt-2">{panel3.desc}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center w-full">
                        <div className="f-panel-4 floating-panel-initial bg-zinc-900 border border-white/10 rounded-2xl px-10 py-6 flex flex-col items-center justify-center gap-4 transform translate-y-[60vh] rotate-3 scale-125 pointer-events-auto shadow-2xl hover:border-brand transition-colors duration-300">
                            <p className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">{panel4.tag}</p>
                            <button onClick={() => setIsTerminalOpen(true)} className="text-black cursor-pointer font-mono text-xs font-bold py-3 px-8 rounded-full bg-brand hover:scale-105 transition-transform duration-300">
                                {panel4.cta}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isTerminalOpen && <Terminal onClose={() => setIsTerminalOpen(false)} />}
            </AnimatePresence>

        </>
    );
}