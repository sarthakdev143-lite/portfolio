'use client'

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

import { ReactNode } from 'react';

const LenisScroll = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 3.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div data-lenis-container>
            {children}
        </div>
    );
};

export default LenisScroll;