"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";
import CircularText from "./CircularText";

export default function Hero() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline();

            // 1. Clean fade in for top navigation
            timeline.fromTo(
                navRef.current,
                { y: -15, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );

            // 2. Smooth reveal of the masked text blocks (Fixed typo from 'stale' to 'stagger')
            if (titleRef.current) {
                const lines = titleRef.current.querySelectorAll(".mask-line");
                timeline.fromTo(
                    lines,
                    { y: "100%" },
                    { y: "0%", duration: 1.1, ease: "power4.out", stagger: 0.12 },
                    "-=0.5"
                );
            }

            // 3. Fade in bottom details
            timeline.fromTo(
                footerRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.4"
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative h-90% flex flex-col justify-between mx-auto w-full pt-12 font-sans overflow-hidden">

            {/* TOP NAVIGATION HEADER */}
            <div ref={navRef} className="opacity-0 flex justify-between items-center w-full px-12 z-10 text-sm tracking-tight text-gray-400">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span>Available</span>
                </div>
                <div className="flex gap-8 font-mono">
                    <span>[ INDIA ]</span>
                </div>
            </div>

            {/* ASYMMETRIC MAIN HEADLINE */}
            <div className="w-full my-auto flex flex-col items-start justify-center mt-12">
                <h1 ref={titleRef} className="text-6xl md:text-[6vw] w-[90%] mx-auto font-light tracking-tighter leading-[0.9] uppercase">
                    <div className="overflow-hidden block h-fit py-1">
                        <span className="mask-line block will-change-transform">Disruptive</span>
                    </div>
                    <div className="overflow-hidden block h-fit py-1 md:pl-[12vw]">
                        <span className="mask-line block will-change-transform text-transparent bg-clip-text bg-linear-to-r from-gray-400 to-[#f3f3f3]">
                            Architect &
                        </span>
                    </div>
                    <div className="overflow-hidden block h-fit py-1">
                        <span className="mask-line block will-change-transform">Developer.</span>
                    </div>
                </h1>
            </div>

            {/* FOOTER METRICS & MAGNETIC ACTION */}
            <div ref={footerRef} className="w-[90%] mx-auto opacity-0 flex flex-col sm:flex-row justify-between items-start sm:items-end pb-20 gap-8 z-10">
                <div className="max-w-sm text-gray-400 font-light text-base md:text-lg leading-relaxed">
                    <p>Crafting high-performance web applications, digital systems, and fluid interactive physics interfaces.</p>
                </div>

                <div className="sm:pr-12">
                    {/* <CircularText text="SCROLL*DOWN*PLS*" /> */}
                    {/* <MagneticButton>
                        <button className="bg-[#ccff00] magnetic-target group relative w-32 h-32 md:w-36 md:h-36 rounded-full border border-[#f3f3f3]/20 text-black text-sm font-medium tracking-tight overflow-hidden flex items-center justify-center shadow-xl">
                            <span className="relative z-10 pointer-events-none block">
                                Scroll Down ↓
                            </span>
                        </button>
                    </MagneticButton> */}
                </div>
            </div>

        </section>
    );
}