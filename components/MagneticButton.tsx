"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
    children: React.ReactElement;
}

export default function MagneticButton({ children }: MagneticButtonProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Target both the outer element and its text/icon child independently
        const innerElement = container.querySelector(".magnetic-target") || container.firstElementChild;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = container.getBoundingClientRect();

            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const distanceX = clientX - centerX;
            const distanceY = clientY - centerY;

            // The outer container pulls towards the mouse with solid weight
            gsap.to(container, {
                x: distanceX * 0.45,
                y: distanceY * 0.45,
                duration: 0.8,
                ease: "power3.out",
            });

            // The inner element shifts less, creating a 3D depth effect (parallax)
            if (innerElement) {
                gsap.to(innerElement, {
                    x: distanceX * 0.15,
                    y: distanceY * 0.15,
                    duration: 1.5,
                    ease: "power3.out",
                });
            }
        };

        const handleMouseLeave = () => {
            // Snaps the container back with a crisp, fluid spring
            gsap.to(container, {
                x: 0,
                y: 0,
                duration: 1.8,
                ease: "elastic.out(1, 0.3)",
            });

            // Snaps the inner child back safely
            if (innerElement) {
                gsap.to(innerElement, {
                    x: 0,
                    y: 0,
                    duration: 2.8,
                    ease: "elastic.out(1, 0.3)",
                });
            }
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div ref={containerRef} className="inline-block transition-transform duration-100 cursor-pointer">
            {children}
        </div>
    );
}