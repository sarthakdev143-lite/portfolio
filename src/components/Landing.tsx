'use client'

import React, { useRef, useState, useCallback, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import LoadingScreen from './LoadingScreen';

gsap.registerPlugin(ScrollTrigger);

interface MyCanvasProps {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

const MyCanvas: React.FC<MyCanvasProps> = ({ canvasRef }) => {
    return (
        <div id="parent" className="w-full min-h-[600vh] relative -mt-20">
            <figure className="w-full h-screen sticky top-0 rounded-[0.5rem]">
                <canvas ref={canvasRef} className="w-full h-screen" />
            </figure>
        </div>
    );
};

interface LandingProps {
    infinite?: boolean;
}

const Landing: React.FC<LandingProps> = ({ infinite = false }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [, setImages] = useState<HTMLImageElement[]>([]);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const lenisRef = useRef<any>(null);
    const frames = useRef({ currentIndex: 0, maxIndex: 257 });

    const loadImages = useCallback((index: number, imgs: HTMLImageElement[]) => {
        if (index < 0 || index >= frames.current.maxIndex) return;
        const img = imgs[index];
        if (!img) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;
        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        frames.current.currentIndex = index;
    }, []);

    const startAnimation = useCallback((imgs: HTMLImageElement[]) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#parent",
                start: "top top",
                end: "bottom bottom",
                scrub: 2,
            },
        });

        tl.to(frames.current, {
            currentIndex: frames.current.maxIndex,
            onUpdate: () => {
                loadImages(Math.floor(frames.current.currentIndex), imgs);
            },
        });
    }, [loadImages]);

    const preloadImgs = useCallback(async () => {
        const promises: Promise<HTMLImageElement>[] = [];
        for (let i = 1; i <= frames.current.maxIndex; i++) {
            const imgUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpeg`;
            const img = new Image();
            img.src = imgUrl;
            promises.push(new Promise((resolve) => {
                img.onload = () => {
                    setLoadingProgress((_prev) => Math.min(100, (i / frames.current.maxIndex) * 100));
                    resolve(img);
                };
            }));
        }

        const loadedImages = await Promise.all(promises);
        setImages(loadedImages);
        loadImages(frames.current.currentIndex, loadedImages);
        startAnimation(loadedImages);

        // Wait for a small delay before removing loading screen
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsLoading(false);

        // Initialize Lenis after loading
        if (!lenisRef.current) {
            lenisRef.current = new Lenis({
                duration: 3,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });

            const handleRaf = (time: number) => {
                lenisRef.current?.raf(time);
                requestAnimationFrame(handleRaf);
            };
            requestAnimationFrame(handleRaf);
        }
    }, [loadImages, startAnimation]);

    useLayoutEffect(() => {
        if (!canvasRef.current) return;

        preloadImgs();

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            if (lenisRef.current) {
                lenisRef.current.destroy();
            }
        };
    }, [preloadImgs]);

    useGSAP(() => {
        gsap.to('.nameScroll', {
            x: -250,
            ease: 'none',
            scrollTrigger: {
                trigger: '.nameScrollDiv',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });

        gsap.to('.intro-image figcaption', {
            opacity: 0,
            scrollTrigger: {
                trigger: '.intro-image',
                start: 'top 10%',
                end: 'top 5%',
                toggleActions: 'play none none reverse',
            }
        });
    }, []);

    return (
        <>
            <LoadingScreen
                isLoading={isLoading}
                progress={loadingProgress}
            />
            <section className='w-full h-fit flex flex-col items-center relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-b after:from-transparent after:via-transparent after:to-[#090A0C]'>
                <figcaption className='z-10 text-[clamp(2rem,_2vw,_3rem)] text-white'>&ldquo;Who&apos;s Shaping the Web?&rdquo;</figcaption>
                <MyCanvas canvasRef={canvasRef} />
            </section>
            {!infinite && (
                <div className="overflow-hidden">
                    <h1 className='text-white whitespace-nowrap flex ml-[-12%] font-[Caveat] font-thin text-[clamp(3rem,3.5vw,3.5vw)]'>
                        Sarthak Parulekar • Sarthak Parulekar • Sarthak Parulekar • Sarthak Parulekar • Sarthak Parulekar • Sarthak Parulekar
                    </h1>
                </div>
            )}
        </>
    );
}

export default Landing;