"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { X, Copy, Check, Terminal as TerminalIcon } from "lucide-react";
import { motion } from "motion/react";

interface TerminalProps {
    onClose: () => void;
}

interface Log {
    id: string;
    type: "input" | "output" | "system" | "error";
    text: string;
}

export default function Terminal({ onClose }: TerminalProps) {
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [copied, setCopied] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [history, setHistory] = useState<Log[]>([
        { id: "sys-1", type: "system", text: "Sarthak_Engine [Version 1.0.4]" },
        { id: "sys-2", type: "system", text: "(c) 2026 SP. All rights reserved." },
        { id: "sys-3", type: "system", text: " " },
        { id: "sys-4", type: "output", text: "Welcome. Type 'help' to see available commands, or 'exit' to close." },
        { id: "sys-5", type: "system", text: " " }
    ]);

    // 1. Hardware Escape Key Listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const handleContainerClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevents clicks inside the shell from bubbling up to the backdrop
        if (!isTyping) inputRef.current?.focus();
    };

    // Auto-scroll to bottom on new logs
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, isTyping]);

    const processCommand = async (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        if (!trimmedCmd) return;

        const inputLog: Log = { id: Date.now().toString(), type: "input", text: trimmedCmd };
        setHistory((prev) => [...prev, inputLog]);
        setInput("");
        setIsTyping(true);

        await new Promise((resolve) => setTimeout(resolve, 400));

        let responseLines: string[] = [];
        let logType: "output" | "error" = "output";

        switch (trimmedCmd) {
            case "help":
                responseLines = [
                    "AVAILABLE COMMANDS:",
                    "  about      - Display system bio and mission parameter",
                    "  contact    - Initialize communication protocols",
                    "  stack      - Print core engineering technologies",
                    "  clear      - Wipe terminal history",
                    "  exit       - Terminate session",
                ];
                break;
            case "about":
                responseLines = [
                    "TARGET: Sarthak Parulekar",
                    "ROLE: Creative Software Engineer",
                    "STATUS: Crafting high-performance web applications and fluid interactive physics interfaces.",
                    "LOCATION: Indore, Madhya Pradesh, India"
                ];
                break;
            case "contact":
                responseLines = [
                    "INITIALIZING CONTACT PROTOCOL...",
                    "Email: sarthakdev143.official@gmail.com",
                    "LinkedIn: linkedin.com/in/sarthak-parulekar",
                    "GitHub: github.com/sarthakdev143-lite",
                ];
                break;
            case "stack":
                responseLines = [
                    "CORE ARCHITECTURE:",
                    "► Frontend: Next.js, React, TypeScript, Tailwind CSS",
                    "► Backend: Spring Boot, Node.js, REST APIs",
                    "► Motion/Physics: GSAP, Lenis, Framer Motion, Canvas",
                    "► Systems: Git Workflows, Deployment Pipelines"
                ];
                break;
            case "sudo":
            case "sudo su":
                logType = "error";
                responseLines = ["Access denied. This incident will be reported."];
                break;
            case "clear":
                setHistory([]);
                setIsTyping(false);
                return;
            case "exit":
                onClose();
                return;
            default:
                logType = "error";
                responseLines = [`Command not found: ${trimmedCmd}. Type 'help' for a list of valid commands.`];
        }

        for (let i = 0; i < responseLines.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 150));
            setHistory((prev) => [
                ...prev,
                { id: `out-${Date.now()}-${i}`, type: logType, text: responseLines[i] }
            ]);
        }

        setIsTyping(false);
        setTimeout(() => inputRef.current?.focus(), 10);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!isTyping && input) {
            processCommand(input);
        }
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("sarthakdev143.official@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const renderIDEText = (text: string) => {
        // If it's just standard text, let's parse it for common code patterns
        const parts = text.split(/("(?:[^"\\]|\\.)*"|\[.*?\]|=>|true|false)/g);

        return (
            <>
                {parts.map((part, index) => {
                    if (!part) return null;

                    // Strings (Green)
                    if (part.startsWith('"') && part.endsWith('"')) {
                        return <span key={index} className="text-[#98c379]">{part}</span>;
                    }
                    // Arrays/Brackets (Yellow)
                    if (part.startsWith('[') && part.endsWith(']')) {
                        return <span key={index} className="text-[#e5c07b]">{part}</span>;
                    }
                    // Booleans (Orange)
                    if (part === 'true' || part === 'false') {
                        return <span key={index} className="text-[#d19a66]">{part}</span>;
                    }
                    // Arrows/Operators (Purple)
                    if (part === '=>') {
                        return <span key={index} className="text-[#c678dd]">{part}</span>;
                    }

                    // Highlight specific system paths or commands in Blue
                    if (part.includes('/usr/bin/') || part.includes('npm run')) {
                        return <span key={index} className="text-[#61afef]">{part}</span>;
                    }

                    // Default text
                    return <span key={index} className="text-white/80">{part}</span>;
                })}
            </>
        );
    };

    return (
        // 2. Animated Backdrop
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={onClose} // Closes the terminal when clicking the outside overlay
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f0f11]/80 backdrop-blur-sm cursor-pointer"
        >
            {/* 2. Animated Terminal Shell */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-3xl h-[60vh] min-h-100 bg-[#0c0c0e] border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden will-change-transform cursor-default"
                onClick={handleContainerClick} // Stops event bubbling and focuses input
            >
                {/* CRT Scanline Overlay Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_4px,3px_100%] z-10" />

                {/* Terminal Header Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#131316] border-b border-white/5 select-none relative z-20">
                    <div className="flex items-center gap-3">
                        <TerminalIcon className="w-4 h-4 text-neutral-400" />
                        <span className="text-xs font-mono font-medium text-neutral-400 tracking-wider">root@sarthak_engine:~</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); handleCopyEmail(); }}
                            aria-label={copied ? "Email copied" : "Copy email address"}
                            className="group cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                        >
                            {copied
                                ? <Check className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
                                : <Copy className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" aria-hidden="true" />
                            }
                            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">
                                {copied ? "Copied" : "Copy Email"}
                            </span>
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); onClose(); }}
                            className="p-1.5 cursor-pointer rounded hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors"
                            aria-label="Close terminal"
                            title="Close (Esc)"
                        >
                            <X className="w-4 h-4" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                {/* Terminal Output Screen */}
                <div
                    ref={scrollRef}
                    className="flex-1 p-6 overflow-y-auto font-mono text-sm md:text-base relative z-20 scrollbar-ide"
                >
                    <div className="space-y-1.5 pb-4">
                        {history.map((log) => (
                            <div key={log.id} className="flex items-start gap-3">
                                {log.type === "input" && (
                                    <div className="flex gap-2 text-white/90">
                                        <span className="text-[#61afef]">~/portfolio</span>
                                        <span className="text-[#c678dd]">❯</span>
                                        <span>{log.text}</span>
                                    </div>
                                )}
                                <div className={`pl-4 ${log.type === 'error' ? 'text-red-400' : ''}`}>
                                    {log.type === 'error' ? log.text : renderIDEText(log.text)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="flex items-center gap-3 mt-2">
                        <span className="text-[#ccff00] shrink-0">➜</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isTyping}
                            autoFocus
                            autoComplete="off"
                            spellCheck="false"
                            className="flex-1 bg-transparent outline-none border-none text-white font-mono shadow-none focus:ring-0 p-0 disabled:opacity-50"
                        />
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
}