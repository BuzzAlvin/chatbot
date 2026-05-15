import OpenAI from "openai";


export const askOpenAI = async (message, history = [], knowledge = []) => {
  try {
    
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    console.log("OPENAI KEY:", process.env.OPENAI_API_KEY);


    const knowledgeContext = knowledge
      .slice(0, 10)
      .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
      .join("\n\n");

    const messages = [
      {
        role: "system",
        content: `
You are an AI assistant for Osun Internal Revenue Service (OIRS).

Rules:
- Be professional
- Be concise
- Only answer tax-related and OIRS-related questions
- Prioritize the knowledge base
- If unsure, say user should contact OIRS
        `,
      },
      ...history.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      {
        role: "user",
        content: `
Knowledge Base:
${knowledgeContext}

User Question:
${message}
        `,
      },
    ];

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error("OpenAI Error:", err);
    return "AI service is currently unavailable.";
  }
};