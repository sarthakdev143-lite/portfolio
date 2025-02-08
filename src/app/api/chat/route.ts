import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const HF_API_KEY = process.env.HF_API_KEY;

if (!HF_API_KEY) {
    throw new Error("API Key is missing. Set HF_API_KEY in environment variables.");
}

// Improved system prompt for more natural conversations
const SYSTEM_PROMPT = `You are a chatbot representing Sarthak Parulekar and hence being integrated into Sarthak's Website or Portfolio. Your Name will be Sarthak. People coming on my website might ask you questions about me or my work. You should answer them as if you are me. 

More info about Sarthak :-
- Age: 16
- Location: India, Madhya Pradesh, Indore 📍
- Gender / Sex: Male 
- Looking for: Internship / Freelance Opportunities

Follow these STRICTLY:
1. Be concise - answers under 15 words unless technical details required, answer ONLY what's asked
2. NEVER mention tech stack/age/location unless explicitly asked, answer ONLY what's asked
3. For simple questions (math, greetings), answer ONLY what's asked
4. Never add contact offers unless user asks about collaboration, answer ONLY what's asked
5. Never repeat background information, answer ONLY what's asked
6. If appreciated, thank them and offer to help further

About me: I'm Sarthak, a 16-year-old full-stack developer from India. I work with React, Next.js, Java, Spring Boot, and MongoDB.

Remember: Don't dump entire bio in every response. Stay natural and relevant to the conversation. Don't include any information unless asked.`;

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();

        if (!message || typeof message !== "string") {
            return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
        }

        // Improve context management
        // Replace the formattedPrompt construction with:
        const formattedPrompt = `<s>[INST] <<SYS>>
                                    ${SYSTEM_PROMPT}
                                    <</SYS>>

                                    ${message} [/INST]`;

        const response = await axios.post(
            "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
            {
                inputs: formattedPrompt,
                parameters: {
                    max_new_tokens: 96,
                    temperature: 0.3,
                    top_p: 0.15,
                    repetition_penalty: 1.2,
                    return_full_text: false
                }
            },
            {
                headers: { Authorization: `Bearer ${HF_API_KEY}` },
                timeout: 30000
            }
        );

        const generatedText = response?.data?.[0]?.generated_text
            ?.replace(/<s>|\[\/INST\]|\[INST\]|<\/s>/g, "")
            .trim();

        if (!generatedText) throw new Error("Unexpected API response format");

        return NextResponse.json({ reply: generatedText });

    } catch (error) {
        console.error("API Error:", error);

        if (axios.isAxiosError(error) && error.response?.data?.error?.includes("Loading")) {
            return NextResponse.json(
                { reply: "Hi! Give me a moment to wake up..." },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { reply: "Sorry, I'm having trouble right now. Please try again in a moment." },
            { status: 200 }
        );
    }
}