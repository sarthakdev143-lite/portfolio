'use client';

import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
    isLoading: boolean;
    progress?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, progress = 0 }) => {
    const [showLoader, setShowLoader] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setFadeOut(true); // Trigger fade-out effect
            const timer = setTimeout(() => {
                setShowLoader(false);
            }, 1000); // Allow time for fade-out animation

            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!showLoader) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-all duration-1000 ${
                fadeOut ? 'brightness-0 opacity-0' : 'brightness-100 opacity-100'
            }`}
        >
            <div className="progress-bar w-64 bg-gray-700 rounded-full h-2 mt-4">
                <div
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default LoadingScreen;
