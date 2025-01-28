'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Cursor = () => {
    const cursorFollowerRef = useRef(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

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
            return;
        }

        const resetInactivityTimer = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Only reset scale if not hovering
            if (!isHovering) {
                gsap.to(followerElement, {
                    scale: 1,
                    duration: 0.3,
                });
            }

            timeoutRef.current = setTimeout(() => {
                // Only scale to 0 if not hovering
                if (!isHovering) {
                    gsap.to(followerElement, {
                        scale: 0,
                        duration: 0.3,
                    });
                }
            }, 2000);
        };

        const moveCursor = (e: { clientX: number; clientY: number; }) => {
            gsap.to(followerElement, {
                opacity: 1,
                duration: 0.5,
                x: e.clientX - 10,
                y: e.clientY - 10,
                ease: 'circ.out',
            });
            resetInactivityTimer();
        };

        if (!isMobile) {
            window.addEventListener('mousemove', moveCursor);

            return () => {
                window.removeEventListener('mousemove', moveCursor);
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            };
        }
    }, [isMobile, isHovering]);

    useEffect(() => {
        const cursorHovers = document.querySelectorAll('.cursor-hover');

        const handleMouseOver = () => {
            if (!isMobile) {
                setIsHovering(true);
                gsap.to(cursorFollowerRef.current, {
                    scale: 3,
                    duration: 0.3,
                });
            }
        };

        const handleMouseLeave = () => {
            if (!isMobile) {
                setIsHovering(false);
                gsap.to(cursorFollowerRef.current, {
                    scale: 1,
                    duration: 0.3,
                });
            }
        };

        cursorHovers.forEach((cursorHover) => {
            cursorHover.addEventListener('mouseover', handleMouseOver);
            cursorHover.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            cursorHovers.forEach((cursorHover) => {
                cursorHover.removeEventListener('mouseover', handleMouseOver);
                cursorHover.removeEventListener('mouseleave', handleMouseLeave);
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