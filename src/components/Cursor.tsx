'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Cursor = () => {
    const cursorFollowerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const isMobileDevice = window.innerWidth <= 768;
            setIsMobile(isMobileDevice);
        };

        checkMobile();

        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    useEffect(() => {
        const followerElement = cursorFollowerRef.current;

        if (!followerElement) {
            console.warn('Follower element is not defined.');
            return; // Prevent further execution if refs are not assigned
        }

        const moveCursor = (e: { clientX: number; clientY: number; }) => {
            gsap.to(followerElement, {
                opacity: 1,
                duration: 0.5,
                x: e.clientX - 10,
                y: e.clientY - 10,
                ease: 'circ.out',
            });
        };

        if (!isMobile) {
            window.addEventListener('mousemove', moveCursor);

            return () => {
                window.removeEventListener('mousemove', moveCursor);
            };
        }
    }, [isMobile]);

    useEffect(() => {
        const cursorHovers = document.querySelectorAll('.cursor-hover');

        cursorHovers.forEach((cursorHover) => {
            cursorHover.addEventListener('mouseover', () => {
                if (!isMobile) {
                    gsap.to(cursorFollowerRef.current, {
                        scale: 3,
                        duration: 0.3,
                    });
                }
            });

            cursorHover.addEventListener('mouseleave', () => {
                if (!isMobile) {
                    gsap.to(cursorFollowerRef.current, {
                        scale: 1,
                        duration: 0.3,
                    });
                }
            });
        });

        return () => {
            cursorHovers.forEach((cursorHover) => {
                cursorHover.removeEventListener('mouseover', () => { });
                cursorHover.removeEventListener('mouseleave', () => { });
            });
        };
    }, [isMobile]);

    return (
        <>
            {!isMobile && (
                <div
                    className="cursor-follower w-7 h-7 opacity-0 fixed top-0 left-0 pointer-events-none rounded-full z-[1000] mix-blend-difference bg-white"
                    ref={cursorFollowerRef}
                ></div>
            )}
        </>
    );
};

export default Cursor;
