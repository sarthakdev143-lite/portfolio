'use client'

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScratchCardProps {
    videoSrc: string;
    textureSrc: string;
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

        const setCanvasSize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const img = new Image();
        img.src = textureSrc;
        img.onload = () => {
            const pattern = ctx.createPattern(img, 'repeat');
            if (!pattern) return;

            ctx.fillStyle = pattern;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#fff';
            ctx.font = 'bold clamp(1rem, 5vw, 2rem) "Comic Sans MS", cursive, sans-serif';
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
                const video = videoRef.current;
                if (video) video.play();
            }
        };

        const getCoordinates = (event: MouseEvent | TouchEvent): { x: number, y: number } => {
            const rect = canvas.getBoundingClientRect();
            let x, y;
            if ('touches' in event) {
                x = event.touches[0].clientX - rect.left;
                y = event.touches[0].clientY - rect.top;
            } else {
                x = event.clientX - rect.left;
                y = event.clientY - rect.top;
            }
            return { x, y };
        };

        const handleMove = (event: MouseEvent | TouchEvent) => {
            event.stopPropagation();
            event.preventDefault();
            const { x, y } = getCoordinates(event);
            scratch(x, y);
            checkReveal();
        };

        canvas.addEventListener('mousemove', handleMove);
        canvas.addEventListener('touchmove', handleMove);

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            canvas.removeEventListener('mousemove', handleMove);
            canvas.removeEventListener('touchmove', handleMove);
        };
    }, [textureSrc]);

    return (
        <figure className={`relative ${isRevealed ? 'cursor-pointer' : 'cursor-crosshair'} p-2 border-2 border-[#333] outline outline-2 outline-[#888] rounded-lg min-h-[17rem] shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-2xl group`}>
            <video
                ref={videoRef}
                src={videoSrc}
                muted
                loop
                playsInline
                className="rounded-lg shadow-lg absolute top-0 left-0 w-full h-full"
            />
            <canvas
                ref={canvasRef}
                className={`absolute top-0 left-0 w-full h-full z-10 transition-all duration-1000 ease-out rounded-lg ${isRevealed ? 'opacity-0' : 'opacity-100'}`}
            />
        </figure>
    );
};

export default ScratchCard;
