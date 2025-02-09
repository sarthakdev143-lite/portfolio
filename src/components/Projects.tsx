'use client'

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import StylishHeading from '@/components/StylishHeading';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ScratchCardProps {
    videoSrc: string;
    textureSrc: string;
}

interface Project {
    name: string;
    media: string;
    tags: string[];
    description: string;
    link: string;
}

const ScratchCard: React.FC<ScratchCardProps> = ({ videoSrc, textureSrc }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isRevealed, setIsRevealed] = useState<boolean>(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        let isDrawing = false;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const img = new Image();
        img.src = textureSrc;
        img.onload = () => {
            const pattern = ctx.createPattern(img, 'repeat');
            if (!pattern) return;

            ctx.fillStyle = pattern;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#fff';
            ctx.font = 'bold 30px "Comic Sans MS", cursive, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
            ctx.shadowBlur = 15;
            ctx.fillText('Scratch Me', canvas.width / 2, canvas.height / 2);
            ctx.shadowBlur = 0;
        };

        const scratch = (x: number, y: number): void => {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fill();
        };

        const checkReveal = (): void => {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let scratchedPixels = 0;
            for (let i = 0; i < imageData.data.length; i += 4) {
                if (imageData.data[i + 3] === 0) scratchedPixels++;
            }
            if (scratchedPixels / (canvas.width * canvas.height) > 0.45) {
                setIsRevealed(true);
                videoRef.current?.play();
            }
        };

        const handleMouseMove = (e: MouseEvent): void => {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            scratch(x, y);
            checkReveal();
        };

        const handleMouseDown = (): void => { isDrawing = true; };
        const handleMouseUp = (): void => { isDrawing = false; };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mousemove', handleMouseMove);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mousemove', handleMouseMove);
        };
    }, [textureSrc]);

    return (
        <figure className="relative cursor-crosshair p-2 border-2 border-[#333] outline outline-2 outline-[#888] rounded-lg min-h-[17rem] shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-2xl group">
            <video
                ref={videoRef}
                src={videoSrc}
                loop
                playsInline
                className="rounded-lg shadow-lg absolute top-0 left-0 w-full h-full"
            />
            <canvas
                ref={canvasRef}
                className={`absolute top-0 left-0 w-full h-full z-10 transition-all duration-1000 ease-out rounded-lg ${isRevealed ? 'opacity-0' : 'opacity-100'
                    }`}
            />
        </figure>
    );
};

const Projects: React.FC = () => {
    const projectsRef = useRef<HTMLElement | null>(null);
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

    const projects: Project[] = [
        {
            name: 'Orizon Onestrong Clone',
            media: '/media/orizon.webm',
            tags: ['react', 'css'],
            description: 'This Project is The Clone Of <a class="italic text-gray-400" href="https://orizon.1onestrong.com/" target="_blank" rel="noopener noreferrer">orizon.1onestrong.com</a>.',
            link: 'https://sarthakdev-orizon.netlify.app/'
        },
        {
            name: 'Window 10',
            media: '/media/window10.webm',
            tags: ['html', 'css', 'javascript'],
            description: 'A try to mimic the UI of Window 10 with some of its functionalities like "start menu" & "notification menu".',
            link: 'https://sarthakdev143.github.io/Window-10-Webpage/'
        }
    ];

    useGSAP(() => {
        const ctx = gsap.context(() => {
            projectRefs.current.forEach((project, index) => {
                if (!project) return;

                gsap.from(project, {
                    scale: 0.9,
                    opacity: 0,
                    duration: 2,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: project,
                        start: 'top bottom-=50',
                        toggleActions: 'play none none reverse'
                    }
                });

                gsap.from(project.querySelectorAll('h1, p, .tags'), {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.3,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: project,
                        start: 'top bottom-=250',
                        toggleActions: 'play none none reverse',
                    }
                });
            });

            gsap.from('.view-all', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: '.projects-wrapper',
                    start: 'bottom bottom-=50',
                    toggleActions: 'play none none reverse',
                }
            });

            projectRefs.current.forEach((project) => {
                if (!project) return;

                gsap.to(project, {
                    yPercent: -25,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: project,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                });
            });

        }, projectsRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" ref={projectsRef} className="flex flex-col gap-52 mt-20">
            <StylishHeading source={'projects'} />
            <div className="flex flex-wrap gap-20 text-white max-w-[100rem] mx-auto">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="perspective-1000 w-[30rem] mx-auto flex flex-col gap-4"
                        ref={el => { projectRefs.current[index] = el }}
                    >
                        <ScratchCard videoSrc={project.media} textureSrc="/media/texture.avif" />
                        <figcaption className="text-center flex flex-col gap-3">
                            <h1 className="text-[1.4rem] text-[#f0f0f0] uppercase tracking-wider">
                                {project.name}
                            </h1>
                            <p className="text-[#ccc]" dangerouslySetInnerHTML={{ __html: project.description }}></p>
                            <div className="flex justify-center gap-2">
                                {project.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-[#444] text-white px-3 py-1.5 rounded-lg text-sm uppercase tracking-wider shadow-md"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </figcaption>
                    </div>
                ))}
            </div>
            <a
                href="https://github.com/sarthakDev143-lite?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit mx-auto text-white overflow-hidden relative shadow-xl bg-[#333] rounded-full flex items-center justify-center cursor-pointer gap-3 font-bold border-[3px] border-[#ffffff4d] text-lg px-10 py-3 transition-all duration-300 hover:scale-105 hover:border-[#fff9] -mt-52 group"
            >
                View All
                <i className="icon ri-corner-down-right-line transform translate-y-0.5 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1"></i>
            </a>
        </section>
    );
};

export default Projects;