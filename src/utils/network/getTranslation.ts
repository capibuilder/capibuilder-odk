import axios from "axios";

interface input {
  text: string;
  languages: string[];
}

export async function getTranslation({ languages, text }: input) {
  if (text.length < 2) return { error: true, data: null };

  const data = {
    query:
      "mutation Mutation($input: TranslateInput!) {\r\n  translate(input: $input)\r\n}",
    variables: {
      input: {
        texts: [
          {
            text,
          },
        ],
        to: languages,
      },
    },
    operationName: "Mutation",
  };

  try {
    return await axios
      .post(process.env.NEXT_PUBLIC_TRANSLATIONS_REST_API as string, data)
      .then(({ data }: { data: Root }) => ({ error: false, data: data.data }));
  } catch (error) {
    return { error: true, data: null };
  }
}

export interface Root {
  data: Data;
}

export interface Data {
  translate: Translate;
}

export interface Translate {
  http: number;
  message: string;
  data: Daum[];
}

export interface Daum {
  detectedLanguage: DetectedLanguage;
  translations: Translation[];
}

export interface DetectedLanguage {
  language: string;
  score: number;
}

export interface Translation {
  text: string;
  to: string;
}
