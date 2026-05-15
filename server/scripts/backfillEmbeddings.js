import { db } from "../services/db.js";
import { createEmbedding } from "../ai/embedding.js";

const run = async () => {
  const { data, error } = await db
    .from("knowledge_base")
    .select("id, question");

  if (error) {
    console.log(error);
    return;
  }

  for (const item of data) {
    const embedding = await createEmbedding(item.question);

    await db
      .from("knowledge_base")
      .update({ embedding })
      .eq("id", item.id);

    console.log(`Embedded: ${item.id}`);
  }
};

run();