import { GoogleGenAI } from "@google/genai";
import { CONTACT_INFO } from "../config/contact.js";

export const askGemini = async (message, history = [], knowledge = []) => {
  try {
    const genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // Format the database context snippets
    const knowledgeContext = knowledge
      .slice(0, 10)
      .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
      .join("\n\n");

    // Build the chat session
    const chat = genAI.chats.create({
      model: "gemini-2.5-flash-lite",
      history: (history || []).map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
      config: {
        // Inject the context here dynamically. This keeps the message history
        // clean, while ensuring Gemini applies the knowledge rules for this turn!
        systemInstruction: `
You are an assistant for ${CONTACT_INFO.officeName}.

RULES (VERY IMPORTANT):
- You MUST prioritize the Verified Knowledge Base Context.
- If the answer exists in the knowledge base, use ONLY it.
- Do NOT ignore or override the knowledge base.
- Do NOT hallucinate or guess if KB contains relevant info.

If KB has no relevant answer:
- Then respond using general knowledge, but stay tax/OIRS related.

CRITICAL CONTACT RULES:
- Only show contact info when user explicitly asks or is frustrated.

CONTACT:
- WhatsApp: ${CONTACT_INFO.whatsapp}
- Office Phone: ${CONTACT_INFO.officePhone}

=== VERIFIED KNOWLEDGE BASE (TRUST THIS FIRST) ===
${knowledgeContext}
`,
      },
    });

    // Send ONLY the raw user question to preserve a clean conversation history
    const result = await chat.sendMessage({
      message: message,
    });

    const cleanText = result.text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .trim();

    return cleanText;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Unable to connect to AI service.");
  }
};
