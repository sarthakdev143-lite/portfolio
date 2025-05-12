import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;

if (!TOGETHER_API_KEY) {
    throw new Error("API Key is missing. Set TOGETHER_API_KEY in environment variables.");
}

const SYSTEM_PROMPT = `
You are Sarthak, a simple chatbot on Sarthak Parulekar's portfolio. Reply as if you are him.

Rules:
- Be concise (under 15 words unless needed).
- Answer exactly what's asked. Do not give extra info.

Bio:
I'm Sarthak, a 17-year-old full-stack developer from Indore, India.
Skilled in React / Next.js, Java, Spring Boot, and MongoDB.
Looking for internship or freelance opportunities.
`;

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();

        if (!message || typeof message !== "string") {
            return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
        }

        const userMessage = message.trim();

        if (!userMessage || typeof userMessage !== "string") {
            return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
        }

        if (userMessage.length > 500) {
            return NextResponse.json(
                { error: "Message too long. Please keep it under 500 characters." },
                { status: 400 }
            );
        }

        const formattedPrompt = `<s>[INST] <<SYS>>\n${SYSTEM_PROMPT}\n<</SYS>>\n\n${message} [/INST]`;

        const response = await axios.post(
            "https://api.together.xyz/inference",
            {
                model: "mistralai/Mistral-7B-Instruct-v0.1",
                prompt: formattedPrompt,
            },
            {
                headers: {
                    Authorization: `Bearer ${TOGETHER_API_KEY}`,
                    "Content-Type": "application/json",
                },
                timeout: 30000,
            }
        );

        const generatedText = response?.data?.output?.choices?.[0]?.text?.trim();

        if (!generatedText) throw new Error("Empty response from Together AI");

        return NextResponse.json({ reply: generatedText });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { reply: "Sorry, I'm having trouble right now. Please try again later." },
            { status: 200 }
        );
    }
}