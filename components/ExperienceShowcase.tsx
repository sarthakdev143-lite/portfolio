"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WorkExperience {
  role: string;
  company: string;
  location: string;
  period: string;
  techStack: string[];
  highlights: string[];
}

const EXPERIENCE_DATA: WorkExperience[] = [
  {
    role: "Full Stack Developer",
    company: "Augment Infotech Private Limited",
    location: "Indore",
    period: "April 2026 — Present",
    techStack: ["Next.js", "Spring Boot", "REST APIs", "Deployment Pipelines"],
    highlights: [
      "Developing and deploying production systems serving international and domestic clients.",
      "Debugging and optimizing AI-generated code.",
      "Mentoring and managing junior devs and interns while overseeing code reviews and Git workflows."
    ]
  },
  {
    role: "Frontend Developer Intern",
    company: "Ravwolf private limited",
    location: "Indore",
    period: "October 2025 — March 2026",
    techStack: ["Next.js", "Tailwind CSS", "API Integrations", "Git"],
    highlights: [
      "Built and maintained responsive UI components using Next.js and Tailwind CSS.",
      "Implemented API integrations, reusable components, and optimized page architectures.",
      "Collaborated with design and product teams to improve user experience and performance."
    ]
  },
  {
    role: "Head Boy | Student Leader",
    company: "Little Wonders Convent School",
    location: "Indore, Madhya Pradesh",
    period: "2025 — 2026",
    techStack: ["Leadership", "Event Coordination", "Peer Mentorship"],
    highlights: [
      "Elected by peers and faculty to represent the student body and lead key school initiatives.",
      "Led school assemblies and student councils, coordinating directly with teachers and administration.",
      "Organized student-led events and supported peer mentorship and conflict resolution."
    ]
  }
];

// --- Subcomponent: Premium Interactive Node ---
const ExperienceCard = ({ exp }: { exp: WorkExperience; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  // 1. Mouse Spotlight Tracking Frame Loop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  // 2. Local Node Entry Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        pinRef.current,
        { scale: 0, backgroundColor: "#0f0f11", borderColor: "#333" },
        { scale: 1, backgroundColor: "#ffffff", borderColor: "#ffffff", duration: 0.4, ease: "back.out(2.5)" }
      ).fromTo(
        contentRef.current,
        { opacity: 0, x: -30, filter: "blur(8px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="relative w-full group" onMouseMove={handleMouseMove}>
      {/* Node Junction Pin */}
      <div
        ref={pinRef}
        className="absolute -left-8 md:-left-16 top-4 w-3 h-3 md:w-4 md:h-4 rounded-full border-[3px] z-20 will-change-transform shadow-[0_0_15px_rgba(255,255,255,0.5)]"
      />

      {/* Main Content Layout */}
      <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start will-change-[transform,opacity,filter]">

        {/* Timestamp & Meta Panel */}
        <div className="lg:col-span-4 flex flex-col pt-3">
          <span className="text-xs font-mono text-white/40 font-bold tracking-[0.2em] uppercase mb-2">
            {exp.period}
          </span>
          <h4 className="text-xl font-bold font-mono text-white leading-tight uppercase tracking-tight">
            {exp.role}
          </h4>
          <span className="text-sm font-sans text-white/70 mt-1.5 font-medium">
            {exp.company}
          </span>
          <span className="text-xs font-mono text-white/30 tracking-wide mt-1">
            // {exp.location}
          </span>
        </div>

        {/* Spotlight Interactive Terminal Panel */}
        <div className="lg:col-span-8 relative overflow-hidden rounded-xl border border-white/5 bg-[#131316]/80 backdrop-blur-md transition-colors duration-500 group-hover:border-white/20">

          {/* Dynamic Spotlight Mask Layers */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)`
            }}
          />

          <div className="relative p-7 md:p-8">
            <ul className="space-y-4 mb-8">
              {exp.highlights.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start gap-4 text-[0.9rem] text-neutral-400 leading-relaxed font-sans group-hover:text-neutral-300 transition-colors duration-300">
                  <span className="text-white/20 font-mono text-xs mt-1 select-none">►</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Hardware Architecture Badges */}
            <div className="flex flex-wrap gap-2 pt-5 border-t border-white/4">
              {exp.techStack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[10px] font-mono px-2.5 py-1.5 rounded-md bg-white/3 text-white/60 uppercase tracking-widest border border-white/3 group-hover:bg-white/8 group-hover:border-white/10 group-hover:text-white/90 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Pipeline Parent ---
export default function ExperienceShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circuitLineRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggerBase = {
        trigger: containerRef.current,
        start: "top 40%",
        end: "bottom 80%",
        scrub: 0.5, // Added slight scrub delay for buttery smooth physics
      };

      // 1. Paint the wire down the screen
      gsap.fromTo(
        circuitLineRef.current,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: scrollTriggerBase }
      );

      // 2. Sync the glowing playhead to the end of the line
      gsap.fromTo(
        playheadRef.current,
        { top: "0%" },
        { top: "100%", ease: "none", scrollTrigger: scrollTriggerBase }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full max-w-6xl mx-auto px-6 py-40 bg-[#0f0f11]">
      {/* Header Module */}
      <div className="mb-32 flex flex-col items-start">
        <span className="text-xs font-mono text-white/40 uppercase tracking-[0.4em] mb-3">
          // CHRONOLOGICAL PIPELINE
        </span>
        <h3 className="text-5xl md:text-6xl font-bold font-mono text-white uppercase tracking-tighter">
          EXPERIENCE <span className="text-white/30">CIRCUITS</span>
        </h3>
      </div>

      <div className="relative pl-8 md:pl-16">
        {/* Background Inactive Track */}
        <div className="absolute left-1.25 md:left-1.75 top-4 bottom-0 w-0.5 bg-white/2" />

        {/* Active Draw Track */}
        <div className="absolute left-1.25 md:left-1.75 top-4 bottom-0 w-0.5 origin-top">
          <div
            ref={circuitLineRef}
            className="w-full h-full bg-linear-to-b from-white/80 via-white/40 to-transparent origin-top scale-y-0 will-change-transform"
          />

          {/* Glowing Playhead Orb */}
          <div
            ref={playheadRef}
            className="absolute -left-1 w-2.5 h-7.5 rounded-full bg-white blur-[2px] shadow-[0_0_20px_rgba(255,255,255,0.8)] will-change-transform"
            style={{ top: "0%" }}
          />
        </div>

        {/* Render Dynamic Nodes */}
        <div className="space-y-32">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <ExperienceCard key={idx} exp={exp} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}