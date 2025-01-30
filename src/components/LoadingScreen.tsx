'use client'

import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
    isLoading: boolean;
    progress?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, progress = 0 }) => {
    const [showLoader, setShowLoader] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Disable scrolling when loader is shown
        if (showLoader) {
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
            // Prevent iOS Safari bouncing effect
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        }

        if (!isLoading) {
            setFadeOut(true); // Trigger fade-out effect
            const timer = setTimeout(() => {
                setShowLoader(false);
                // Re-enable scrolling
                document.body.style.overflow = '';
                document.body.style.height = '';
                document.body.style.position = '';
                document.body.style.width = '';
                // Reset scroll position
                window.scrollTo(0, 0);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isLoading, showLoader]);

    useEffect(() => {
        // Cleanup function to ensure scroll is re-enabled if component unmounts
        return () => {
            document.body.style.overflow = '';
            document.body.style.height = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, []);

    if (!showLoader) return null;

    return (
        <div className={`fixed bg-black pointer-events-none inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-1000 ${fadeOut ? 'brightness-0 opacity-0' : 'brightness-100 opacity-100'
            }`} >
            <div className="progress-bar w-64 bg-gray-700 rounded-full h-[0.4rem] mt-4">
                <div
                    className="bg-white h-[0.4rem] rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="text-white text-sm mt-3 opacity-80">
                Tip: Scroll slower for a better experience...
            </p>
        </div>
    );
};

export default LoadingScreen;
