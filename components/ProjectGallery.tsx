"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const projects = [
    { title: "UnderCorre", category: "3D Physics / FPS Engine", tech: "Three.js, Rapier.js", color: "#8C8C8C", },
    { title: "FairFlow", category: "OfflineFirst System", tech: "React, PWA", color: "#EFE8D3", },
    { title: "Orchestrator", category: "AI Workflow Engine", tech: "Chrome API, Node.js", color: "#706D63", },
];

export default function ProjectGallery() {
    const [activeProject, setActiveProject] = useState(0);

    const modalRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!modalRef.current || !cursorRef.current) return;

        // Smooth GSAP mouse tracking
        const moveModalX = gsap.quickTo(modalRef.current, "x", { duration: 0.8, ease: "power3.out", });
        const moveModalY = gsap.quickTo(modalRef.current, "y", { duration: 0.8, ease: "power3.out", });
        const moveCursorX = gsap.quickTo(cursorRef.current, "x", { duration: 0.5, ease: "power3.out", });
        const moveCursorY = gsap.quickTo(cursorRef.current, "y", { duration: 0.5, ease: "power3.out", });

        const handleMouseMove = (e: MouseEvent) => {
            moveModalX(e.clientX);
            moveModalY(e.clientY);

            moveCursorX(e.clientX);
            moveCursorY(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const handleMouseEnter = (index: number) => {
        setActiveProject(index);

        gsap.to(modalRef.current, {
            opacity: 1,
            scale: 1,
            autoAlpha: 1,
            duration: 0.35,
            ease: "power3.out",
        });

        gsap.to(cursorRef.current, {
            opacity: 1,
            scale: 1,
            autoAlpha: 1,
            duration: 0.35,
            ease: "power3.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(modalRef.current, {
            opacity: 0,
            scale: 0.75,
            autoAlpha: 0,
            duration: 0.3,
            ease: "power3.inOut",
        });

        gsap.to(cursorRef.current, {
            opacity: 0,
            scale: 0.75,
            autoAlpha: 0,
            duration: 0.3,
            ease: "power3.inOut",
        });
    };

    return (
        <section
            className="relative w-full max-w-6xl mx-auto text-white min-h-screen"
        >
            <div className="border-t border-white/10"
                onMouseLeave={handleMouseLeave}
            >
                {projects.map((project, index) => (
                    <div
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)}
                        className="group flex items-center justify-between border-b border-white/10 px-8 py-12 cursor-pointer transition-colors duration-500 hover:bg-[#1a1a1c]"
                    >
                        <h2 className="text-6xl font-light tracking-tight transition-transform duration-500 group-hover:-translate-x-3">
                            {project.title}
                        </h2>

                        <div className="text-right transition-transform duration-500 group-hover:translate-x-3">
                            <p className="text-xl font-medium">
                                {project.category}
                            </p>

                            <p className="mt-1 font-mono text-sm text-gray-500">
                                {project.tech}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div
                ref={modalRef}
                className="fixed top-0 left-0 w-100 h-75 overflow-hidden rounded-2xl pointer-events-none z-40 scale-75 opacity-0 -translate-x-1/2 -translate-y-1/2 shadow-2xl"
            >
                <div
                    className="w-full h-full transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateY(-${activeProject * 100}%)`,
                    }}
                >
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="w-full h-75 shrink-0 flex items-center justify-center text-3xl font-bold text-black"
                            style={{
                                backgroundColor: project.color,
                            }}
                        >
                            {project.title} Preview
                        </div>
                    ))}
                </div>
            </div>

            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-20 h-20 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center pointer-events-none z-50 scale-75 opacity-0 -translate-x-1/2 -translate-y-1/2 shadow-xl"
            >
                View
            </div>
        </section>
    );
}