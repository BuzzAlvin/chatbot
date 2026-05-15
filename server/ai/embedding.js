import { GoogleGenAI } from "@google/genai";

export const createEmbedding = async (text) => {
  try {
    // Initialize Gemini inside the function so process.env is ready
    const genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // Call the Google embedding endpoint
    const response = await genAI.models.embedContent({
      model: "gemini-embedding-001",
      contents: [ text ],
    });

    // Return the array of float numbers

    // The SDK sometimes returns response.embeddings as an array or a single object so this safely handles both structures.
    if (response.embeddings && response.embeddings[0]) {
      return response.embeddings[0].values;
    }

    throw new Error("Unexpected embedding response structure from Gemini API");
  } catch (error) {
    console.error("Embedding Error:", error);
    return null;
  }
};
