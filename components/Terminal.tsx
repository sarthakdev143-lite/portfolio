"use client";
import { useState, useEffect, useRef } from "react";

interface TerminalProps {
    onClose: () => void;
}

export default function Terminal({ onClose }: TerminalProps) {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>([
        "Sarthak_Engine [Version 1.0.4]",
        "(c) 2026 SP. All rights reserved.",
        " ",
        "Type your message to send an email. Type 'EXIT' to close session.",
        " "
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Keep input focused so typing always works
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Auto-scroll to bottom of terminal
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const cmd = input.trim();
            setInput("");

            if (cmd.toUpperCase() === "EXIT") {
                onClose();
                return;
            }

            if (cmd !== "") {
                setHistory(prev => [...prev, `C:\\GUEST\\USR> ${cmd}`, "Executing handshake protocol...", "Redirecting to secure mail client..."]);

                // Simulate processing time before opening mail client
                setTimeout(() => {
                    window.location.href = `mailto:your-email@example.com?subject=Incoming Transmission&body=${encodeURIComponent(cmd)}`;
                    setTimeout(() => onClose(), 1000);
                }, 800);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-sm">
            <div
                className="w-full max-w-4xl h-[60vh] bg-[#0a0a0c] border border-white/10 rounded-lg shadow-2xl flex flex-col font-mono text-sm overflow-hidden text-[#ccff00]"
                onClick={() => inputRef.current?.focus()}
            >
                {/* Terminal Header */}
                <div className="flex justify-between items-center bg-white/5 px-4 py-2 border-b border-white/10 text-gray-400 text-xs">
                    <span>TERMINAL // COM_LINK</span>
                    <button onClick={onClose} className="hover:text-white transition-colors">[ X ] CLOSE</button>
                </div>

                {/* Terminal Body */}
                <div ref={containerRef} className="flex-1 p-6 overflow-y-auto">
                    {history.map((line, i) => (
                        <div key={i} className="mb-1">{line}</div>
                    ))}

                    <div className="flex items-center mt-2">
                        <span className="mr-2">C:\GUEST\USR&gt;</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent border-none outline-none text-[#ccff00] caret-[#ccff00]"
                            spellCheck="false"
                            autoComplete="off"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}