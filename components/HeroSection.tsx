"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleContainerRef = useRef<HTMLDivElement>(null);
    const panelGridRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            let mm = gsap.matchMedia();

            // 💻 DESKTOP: Full kinetic explosion and pinning
            mm.add("(min-width: 768px)", () => {
                // 1. Initial Intro
                const introTimeline = gsap.timeline();
                introTimeline.to(navRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" })
                    .to(".intro-mask-line", { y: "0%", duration: 1.2, ease: "power4.out", stagger: 0.1 }, "-=0.5")
                    .to(".floating-panel-initial", { scale: 1, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.05 }, "-=0.8");

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
                // Just smoothly bring everything into view immediately
                mobileTimeline.to(navRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
                    .to(".intro-mask-line", { y: "0%", duration: 1, ease: "power3.out", stagger: 0.1 }, "-=0.4")
                    // Bring the panels in straight, overriding the scattered transforms
                    .to(".floating-panel-initial", {
                        x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out"
                    }, "-=0.2");
            });

        }, containerRef); // Scopes all queries like ".f-panel-1" exclusively to this component

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-[#0f0f11] text-[#f3f3f3] overflow-hidden perspective-1000">
            {/* THE GIANT KINETIC HEADLINE (COLLAPSES & FLIES AWAY) */}
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

            {/* THE FLYING ARRANGEMENT PANELS */}
            {/* These elements start completely scattered out of bounds, skewed, and oversized, then fly perfectly into structure on scroll */}
            <div ref={panelGridRef} className="absolute inset-0 w-full h-full pointer-events-none z-20 px-8 py-24 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                {/* PANEL 1: SYSTEM CAPABILITY STACK (Flies from deep left window boundary) */}
                <div className="f-panel-1 bg-[#16161a] border border-white/5 rounded-2xl p-8 md:col-span-4 h-[55vh] flex flex-col justify-between transform translate-x-[-120vw] translate-y-[-20vh] rotate-[-25deg] scale-150 pointer-events-auto backdrop-blur-md shadow-2xl">
                    <div className="flex justify-between items-start border-b border-white/5 pb-4">
                        <span className="font-mono text-xs text-[#ccff00]">[ CORE ]</span>
                        <span className="font-mono text-xs text-gray-500">01 // STRUCT</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-light tracking-tight mb-2 uppercase text-white">SYSTEM ARCHITECTURE</h3>
                        <p className="text-sm text-gray-400 font-light leading-relaxed">Developing deterministic client states, responsive WebGL sandboxes, and highly automated cloud node topologies.</p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-4">
                        {["TypeScript", "Next.js", "GSAP Matrix", "WebGL"].map((t) => (
                            <span key={t} className="font-mono text-[10px] bg-white/5 px-2 py-1 rounded text-gray-300">{t}</span>
                        ))}
                    </div>
                </div>

                {/* PANEL 2: INTERACTIVE KINETIC DISPLAY CAPULE (Flies from deep right window boundary) */}
                <div className="f-panel-2 bg-[#ccff00] text-black rounded-2xl p-8 md:col-span-5 h-[40vh] flex flex-col justify-between transform translate-x-[120vw] translate-y-[30vh] rotate-35 scale-125 pointer-events-auto shadow-2xl">
                    <div className="flex justify-between items-start border-b border-black/10 pb-4">
                        <span className="font-mono text-xs font-bold">[ PHYSICAL INTENT ]</span>
                        <span className="font-mono text-xs opacity-60">02 // KINETICS</span>
                    </div>
                    <div className="my-auto">
                        <h2 className="text-4xl font-black tracking-tighter uppercase leading-[0.9]">
                            BREAKING THE PLATFORM RIGIDITY.
                        </h2>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <p className="text-xs font-medium max-w-50">Why build conventional boxes when layouts can move like fluid software assets?</p>
                        <span className="text-2xl">✦</span>
                    </div>
                </div>

                {/* COMBINED SUB-CONTAINERS FOR RIGHT SIDE PANEL 3 & 4 */}
                <div className="md:col-span-3 h-[60vh] flex flex-col gap-6 justify-between">

                    {/* PANEL 3: PERFORMANCE METRICS DISPLAY (Flies straight up from below screen viewport) */}
                    <div className="f-panel-3 bg-[#16161a] border border-white/5 rounded-2xl p-6 h-[48%] flex flex-col justify-between transform translate-y-[150vh] rotate-[-15deg] pointer-events-auto shadow-2xl">
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-[10px] text-gray-500">[ PERFORMANCE RUN ]</span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        </div>
                        <div className="py-2">
                            <div className="text-5xl font-mono tracking-tighter text-white font-bold">99<span className="text-xs text-[#ccff00]">FPS</span></div>
                            <p className="text-xs text-gray-400 mt-1">Consistent paint performance across demanding layout canvas manipulation sweeps.</p>
                        </div>
                    </div>

                    {/* PANEL 4: CALL TO ACTION CONSOLE BUTTON (Flies down diagonally from top right boundary) */}
                    <div className="f-panel-4 bg-zinc-900 border border-white/10 rounded-2xl p-6 h-[48%] flex flex-col items-center justify-center transform translate-x-[50vw] translate-y-[-100vh] rotate-45 scale-150 pointer-events-auto shadow-2xl group hover:border-[#ccff00] transition-colors duration-300">
                        <p className="font-mono text-[10px] text-gray-500 mb-4 tracking-widest uppercase">[ ACCESS CORE TERMINAL ]</p>
                        <MagneticButton>
                            <button className="bg-white text-black font-mono text-xs font-bold py-3 px-6 rounded-full group-hover:bg-[#ccff00] group-hover:text-black transition-colors duration-300">
                                INITIALIZE MATRIX_
                            </button>
                        </MagneticButton>
                    </div>

                </div>

            </div>

        </div>
    );
}