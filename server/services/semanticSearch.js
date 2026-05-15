import { db } from "./db.js";
import { createEmbedding } from "../ai/embedding.js";


const calculateKeywordScore = (
  text,
  query
) => {
  const queryWords = query
    .toLowerCase()
    .split(" ");

  const textLower = text.toLowerCase();

  let score = 0;

  queryWords.forEach((word) => {
    if (textLower.includes(word)) {
      score += 1;
    }
  });

  return score;
};

export const findRelevantKnowledge = async (query) => {
    const embedding = await createEmbedding(query);

    const {data, error} = await db.rpc(
        "match_knowledge",
        {
            query_embedding: embedding,
            match_threshold: 0.6,
            match_count: 5,
        }
    );

    if(error) {
        console.log("Semantic Search Error:", error);
        return [];
    }

    //Hybrid Ranking for 
     const rankedResults = data.map((item) => {
    const keywordScore =
      calculateKeywordScore(
        item.question,
        query
      );

    const finalScore =
      item.similarity * 0.7 +
      keywordScore * 0.3;

    return {
      ...item,
      keywordScore,
      finalScore,
    };
  });

  // Sort highest first
  rankedResults.sort(
    (a, b) => b.finalScore - a.finalScore
  );
  console.log(rankedResults);

/*   return []; // After am done i will remove this */

  // Return top 5
  return rankedResults.slice(0, 5);

};