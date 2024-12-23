import { keyword } from "@/interfaces/keyword";
import axios from "axios";

export async function getTags(query: string) {
  const data = {
    query:
      "query SearchKeywords($input: SearchKeywordsInput) {\r\n  searchKeywords(input: $input) {\r\n    keywordId\r\n    keyword\r\n     }\r\n}\r\n",
    variables: {
      input: {
        query,
      },
    },
    operationName: "SearchKeywords",
  };

  try {
    return await axios
      .post(process.env.NEXT_PUBLIC_KEYWORDS_REST_API as string, data)
      .then(({ data }: { data: Root }) => ({
        error: false,
        data: data.data.searchKeywords,
      }));
  } catch (error) {
    return { error: true, data: null };
  }
}

export interface Root {
  data: { searchKeywords: keyword[] };
}
