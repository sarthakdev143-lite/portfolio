"use client";

// A project card that SIZES TO ITS CONTENT (auto-height) — so it can never overflow,
// scroll internally, or collide, at any viewport. Single column: title + hook, then a
// full-width architecture blueprint (horizontal on desktop, stacked on mobile), then
// tech + repo link. Centered inside the pinned panel on desktop.

import Link from "next/link";
import ProjectSchematic, { type Diagram } from "./ProjectSchematic";

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

// Faint blueprint grid behind the diagram — technical texture.
const GRID_BG: React.CSSProperties = {
    backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1px)",
    backgroundSize: "18px 18px",
};

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <section className="project-panel w-full md:w-screen md:h-screen flex items-center justify-center px-4 sm:px-5 md:px-24 py-8 shrink-0 perspective-[1000px] select-none">
            <div className="panel-content relative w-full max-w-5xl bg-[#151519] border border-white/8 rounded-2xl md:rounded-3xl shadow-2xl backdrop-blur-sm transform-3d flex flex-col overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between gap-3 px-5 sm:px-6 md:px-10 py-4 md:py-5 border-b border-white/8">
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

                {/* Body */}
                <div className="flex flex-col gap-6 md:gap-8 p-6 sm:p-8 md:p-10">
                    {/* Title + hook */}
                    <div>
                        <h3 className="text-[clamp(2rem,9vw,3.5rem)] md:text-[clamp(2.5rem,4vw,4rem)] font-black tracking-tighter text-white uppercase leading-[0.9] break-words">
                            {project.title}
                        </h3>
                        {project.hook && (
                            <p className="mt-3 md:mt-4 max-w-2xl text-[0.95rem] md:text-lg text-white/55 font-light leading-relaxed">
                                {project.hook}
                            </p>
                        )}
                    </div>

                    {/* Architecture blueprint — full width, reflows across breakpoints */}
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
                            <div className="px-4 py-6 sm:px-6 md:px-8 md:py-8">
                                <ProjectSchematic diagram={project.diagram} />
                            </div>
                        </div>
                    )}

                    {/* Tech + repo link */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pt-1">
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                            {project.tech.map((t) => (
                                <span key={t} className="font-mono text-[10px] md:text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded text-gray-300">
                                    {t}
                                </span>
                            ))}
                        </div>
                        <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="magnetic-target group/cta inline-flex h-11 md:h-12 px-6 md:px-7 rounded-full items-center justify-center gap-2 text-[11px] md:text-xs font-mono font-bold tracking-wider transition-all duration-300 border hover:bg-brand/10 shrink-0"
                            style={{ color: project.accent, borderColor: "color-mix(in srgb, var(--color-brand) 28%, transparent)" }}
                        >
                            INSPECT_REPO
                            <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
