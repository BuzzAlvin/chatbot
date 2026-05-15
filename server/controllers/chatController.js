import { askGemini } from "../ai/gemini.js";
import { db } from "../services/db.js";
import { findRelevantKnowledge } from "../services/semanticSearch.js";
import {
  getCachedResponse,
  setCachedResponse,
} from "../cache/responseCache.js";
import { getOrCreateGreeting } from "../services/greetingManager.js";

export const sendMessage = async (req, res) => {
  try {
    const { message, history, isGreeting } = req.body;

    // greeting request for user on page load
    if (isGreeting) {
      const greeting = await getOrCreateGreeting();

      return res.json({ reply: greeting });
    }

    // Check cache BEFORE doing database vector searches
    const cached = getCachedResponse(message);
    if (cached) {
      console.log("Cache hit! Bypassing Supabase and Gemini entirely.");
      return res.json({ reply: cached });
    }

    //semantic vector search
    const relevantKnowledge = await findRelevantKnowledge(message);

    console.log("Relevant Knowledge:", relevantKnowledge);
    
    //AI response
    const reply = await askGemini(message, history, relevantKnowledge);

    // FIX: Save the fresh response into your cache for the next time!
    if (reply) {
      setCachedResponse(message, reply);
    }

    // save user and bot conversation
    await db.from("conversations").insert([
      {
        user_text: message,
        bot_text: reply,
      },
    ]);

    return res.json({ reply });
  } catch (error) {
    console.log("server error:", error);

    return res.status(500).json({
    error: true,
    reply:
      "⚠️ Unable to connect. Please check your internet connection or try again shortly.",
  });
  }
};
