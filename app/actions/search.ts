/** biome-ignore-all lint/suspicious/noConsole: "Handy for debugging" */

"use server";

import { Search } from "@upstash/search";
import type { PutBlobResult } from "@vercel/blob";

const upstash = Search.fromEnv();
const index = upstash.index("images");

type SearchResponse =
  | {
      data: PutBlobResult[];
    }
  | {
      error: string;
    };

export const search = async (
  _prevState: SearchResponse | undefined,
  formData: FormData
): Promise<SearchResponse> => {
  const query = formData.get("search");

  if (!query || typeof query !== "string") {
    return { error: "Please enter a search query" };
  }

  try {
    console.log("Searching index for query:", query);
    
    // 触发搜索事件，用于记录搜索历史
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("search-performed", { detail: { query } }));
    }
    
    const results = await index.search({ 
      query,
      limit: 20,
      semanticWeight: 0.6,
    });

    console.log("Results:", results);
    
    const data = results
      .sort((a, b) => b.score - a.score)
      .map((result) => result.metadata)
      .filter(Boolean) as unknown as PutBlobResult[];

    console.log("Images found:", data);
    return { data };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return { error: message };
  }
};
