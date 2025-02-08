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

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface Message {
    type: 'sent' | 'received';
    text: string;
    emoji?: string;
    id?: number;
}

const About = () => {
    const triggerRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [activeHearts, setActiveHearts] = useState<Set<number>>(new Set());
    const [activeMessageIndex, setActiveMessageIndex] = useState(-1);

    const messages: Message[] = [
        { type: 'sent', text: 'Heyy.. ', emoji: '👋' },
        { type: 'received', text: 'Hi.. ', emoji: '👋', id: 1 },
        { type: 'received', text: `I'm Sarthak Parulekar`, id: 2 },
        { type: 'received', text: 'A 16y/o Full Stack Developer.', id: 3 }
    ];

    useEffect(() => {
        if (!triggerRef.current) return;

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef.current,
                start: 'top 70%',
            },
        });

        // Animate sent message
        timeline.fromTo('.sent.message',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
        );

        // Animate seen text
        timeline.fromTo('.seen',
            { opacity: 0 },
            { opacity: 1, duration: 0.3 },
            '-=0.2'
        );

        // Animate received messages with staggered timing
        const receivedMessages = document.querySelectorAll('.received.message');
        receivedMessages.forEach((message, index) => {
            timeline.fromTo(message,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'back.out(1.2)',
                    onStart: () => setActiveMessageIndex(index),
                    delay: index === 0 ? 0.4 : 0.2
                },
                index === 0 ? '+=0.3' : '-=0.2'
            );
        });

        timeline.call(() => handleDoubleClick(3), []);

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    useEffect(() => {
        if (activeMessageIndex === -1 || !imageRef.current) return;

        const messages = document.querySelectorAll('.received.message');
        if (messages[activeMessageIndex]) {
            const messageRect = messages[activeMessageIndex].getBoundingClientRect();
            const containerRect = triggerRef.current?.getBoundingClientRect() || { top: 0 };

            gsap.to(imageRef.current, {
                opacity: 1,
                y: messageRect.top - containerRect.top + 12,
                duration: 0.6,
                ease: 'power2.out',
                overwrite: true
            });
        }
    }, [activeMessageIndex]);

    const handleDoubleClick = (id: number) => {
        setActiveHearts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const renderMessage = ({ type, text, emoji, id }: Message) => (
        <div className={`${type} message w-full flex min-h-[3.5rem] gap-2 sm:gap-4 items-center text-lg sm:text-xl lg:text-2xl select-none font-medium ${type === 'sent' ? 'justify-end' : 'justify-start'}`}>
            {type === 'sent' && (
                <>
                    <div className="bg-gray-200 p-2 px-3 sm:px-4 rounded-2xl relative text-black">
                        {text}
                        {emoji && <span className="wave-emoji min-h-0">{emoji}</span>}
                    </div>
                    <Image
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden"
                        src="/media/dp.jpg"
                        alt="Profile"
                        width={64}
                        height={64}
                        priority
                    />
                    <p className="seen w-fit absolute right-2 top-full text-gray-500 text-sm sm:text-base">
                        Seen just now
                    </p>
                </>
            )}
            {type === 'received' && (
                <div
                    className="bg-gray-200 p-2 px-3 sm:px-4 rounded-2xl relative text-black group"
                    onDoubleClick={() => id !== undefined && handleDoubleClick(id)}
                    title="Double Click To Heart"
                >
                    {text}
                    {emoji && <span className="wave-emoji min-h-0">{emoji}</span>}
                    <span className="hidden sm:block text-gray-500 text-base sm:text-lg italic opacity-0 group-hover:opacity-100 w-fit absolute top-1/2 -translate-y-1/2 left-[120%] whitespace-nowrap">
                        <i className="ri-information-line w-fit mr-1" />
                        Double Click To Heart..
                    </span>
                    <i
                        className={`ri-heart-3-fill heart absolute text-pink-600 -bottom-4 right-[50%] w-fit transition-all bg-slate-100 shadow-custom-dbc-black rounded-full text-xl px-1 duration-500 ${!activeHearts.has(id ?? -1) ? 'scale-0' : 'scale-100'}`}
                        id={`heart${id}`}
                    />
                </div>
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
                    className="w-full mx-auto h-fit px-4 sm:px-8 lg:px-20 gap-2 flex flex-col relative"
                >
                    <Image
                        ref={imageRef}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden absolute transition-[top] duration-500 opacity-0"
                        src="/media/dp.jpg"
                        alt="Profile"
                        width={64}
                        height={64}
                        priority
                        style={{ top: '-35px' }}
                    />

                    <div className="flex flex-col w-full gap-2">
                        {messages.map((message, index) => (
                            <div
                                key={message.id || index}
                                className={`${message.type === 'sent' ? 'justify-end' : 'justify-start translate-x-14 sm:translate-x-20'}`}
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