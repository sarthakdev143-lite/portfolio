"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_PANELS } from "../lib/config";
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
    const [terminalInitialCommand, setTerminalInitialCommand] = useState<string | undefined>(undefined);

    const openTerminalWithDm = () => {
        setTerminalInitialCommand("dm");
        setIsTerminalOpen(true);
    };

    const closeTerminal = () => {
        setIsTerminalOpen(false);
        setTerminalInitialCommand(undefined);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // DESKTOP: Full kinetic explosion and pinning
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

            // MOBILE: Clean static fade-ins, no scroll-jacking
            mm.add("(max-width: 767px)", () => {
                gsap.set(".floating-panel-initial", { clearProps: "transform" });
                const mobileTimeline = gsap.timeline();
                mobileTimeline.to(navRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
                    .to(".intro-mask-line", { y: "0%", duration: 1, ease: "power3.out", stagger: 0.1 }, "-=0.4")
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div ref={containerRef} className="relative w-full min-h-screen md:h-screen bg-[#0f0f11] text-[#f3f3f3] overflow-visible md:overflow-hidden" style={{ perspective: "1000px" }}>
                {/* HEADLINE */}
                <div ref={titleContainerRef} className="relative md:absolute md:inset-0 flex flex-col items-start md:items-center justify-start md:justify-center z-10 select-none pointer-events-none px-5 pt-24 md:p-0">
                    <h1 className="text-[clamp(2.25rem,14vw,6.5rem)] md:text-[8vw] font-black tracking-tight md:tracking-tighter leading-[0.9] md:leading-[0.82] uppercase text-left md:text-center w-full max-w-7xl mx-auto">
                        <div className="overflow-hidden block py-2">
                            <span className="intro-mask-line block will-change-transform translate-y-[110%]">DISRUPTIVE</span>
                        </div>
                        <div className="overflow-hidden block py-2">
                            <span className="intro-mask-line block will-change-transform text-transparent translate-y-[110%]" style={{ backgroundClip: "text", WebkitBackgroundClip: "text", backgroundImage: "linear-gradient(to right, #6b7280, #d1d5db, #ffffff)" }}>
                                ARCHITECT
                            </span>
                        </div>
                    </h1>
                </div>

                {/* PANELS */}
                <div
                    ref={panelGridRef}
                    className="relative md:absolute md:inset-0 w-full md:h-full pointer-events-none z-20 px-5 md:px-8 pb-12 pt-7 md:py-0 flex flex-col gap-3 md:gap-9 justify-center"
                >
                    <div className="grid grid-cols-1 min-[380px]:grid-cols-2 md:flex md:flex-row gap-3 md:gap-6 w-full items-stretch">

                        {/* PANEL 2 */}
                        <div className="f-panel-2 floating-panel-initial order-2 md:order-0 bg-[#16161a] border border-white/8 rounded-lg md:rounded-2xl p-4 md:p-8 flex-1 flex flex-col justify-between pointer-events-auto backdrop-blur-md shadow-2xl min-h-30 md:min-h-0" style={{ transform: "translateX(-120vw) translateY(-20vh) rotate(-25deg) scale(1.5)" }}>
                            <div className="flex justify-between items-start border-b border-white/5 pb-3 md:pb-4">
                                <span className="font-mono text-[10px] md:text-xs" style={{ color: "#00BFFF" }}>{panel2.tag}</span>
                                <span className="font-mono text-[10px] md:text-xs text-gray-500">{panel2.meta}</span>
                            </div>
                            <div className="my-4 md:my-auto">
                                <h2 className="text-lg min-[380px]:text-2xl md:text-4xl font-black tracking-tight md:tracking-tighter uppercase leading-none md:leading-[0.95] whitespace-pre-line">
                                    {panel2.headline}
                                </h2>
                            </div>
                            <div className="flex justify-between items-center pt-1 md:pt-2">
                                <p className="hidden md:block text-base font-medium max-w-xs text-gray-400">{panel2.subtext}</p>
                                <span className="text-lg md:text-2xl text-white/40">✦</span>
                            </div>
                        </div>

                        {/* PANEL 1 */}
                        <div className="f-panel-1 floating-panel-initial order-1 min-[380px]:col-span-2 md:order-0 bg-brand text-black rounded-lg md:rounded-2xl p-4 md:p-8 flex-[1.3] flex flex-col justify-between pointer-events-auto shadow-2xl min-h-0 md:min-h-0" style={{ transform: "translateX(120vw) translateY(30vh) rotate(35deg) scale(1.25)" }}>
                            <div className="flex justify-between items-start border-b border-black/10 pb-3 md:pb-4">
                                <span className="font-mono text-[10px] md:text-xs font-bold">{panel1.tag}</span>
                                <span className="font-mono text-[10px] md:text-xs font-bold opacity-60">{panel1.meta}</span>
                            </div>
                            <div className="py-4 md:py-0">
                                <h2 className="text-[1.35rem] min-[380px]:text-[1.7rem] md:text-2xl font-black tracking-tight mb-2 md:mb-3 uppercase leading-none whitespace-pre-line">
                                    {panel1.title}
                                </h2>
                                <p className="text-[0.78rem] min-[380px]:text-[0.95rem] md:text-base text-black leading-relaxed">{panel1.desc}</p>
                            </div>
                            <div className="flex flex-wrap gap-1.5 md:gap-2 pt-0 md:pt-4">
                                {panel1.stack?.map((tech) => (
                                    <span key={tech} className="font-mono text-[9px] min-[380px]:text-[10px] md:text-sm bg-black/15 px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* PANEL 3 */}
                        <div className="f-panel-3 floating-panel-initial order-3 md:order-0 bg-[#16161a] border border-white/8 rounded-lg md:rounded-2xl p-4 md:p-6 flex-1 flex flex-col justify-between pointer-events-auto shadow-2xl min-h-0 md:min-h-0" style={{ transform: "translateY(150vh) rotate(-15deg)" }}>
                            <div className="flex justify-between items-center">
                                <span className="font-mono text-[10px] text-gray-500">{panel3.tag}</span>
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            </div>
                            <div className="py-2">
                                <div className="text-lg min-[380px]:text-2xl md:text-3xl font-mono tracking-tight md:tracking-tighter text-white font-bold leading-tight whitespace-pre-line">
                                    {panel3.title}
                                </div>
                                <p className="text-xs md:text-base text-gray-400 mt-2">{panel3.desc}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center w-full">
                        <div className="f-panel-4 floating-panel-initial w-full min-[380px]:w-auto bg-zinc-900 border border-white/10 rounded-lg md:rounded-2xl px-5 md:px-10 py-4 md:py-6 flex flex-col items-center justify-center gap-3 md:gap-4 pointer-events-auto shadow-2xl hover:border-brand transition-colors duration-300" style={{ transform: "translateY(60vh) rotate(3deg) scale(1.25)" }}>
                            <p className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">{panel4.tag}</p>
                            <button onClick={openTerminalWithDm} className="text-black cursor-pointer font-mono text-xs font-bold py-3 px-8 rounded-full bg-brand hover:scale-105 transition-transform duration-300">
                                {panel4.cta}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isTerminalOpen && (
                    <Terminal
                        onClose={closeTerminal}
                        initialCommand={terminalInitialCommand}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
