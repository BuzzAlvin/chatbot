import { GoogleGenAI } from "@google/genai";

//GREETING GENERATOR FROM AI

const FALLBACK_GREETINGS = [
  "Hello 👋 Welcome to the OIRS AI Assistant. How may I help you today?",
  
  "Welcome to OIRS 👋 I'm here to assist you with tax-related questions.",

  "Hi there 👋 Need help with taxes, payments, or TCC? I'm here to help.",

  "Welcome 👋 How can I assist you with your OIRS-related inquiry today?",
];

export const generateGreeting = async () => {
  try {
      const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const chat = genAI.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: `
You are a tax assistant chatbot for OIRS.

Generate ONLY ONE short greeting message.
Rules:
- 1 sentence only
- friendly tone
- different each time
- no explanations
      `,
    },
  });

  const result = await chat.sendMessage({
    message: "Generate greeting",
  });

  return result.text;
  } catch (error) {
     console.error("Greeting generation failed:", error);

    // fallback greeting
    return FALLBACK_GREETINGS[
      Math.floor(Math.random() * FALLBACK_GREETINGS.length)
    ];
  }

};