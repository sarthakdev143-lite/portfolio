import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StylishHeadingProps {
    source: 'projects' | 'skills';
}

const StylishHeading: React.FC<StylishHeadingProps> = ({ source }) => {
    const headingWrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const headingWrapper = headingWrapperRef.current;
        if (!headingWrapper) return;

        const beforeLetters = gsap.utils.toArray('.before span', headingWrapper) as HTMLElement[];
        const mainHeading = headingWrapper.querySelector('#catching-heading') as HTMLElement | null;
        const highlightedSpan = headingWrapper.querySelector('.stylish, .shine') as HTMLElement | null;

        // Ensure elements exist before applying animations
        if (beforeLetters.length === 0 || !mainHeading || !highlightedSpan) return;

        // Set initial states
        gsap.set(beforeLetters, { opacity: 0, scale: 0, rotation: -180 });
        gsap.set(mainHeading, { opacity: 1, y: 0 });
        gsap.set(highlightedSpan, { opacity: 1, scale: 1 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: headingWrapper,
                start: 'top 90%',
                end: 'top 30%',
                scrub: 1,
                toggleActions: 'play none none reverse',
            }
        });

        tl.to(beforeLetters, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: 'back.out(4)',
            stagger: {
                each: 0.1,
                from: 'random'
            }
        })
            .from(mainHeading, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            }, 0) // Start at the beginning of the timeline
            .from(highlightedSpan, {
                opacity: 0,
                scale: 0.5,
                duration: 1,
                ease: 'elastic.out(1, 0.3)',
            }, 0.3); // Start slightly after the main heading animation

    }, [source]);

    return (
        <div className={`heading-wrapper heading-wrapper-${source} flex items-center justify-center relative`} ref={headingWrapperRef}>
            {source === 'skills' && (
                <>
                    <h1 id='catching-heading' className='select-none text-stylish-subheading word-space-05 text-white z-0 font-[Raleway] font-[100]'>
                        Areas Where I <span className="shine tracking-[0.3rem] text-shadow-heading-shine text-amber-400 font-normal">&quot;Shine&quot;</span>.
                    </h1>
                    <h1 className="before absolute text-stylish-heading font-light top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#222] -z-10 transition-all duration-300 ease-in-out text-shadow-glow">
                        {'SHINE'.split('').map((letter, index) => (
                            <span key={index}>{letter}</span>
                        ))}
                    </h1>
                </>
            )}

            {source === 'projects' && (
                <>
                    <h1 id='catching-heading' className='select-none text-stylish-subheading word-space-05 text-white z-0 font-[Raleway] font-[100]'>
                        Some <span className='stylish tracking-[0.3rem] text-[rgb(255,0,128)] font-normal text-shadow-heading-stylish'>&quot;flawless&quot;</span> Creations.
                    </h1>
                    <h1 className="before absolute text-stylish-heading font-light top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#222] -z-10 transition-all duration-300 ease-in-out text-shadow-glow">
                        {'FLAWLESS'.split('').map((letter, index) => (
                            <span key={index}>{letter}</span>
                        ))}
                    </h1>
                </>
            )}
        </div>
    );
};

export default StylishHeading;
