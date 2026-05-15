import { db } from "../services/db.js";
import { createEmbedding } from "../ai/embedding.js";

const generateEmbeddings = async () => {
  // get all knowledge rows
  const { data, error } = await db
    .from("knowledge_base")
    .select("*");

  if (error) {
    console.log(error);
    return;
  }

  for (const item of data) {
    // skip existing embeddings
    if (item.embedding) continue;

    console.log(`Generating embedding for: ${item.question}`);

    const embedding = await createEmbedding(item.question);

    const { error: updateError } = await db
      .from("knowledge_base")
      .update({
        embedding,
      })
      .eq("id", item.id);

    if (updateError) {
      console.log(updateError);
    } else {
      console.log("Updated.");
    }
  }

  console.log("Done generating embeddings.");
};

generateEmbeddings();