"use client";

// Cover + detail modal. The card is a clean, fixed-size "cover" (title, tagline, hook,
// tech, actions). Clicking it opens a spacious modal — rendered through a PORTAL to
// document.body so it escapes the GSAP-transformed gallery and truly covers the viewport
// — where the architecture diagram finally has room to be big and readable.

import { useState, useEffect, useRef, useCallback, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import ProjectSchematic, { type Diagram } from "./ProjectSchematic";
import { getLenis } from "@/lib/lenis";

export interface Project {
    id: string;
    title: string;
    tagline: string;
    hook?: string;
    desc: string;
    tech: string[];
    link: string;
    accent: string;
    diagram?: Diagram;
}

const GRID_BG: CSSProperties = {
    backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1px)",
    backgroundSize: "18px 18px",
};

function TechChips({ tech }: { tech: string[] }) {
    return (
        <div className="flex flex-wrap gap-1.5 md:gap-2">
            {tech.map((t) => (
                <span key={t} className="font-mono text-[10px] md:text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded text-gray-300">
                    {t}
                </span>
            ))}
        </div>
    );
}

function RepoLink({ href, accent }: { href: string; accent: string }) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-target group/cta inline-flex h-11 md:h-12 px-6 md:px-7 rounded-full items-center justify-center gap-2 text-[11px] md:text-xs font-mono font-bold tracking-wider transition-all duration-300 border hover:bg-brand/10 shrink-0"
            style={{ color: accent, borderColor: "color-mix(in srgb, var(--color-brand) 28%, transparent)" }}
        >
            INSPECT_REPO
            <span className="transition-transform duration-300 group-hover/cta:translate-x-1">↗</span>
        </Link>
    );
}

export default function ProjectCard({ project }: { project: Project }) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const closeBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => setMounted(true), []);

    const close = useCallback(() => setOpen(false), []);

    // While open: pause Lenis (it hijacks the wheel, so body overflow alone won't stop
    // the page), lock body scroll, close on Escape, and move focus to the close button.
    useEffect(() => {
        if (!open) return;
        const lenis = getLenis();
        lenis?.stop();
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
        document.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeBtnRef.current?.focus();
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
            lenis?.start();
        };
    }, [open, close]);

    return (
        <section className="project-panel w-full md:w-screen md:h-screen flex items-center justify-center px-4 sm:px-5 md:px-24 py-8 shrink-0 perspective-[1000px] select-none">
            {/* COVER CARD */}
            <div
                className="panel-content group relative overflow-hidden w-full max-w-5xl h-auto md:h-[62vh] md:min-h-[460px] md:max-h-[600px] bg-[#151519] border border-white/8 hover:border-white/20 rounded-2xl md:rounded-3xl shadow-2xl backdrop-blur-sm transform-3d flex flex-col cursor-pointer transition-colors duration-300"
                onClick={() => setOpen(true)}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`${project.title} — view details`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(true); } }}
            >
                {/* Giant ghost index — visual texture */}
                <span className="pointer-events-none absolute -bottom-14 md:-bottom-24 right-2 md:right-6 font-black text-white/[0.03] text-[11rem] md:text-[20rem] leading-none select-none">
                    {project.id}
                </span>

                {/* Header */}
                <div className="relative flex items-center justify-between gap-3 px-5 sm:px-6 md:px-10 py-4 md:py-5 border-b border-white/8 shrink-0">
                    <div className="flex items-center gap-3 md:gap-4 min-w-0">
                        <span className="font-mono text-sm text-gray-500 shrink-0">[{project.id}]</span>
                        <span className="font-mono text-[10px] sm:text-xs tracking-widest uppercase truncate" style={{ color: project.accent }}>
                            {"// "}{project.tagline}
                        </span>
                    </div>
                    <span className="hidden sm:block font-mono text-[10px] sm:text-xs text-gray-600 tracking-tighter shrink-0">
                        STATUS: PRODUCTION_READY
                    </span>
                </div>

                {/* Body — title + hook, vertically centered */}
                <div className="relative flex-1 min-h-0 flex flex-col justify-center gap-4 md:gap-5 px-6 sm:px-8 md:px-10 py-8">
                    <h3 className="text-[clamp(2.25rem,11vw,4rem)] md:text-[clamp(3rem,5vw,5rem)] font-black tracking-tighter text-white uppercase leading-[0.88] break-words">
                        {project.title}
                    </h3>
                    {project.hook && (
                        <p className="max-w-xl text-[0.95rem] md:text-lg text-white/55 font-light leading-relaxed">
                            {project.hook}
                        </p>
                    )}
                </div>

                {/* Footer — tech + actions */}
                <div className="relative border-t border-white/8 px-6 sm:px-8 md:px-10 py-5 md:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
                    <TechChips tech={project.tech} />
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setOpen(true); }}
                            className="inline-flex h-11 md:h-12 px-6 md:px-7 rounded-full items-center justify-center gap-2 text-[11px] md:text-xs font-mono font-bold tracking-wider text-black bg-brand hover:bg-brand/90 transition-colors duration-300"
                        >
                            VIEW ARCHITECTURE
                            <span aria-hidden="true">→</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* DETAIL MODAL (portaled to body) */}
            {mounted && createPortal(
                <AnimatePresence>
                    {open && (
                        <motion.div
                            data-lenis-prevent
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={close}
                        >
                            <motion.div
                                role="dialog"
                                aria-modal="true"
                                aria-label={`${project.title} details`}
                                className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto scrollbar-ide bg-[#151519] border border-white/12 rounded-2xl md:rounded-3xl shadow-2xl"
                                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Sticky header */}
                                <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 md:px-9 py-5 border-b border-white/10 bg-[#151519]/95 backdrop-blur">
                                    <div className="min-w-0">
                                        <div className="font-mono text-[10px] md:text-xs tracking-widest uppercase mb-1" style={{ color: project.accent }}>
                                            {"// "}{project.tagline}
                                        </div>
                                        <h3 className="text-2xl md:text-4xl font-black tracking-tighter text-white uppercase leading-none break-words">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <button
                                        ref={closeBtnRef}
                                        type="button"
                                        onClick={close}
                                        aria-label="Close details"
                                        className="shrink-0 grid place-items-center h-9 w-9 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-colors font-mono"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-9 flex flex-col gap-7 md:gap-8">
                                    {/* Architecture blueprint — now with real room */}
                                    {project.diagram && (
                                        <div className="rounded-xl border border-white/10 overflow-hidden" style={GRID_BG}>
                                            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8 bg-[#151519]/70">
                                                <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-white/35 uppercase">
                                                    {"// ARCHITECTURE"}
                                                </span>
                                                <span className="font-mono text-[9px] md:text-[10px] tracking-widest text-brand/50 uppercase">
                                                    {project.diagram.kind}
                                                </span>
                                            </div>
                                            <div className="px-4 py-8 sm:px-8 md:px-12 md:py-10">
                                                <ProjectSchematic diagram={project.diagram} />
                                            </div>
                                        </div>
                                    )}

                                    {/* Full description */}
                                    <p className="text-[0.95rem] md:text-lg text-gray-300/90 font-light leading-relaxed max-w-3xl">
                                        {project.desc}
                                    </p>

                                    {/* Tech + repo */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-t border-white/8 pt-6">
                                        <TechChips tech={project.tech} />
                                        <RepoLink href={project.link} accent={project.accent} />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
}
