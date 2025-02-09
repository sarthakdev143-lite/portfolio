import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BotMessageSquare, Send, Bot, User } from "lucide-react";
import axios from "axios";

interface ChatMessage {
    role: "user" | "bot";
    text: string;
    timestamp: Date;
}

const popUpVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 }
};

const chatWindowVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: {
        y: 100,
        opacity: 0,
        transition: { ease: "easeInOut", duration: 0.2 }
    }
};

export default function Chat() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const chatboxRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const preventScrollPropagation = (e: Event) => e.stopPropagation();
        const currentChatbox = chatboxRef.current;

        if (currentChatbox) {
            currentChatbox.addEventListener("wheel", preventScrollPropagation);
        }

        return () => {
            if (currentChatbox) {
                currentChatbox.removeEventListener("wheel", preventScrollPropagation);
            }
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [chat]);

    useEffect(() => {
        if (!isOpen) {
            setChat([]);
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (!message.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            role: "user",
            text: message.trim(),
            timestamp: new Date()
        };

        setChat(prev => [...prev, userMessage]);
        setMessage("");
        setIsLoading(true);

        try {
            const { data } = await axios.post("/api/chat", { message: message.trim() });

            const botMessage: ChatMessage = {
                role: "bot",
                text: data.reply || "I couldn't process that message.",
                timestamp: new Date()
            };
            setChat(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            setChat(prev => [...prev, {
                role: "bot",
                text: "Sorry, I encountered an error. Please try again later.",
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);

            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const toggleChatbox = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="fixed right-0 bottom-0 z-50">
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.button
                        key="chat-button"
                        variants={popUpVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() => toggleChatbox()}
                        className="m-4 p-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full shadow-lg transition-colors"
                    >
                        <BotMessageSquare />
                    </motion.button>
                ) : (
                    <>
                        <motion.div
                            key="chat-window"
                            variants={chatWindowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="w-96 h-[40rem] flex flex-col bg-zinc-900 m-4 rounded-xl overflow-hidden border-2 border-zinc-800"
                        >
                            <div className="flex items-center justify-between p-4 bg-black/90">
                                <div className="flex items-center gap-2">
                                    <Bot className="text-white" size={24} />
                                    <h2 className="text-lg font-bold text-white">Chat with Sarthak</h2>
                                </div>
                                <button
                                    onClick={() => toggleChatbox()}
                                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                                >
                                    <X className="text-white" size={20} />
                                </button>
                            </div>

                            <div ref={chatboxRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-900 better-scrollbar" onWheel={(e) => e.stopPropagation()}>

                                {chat.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}
                                    >
                                        {msg.role === "bot" && (
                                            <div className="mt-2">
                                                <Bot className="text-zinc-400" size={20} />
                                            </div>
                                        )}
                                        <div className="max-w-[85%] flex flex-col">
                                            <div
                                                className={`px-4 py-3 rounded-2xl ${msg.role === "user"
                                                    ? "bg-white text-black rounded-br-none"
                                                    : "bg-zinc-800 text-white rounded-bl-none"
                                                    }`}
                                            >
                                                {msg.text.split('\n').map((line, i) => (
                                                    <p key={i} className="break-words">{line}</p>
                                                ))}
                                            </div>
                                            <span className="text-xs mt-1 text-zinc-400 self-end">
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        {msg.role === "user" && (
                                            <div className="mt-2">
                                                <User className="text-zinc-400" size={20} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex items-center gap-2 text-zinc-400">
                                        <Bot className="animate-pulse" size={20} />
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce delay-500"></div>
                                            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce delay-1000 "></div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="p-4 bg-black/90">
                                <div className="flex gap-2">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        className="flex-1 bg-zinc-800 text-white border border-zinc-700 px-4 py-3 rounded-xl focus:outline-none focus:ring-white placeholder-zinc-500"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder="Type your message here..."
                                        disabled={isLoading}
                                        autoFocus
                                    />
                                    <button
                                        className={`p-3 rounded-xl ${isLoading
                                            ? "bg-zinc-700 cursor-not-allowed"
                                            : "bg-white hover:bg-zinc-100"
                                            } ${isLoading ? "text-zinc-400" : "text-black"} transition-all`}
                                        onClick={sendMessage}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="h-6 aspect-square border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <Send size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}