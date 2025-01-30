'use client'

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const styles = `
@keyframes wave {
    0%, 60%, 100% { transform: rotate(0deg); }
    10%, 30% { transform: rotate(14deg); }
    20% { transform: rotate(-8deg); }
    40% { transform: rotate(-4deg); }
    50% { transform: rotate(10deg); }
}
.wave-emoji {
    display: inline-block;
    transform-origin: 70% 70%;
    animation: wave 1.2s infinite ease;
}
`;

gsap.registerPlugin(ScrollTrigger);

interface Message {
    type: 'sent' | 'received';
    text: string;
    emoji?: string;
    id?: number;
    showDp?: boolean;
}

const About = () => {
    const triggerRef = useRef<HTMLElement>(null);
    const [activeHearts, setActiveHearts] = useState<Set<number>>(new Set());

    const messages: Message[] = [
        { type: 'sent', text: 'Heyy.. ', emoji: '👋', showDp: true },
        { type: 'received', text: 'Hi.. ', emoji: '👋', id: 1 },
        { type: 'received', text: 'this is Sarthak Parulekar.', id: 2 },
        { type: 'received', text: 'a certified full stack developer.', id: 3, showDp: true }
    ];

    useEffect(() => {
        if (!triggerRef.current) return;

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef.current,
                start: 'top 70%',
            },
        });

        const animations = [
            {
                selector: '.sent.message',
                from: { opacity: 0, y: 40 },
                to: { opacity: 1, y: 0, duration: 2, ease: 'easeInOut' }
            },
            {
                selector: '.seen',
                from: { opacity: 0 },
                to: { opacity: 1, duration: 0.3 },
                position: '-=0.2'
            },
            {
                selector: '.received.message',
                from: { opacity: 0, y: 40 },
                to: { opacity: 1, y: 0, duration: 1, ease: 'easeInOut', stagger: 2 }
            }
        ];

        animations.forEach(({ selector, from, to, position }) => {
            timeline.fromTo(selector, from, to, position);
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            ScrollTrigger.clearScrollMemory();
        };
    }, []);

    const handleDoubleClick = (id: number) => {
        setActiveHearts(prev => {
            const newHearts = new Set(prev);
            newHearts.has(id) ? newHearts.delete(id) : newHearts.add(id);
            return newHearts;
        });
    };

    const renderMessage = ({ type, text, emoji, id, showDp }: Message) => (
        <div className={`${type} message w-full sm:w-auto flex min-h-[3.5rem] gap-2 sm:gap-4 items-center text-lg sm:text-xl lg:text-2xl font-medium ${type === 'sent' ? 'justify-end' : 'justify-start'}`}>
            {type === 'sent' && (
                <>
                    <div className="text w-fit bg-gray-200 p-2 px-3 sm:px-4 rounded-2xl relative text-black">
                        {text}
                        {emoji && <span className="wave-emoji min-h-0">{emoji}</span>}
                    </div>
                    {showDp && (
                        <Image
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden"
                            src="/media/dp.jpg"
                            alt="Profile"
                            width={64}
                            height={64}
                            priority
                        />
                    )}
                    <p className="seen w-fit absolute right-2 top-full text-gray-500 text-sm sm:text-base">
                        Seen just now
                    </p>
                </>
            )}
            {type === 'received' && (
                <>
                    {showDp && (
                        <Image
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden"
                            src="/media/dp.jpg"
                            alt="Profile"
                            width={64}
                            height={64}
                            priority
                        />
                    )}
                    <div
                        className="text w-fit bg-gray-200 p-2 px-3 sm:px-4 rounded-2xl relative text-black capitalize group"
                        onDoubleClick={() => id !== undefined && handleDoubleClick(id)}
                        title="Double Click To Heart"
                    >
                        {text}
                        {emoji && <span className="wave-emoji min-h-0">{emoji}</span>}
                        <span className="
                            hidden sm:block
                            dbc-to-💖 
                            text-gray-500 
                            text-base sm:text-lg 
                            italic 
                            opacity-0 
                            group-hover:opacity-100 
                            w-fit 
                            absolute 
                            left-[110%] 
                            whitespace-nowrap
                        ">
                            <i className="ri-information-line w-fit" />
                            Double Click To Heart..
                        </span>
                    </div>
                    <i
                        className={`
                            ri-heart-3-fill heart 
                            absolute 
                            text-pink-600 
                            -bottom-6 
                            left-20 sm:left-28 
                            w-fit 
                            transition-all 
                            duration-500 
                            ${!activeHearts.has(id ?? -1) ? 'scale-0' : 'scale-100'}
                        `}
                        id={`heart${id}`}
                    />
                </>
            )}
        </div>
    );

    return (
        <section id="about" className="w-full overflow-x-hidden">
            <style>{styles}</style>
            <div className="about w-full max-w-[97rem] h-fit mt-10 sm:mt-20 pb-24 sm:pb-36 relative left-1/2 -translate-x-1/2">
                <article
                    id="chatBlock"
                    ref={triggerRef}
                    className="w-full mx-auto h-fit px-4 sm:px-8 lg:px-20 gap-2 flex flex-col items-center relative"
                >
                    <div className="flex flex-col w-full gap-2">
                        {messages.map((message, index) => (
                            <div
                                key={message.id || index}
                                className={`
                                    w-full 
                                    flex 
                                    ${message.type === 'sent' ? 'justify-end' : 'justify-start'}
                                    ${message.type === 'received' && index !== messages.length - 1 ?
                                        'translate-x-8 sm:translate-x-20' : ''}
                                `}
                            >
                                {renderMessage(message)}
                            </div>
                        ))}
                    </div>
                </article>
            </div>
        </section>
    );
};

export default About;