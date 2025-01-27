'use client'

import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
    isLoading: boolean;
    progress?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, progress = 0 }) => {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => {
                setShowLoader(false);
            }, 500); // Smooth fade-out transition

            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!showLoader) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
            <div className="text-white text-center">
                <div className="loader mb-4">
                    <div
                        className="loader-circle animate-spin border-4 border-t-blue-500 border-gray-200 rounded-full h-20 w-20 mx-auto"
                    ></div>
                </div>
                {/* FIXME: Make a engaing good looking loader */}

                <div className="progress-bar w-64 bg-gray-700 rounded-full h-2 mt-4">
                    <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;