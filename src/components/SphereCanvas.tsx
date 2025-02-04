'use client';

import React, { useRef, useEffect, useMemo, useState } from 'react';

interface Position {
    x: number;
    y: number;
    z: number;
}

interface WindowSize {
    width: number;
    height: number;
}

class Particle {
    x: number;
    y: number;
    z: number;
    baseSize: number;
    img: HTMLImageElement;

    constructor(x: number, y: number, z: number, img: HTMLImageElement) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.baseSize = 0;
        this.img = img;
    }

    update(rotateX: number, rotateY: number) {
        const cosY = Math.cos(rotateY);
        const sinY = Math.sin(rotateY);
        const cosX = Math.cos(rotateX);
        const sinX = Math.sin(rotateX);

        const x1 = this.x * cosY - this.z * sinY;
        const z1 = this.z * cosY + this.x * sinY;
        const y1 = this.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + this.y * sinX;

        this.x = x1;
        this.y = y1;
        this.z = z2;
    }

    draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number): Position {
        this.baseSize = canvasWidth < 768 ? 25 : 37.5;
        const perspective = canvasWidth / (canvasWidth + this.z);
        const x2D = (this.x * perspective) + canvasWidth / 2;
        const y2D = (this.y * perspective) + canvasHeight / 2;
        const scale = perspective * 1.5;
        const size = this.baseSize * scale;

        ctx.globalAlpha = Math.min(1, (this.z + 300) / 400);
        ctx.drawImage(this.img, x2D - size / 2, y2D - size / 2, size, size);
        ctx.globalAlpha = 1;

        return { x: x2D, y: y2D, z: this.z };
    }
}

const SphereCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const requestRef = useRef<number | null>(null);
    const previousTimeRef = useRef<number>(0);
    const angleRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(true);
    const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
    const [windowSize, setWindowSize] = useState<WindowSize>({ width: 0, height: 0 });

    const images = useMemo(() => [
        '/techimgs/TailwindCSS.svg', '/techimgs/Spring.svg', '/techimgs/CPP.svg',
        '/techimgs/ThreeJS.webp', '/techimgs/Javascript.svg', '/techimgs/Figma.svg',
        '/techimgs/React.webp', '/techimgs/CSS3.svg', '/techimgs/Vitejs.webp',
        '/techimgs/HTML5.svg', '/techimgs/Java.svg', '/techimgs/GSAP.png',
        '/techimgs/Github.svg', '/techimgs/MongoDB.svg', '/techimgs/C.svg',
        '/techimgs/Bootstrap.svg', '/techimgs/nextjs.svg', '/techimgs/Git.svg'
    ], []);

    useEffect(() => {
        const loadImages = async () => {
            try {
                const imagePromises = images.map(src =>
                    new Promise<HTMLImageElement>((resolve) => {
                        const img = new Image();
                        img.src = src;
                        img.onload = () => resolve(img);
                        img.onerror = () => resolve(new Image()); // Fallback for failed images
                    })
                );

                const imagesLoaded = await Promise.all(imagePromises);
                setLoadedImages(imagesLoaded.filter(img => img.src));
            } catch (error) {
                console.error('Error loading images:', error);
            }
        };

        loadImages();
    }, [images]);

    useEffect(() => {
        if (!containerRef.current) return;

        const updateSize = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setWindowSize({ width: rect.width, height: rect.height });
            }
        };

        updateSize();
        const resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(containerRef.current);

        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        if (!canvasRef.current || loadedImages.length === 0 || windowSize.width === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const radius = windowSize.width < 768 ? 150 : 215;
        const phi = Math.PI * (3 - Math.sqrt(5));

        // Initialize particles
        particlesRef.current = loadedImages.map((img, i) => {
            const y = 1 - (i / (images.length - 1)) * 2;
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = phi * i;
            return new Particle(
                Math.cos(theta) * radiusAtY * radius,
                y * radius,
                Math.sin(theta) * radiusAtY * radius,
                img
            );
        });

        // Connection logic
        const drawConnections = (positions: Position[]) => {
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            if (!tempCtx) return tempCanvas;

            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            tempCtx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            tempCtx.lineWidth = 0.75;

            const threshold = Math.min(canvas.width, canvas.height) * 0.4;
            const thresholdSq = threshold ** 2;

            tempCtx.beginPath();
            for (let i = 0; i < positions.length; i++) {
                for (let j = i + 1; j < positions.length; j++) {
                    const dx = positions[i].x - positions[j].x;
                    const dy = positions[i].y - positions[j].y;
                    if (dx * dx + dy * dy < thresholdSq) {
                        tempCtx.moveTo(positions[i].x, positions[i].y);
                        tempCtx.lineTo(positions[j].x, positions[j].y);
                    }
                }
            }
            tempCtx.stroke();
            return tempCanvas;
        };

        // Animation loop
        // Inside the animate function (updated deltaTime and added auto-rotation)
        const animate = (time: number) => {
            if (!isVisible) return;

            const deltaTime = time - previousTimeRef.current;
            previousTimeRef.current = time; // Correct deltaTime calculation

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Apply smooth rotation damping
            angleRef.current.x *= 0.92;
            angleRef.current.y *= 0.92;

            // Add continuous auto-rotation (0.008 and 0.01 radians per second)
            const autoRotationX = 0.008 * (deltaTime / 1000);
            const autoRotationY = 0.01 * (deltaTime / 1000);
            angleRef.current.x += autoRotationX;
            angleRef.current.y += autoRotationY;

            const positions = particlesRef.current.map(particle => {
                particle.update(angleRef.current.x, angleRef.current.y);
                return particle.draw(ctx, canvas.width, canvas.height);
            });

            // Draw connections
            ctx.drawImage(drawConnections(positions), 0, 0);

            requestRef.current = requestAnimationFrame(animate);
        };

        // Input handling
        const handleMove = (e: MouseEvent | Touch) => {
            if (!canvasRef.current) return;
            const rect = canvasRef.current.getBoundingClientRect();
            const sensitivity = 0.00001;

            angleRef.current.x += ((e.clientY - rect.top) / rect.height - 0.5) * sensitivity * rect.height;
            angleRef.current.y += ((e.clientX - rect.left) / rect.width - 0.5) * sensitivity * rect.width;
        };

        canvas.addEventListener('mousemove', handleMove);
        canvas.addEventListener('touchmove', (e) => handleMove(e.touches[0]));

        // Start animation
        requestRef.current = requestAnimationFrame(animate);

        // Visibility observer
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { rootMargin: '100px', threshold: 0.1 }
        );
        observer.observe(canvas);

        return () => {
            canvas.removeEventListener('mousemove', handleMove);
            canvas.removeEventListener('touchmove', (e) => handleMove(e.touches[0]));
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            observer.disconnect();
        };
    }, [loadedImages, windowSize, isVisible, images.length]);

    return (
        <div ref={containerRef} className="w-full h-full">
            <canvas
                ref={canvasRef}
                width={windowSize.width}
                height={windowSize.height}
                className="mx-auto touch-none"
            />
        </div>
    );
};

export default SphereCanvas;