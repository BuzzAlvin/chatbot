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

    // Greeting request
    if (isGreeting) {
      const greeting = await getOrCreateGreeting();

      return res.json({
        reply: greeting,
      });
    }

    // Check cache first
    const cached = getCachedResponse(message);

    if (cached) {
      console.log("Cache hit!");

      return res.json({
        reply: cached,
      });
    }

    // Semantic search
    const relevantKnowledge =
      await findRelevantKnowledge(message);



    const bestMatch = relevantKnowledge[0];

    let reply = "";

    // VERY STRONG MATCH
    // Return DB answer directly
    if (
      bestMatch &&
      bestMatch.similarity >= 0.6
    ) {
      reply = bestMatch.answer;
    }

    // MEDIUM MATCH
    // Use Gemini + KB context
    else if (
      bestMatch &&
      bestMatch.similarity >= 0.4
    ) {
      reply = await askGemini(
        message,
        history,
        relevantKnowledge
      );
    }

    // LOW MATCH
    // Full Gemini fallback
    else {
      reply = await askGemini(
        message,
        history,
        []
      );
    }

    // Save response in cache
    setCachedResponse(message, reply);

    // Save conversation
    await db.from("conversations").insert([
      {
        user_text: message,
        bot_text: reply,
      },
    ]);

        console.log(
      "Relevant Knowledge:",
      relevantKnowledge
    );

        console.log(
      "SIMILARITY:",
      bestMatch?.similarity
    );

    return res.json({
      reply,
    });

  } catch (error) {
    console.log("server error:", error);

    return res.status(500).json({
      error: true,
      reply:
        "⚠️  Our assistant is temporarily unavailable. Please try again shortly.",
    });
  }
};
