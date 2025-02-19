'use client'

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import StylishHeading from '@/components/StylishHeading';
import ScratchCard from './ScratchCard';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    name: string;
    media: string;
    tags: string[];
    description: string;
    link: string;
    underDevelopment?: boolean;
}

const Projects: React.FC = () => {
    const projectsRef = useRef<HTMLElement | null>(null);
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

    const projects: Project[] = [
        { name: 'We Contractor', media: '/media/stand-by.mp4', tags: ['next.js', 'tailwindcss', 'jwt', 'springboot', 'mongodb', 'cloudinary', 'framer-motion'], description: 'A project that facilitates buying and selling of plots while providing features for managing contracts and transactions.', link: 'https://sarthakdev-contractor.vercel.app' },
        { name: 'Personal Diary', media: '/media/stand-by.mp4', tags: ['next.js', 'three.js', 'tailwindcss', 'jwt', 'springboot', 'mongodb', 'cloudinary', 'gsap'], description: 'A 3D digital diary website for users to express thoughts privately with encryption, customizable themes.', link: 'https://sarthakdev-diary.vercel.app', underDevelopment: true },
        { name: 'Banking Simplified', media: '/media/stand-by.mp4', tags: ['react', 'css', 'framer-motion', 'springboot', 'gsap', 'axios'], description: 'A website for users to perform transactions with ease and convenience', link: 'https://sarthakdev-banking.netlify.app' },
        { name: 'Orizon Onestrong Clone', media: '/media/orizon.webm', tags: ['react', 'css'], description: 'Clone Of <a class="italic text-gray-400" href="https://orizon.1onestrong.com/" target="_blank" rel="noopener noreferrer">orizon.1onestrong.com</a>.', link: 'https://sarthakdev-orizon.netlify.app' },
        { name: 'Window 10', media: '/media/window10.webm', tags: ['html', 'css', 'javascript'], description: 'A try to mimic the UI of Window 10 with some of its functionalities like "start menu" & "notification menu".', link: 'https://sarthakdev143.github.io/Window-10-Webpage' },
    ];

    useEffect(() => {
        // Initial reveal animation for projects
        projectRefs.current.forEach((project, index) => {
            if (project) {
                gsap.from(project, {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: project,
                        start: "top 110%",
                    },
                    delay: index * 0.2
                });
            }
        });

        // View All button animation
        const viewAllButton = document.querySelector('.view-all-button');
        if (viewAllButton) {
            gsap.from(viewAllButton, {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: viewAllButton,
                    start: "top 100%",
                }
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section id="projects" ref={projectsRef} className="flex flex-col gap-36 mt-40 lg:mt-60">
            <StylishHeading source={'projects'} />
            <div className="flex flex-wrap gap-20 text-white max-w-[100rem] mx-auto">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="perspective-1000 w-[30rem] md:w-[30rem] mx-auto flex flex-col gap-4 hover:transform-gpu"
                        ref={el => { projectRefs.current[index] = el }}
                    >
                        <Link href={project.link} target="_blank" rel="noopener noreferrer">
                            {project.underDevelopment ? <h2 className='uppercase text-sm text-[#f0f0f0] px-3 py-1.5 rounded-lg tracking-widest bg-[#444] w-fit'>Under Development</h2> : null}
                            <ScratchCard videoSrc={project.media} textureSrc="/media/texture.avif" />
                        </Link>
                        <figcaption className="text-center flex flex-col gap-3">
                            <h1 className="text-[1.4rem] text-[#f0f0f0] uppercase tracking-wider">
                                {project.name}
                            </h1>
                            <p className="text-[#ccc]" dangerouslySetInnerHTML={{ __html: project.description }}></p>
                            <div className="flex justify-center gap-2 flex-wrap">
                                {project.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="tag-animation bg-[#444] text-white px-3 py-1.5 rounded-lg text-sm uppercase tracking-wider shadow-md transition-transform duration-300"
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
                className="view-all-button w-fit mx-auto text-white overflow-hidden relative shadow-xl bg-[#333] rounded-full flex items-center justify-center cursor-pointer gap-3 font-bold border-[3px] border-[#ffffff4d] text-lg px-10 py-3 hover:border-[#fff9] -mt-12 group"
            >
                View All
                <i className="icon ri-corner-down-right-line transform translate-y-0.5 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1"></i>
            </a>
        </section>
    );
};

export default Projects;