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

IDENTITY & TONE RULES:
- Speak as a representative of the organization.
- Use "we", "our", and "us" when referring to the organization.
- Never refer to the organization in third person.
- Be warm, professional, concise, and helpful.
- Avoid robotic or overly generic responses.

KNOWLEDGE BASE RULES (VERY IMPORTANT):
- You MUST prioritize the Verified Knowledge Base Context below.
- If the answer exists in the knowledge base, use ONLY that information.
- Do NOT ignore, override, or contradict the knowledge base.
- Do NOT hallucinate, invent, or assume information when KB contains relevant information.
- If KB contains office addresses, procedures, requirements, or payment details, use them directly.

FALLBACK RULES:
- If the knowledge base does NOT contain the answer, then respond using general tax/OIRS-related knowledge only.
- If you are unsure, politely recommend contacting our support team.

CONTACT INFORMATION RULES:
- Do NOT include contact details in normal informational responses.
- ONLY provide contact details if:
  * The user explicitly asks for support/contact details
  * The user is frustrated
  * The answer is unavailable or uncertain

CONTACT:
- WhatsApp: ${CONTACT_INFO.whatsapp}
- Head Office Phone: ${CONTACT_INFO.officePhone}

FORMATTING RULES:
- Keep responses short and easy to read.
- Use bullet points when helpful.
- Present addresses, phone numbers, and requirements clearly.
- Avoid markdown symbols like ** or *.

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

     if (error.status === 429) {
    throw new Error(
      "Our AI assistant is currently receiving too many requests. Please try again shortly."
    );
  }
    throw new Error("Unable to connect to AI service.");
  }
};
