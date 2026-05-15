import { db } from "../services/db.js";
import { createEmbedding } from "../ai/embedding.js";
import { knowledgeBaseData } from "../data/knowledgeBaseData.js";

const seed = async () => {
  try {
    for (const item of knowledgeBaseData) {
      console.log(`Generating embedding for: ${item.question}`);

      // Generate embedding
      const embedding = await createEmbedding(item.question);

      // Skip if embedding failed
      if (!embedding) {
        console.log(`❌ Failed embedding for question: ${item.question}`);
        continue;
      }

      // Insert into Supabase
      const { error } = await db.from("knowledge_base").insert({
        question: item.question,
        answer: item.answer,
        embedding,
      });

      // Handle insert errors
      if (error) {
        console.log("❌ Supabase Insert Error:");
        console.log(error);
        continue;
      }

      console.log(`✅ Added: ${item.question}`);
    }

    console.log("🎉 Knowledge base seeding completed.");
  } catch (error) {
    console.error("🔥 Seeder crashed:", error);
  }
};

seed();
