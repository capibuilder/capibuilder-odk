/* This code is importing the Axios library and creating three instances of Axios with different base
URLs. These instances can be used to make HTTP requests to different APIs. The base URLs are set
using environment variables defined in the `.env` file. */
import { API_KEY } from "@/config";
import axios from "axios";

export const getTokenFormLocal = () => {
  if (typeof window === "undefined") return "";
  const auth = JSON.parse(localStorage.getItem("auth") as string);
  return auth ? `Bearer ${auth.token}` : "";
};

export const odkAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ODK_CENTRAL_REST_API,
  // withCredentials: true,
  headers: {
    Authorization: getTokenFormLocal(),
  },
});

export const templateAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TEMPLATE_REST_API,
  headers: {
    Authorization: API_KEY,
  },
});

export const attributeAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ATTRIBUTE_REST_API,
  headers: {
    Authorization: API_KEY,
  },
});

export const getAllTags = async () => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_KEYWORDS_REST_API as string,
      {
        query: `query GetAllKeywords {
                getAllKeywords {
                  keywordId
                  keyword
                  keywordTitle
                  description
                  relatedKeywordId
               
                }
              }`,
        // variables: {
        //   input: {},
        // },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data?.getAllKeywords;
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error;
  }
};

export const createTags = async (
  id: string | null,
  label: string,
  keyword: string,
  defination: string
) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_KEYWORDS_REST_API as string,
      {
        query: `mutation CreateSocialwellKeywordRegister(
                $input: CreateSocialwellKeywordRegisterInput!
              ) {
                createSocialwellKeywordRegister(input: $input) {
                  keywordId
                }
              }`,
        variables: {
          input: {
            keywordDetails: [
              {
                label,
                keyword,
                language: "en",
                defination,
              },
            ],
            relatedKeywordId: id,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error;
  }
};

export const updateTags = async (
  id: string,
  keywordDetailsId: string,
  label: string,
  keyword: string,
  defination: string
) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_KEYWORDS_REST_API as string,
      {
        query: `mutation UpdateSocialwellKeywordRegister(
                $input: UpdateSocialwellKeywordRegisterInput!
              ) {
                updateSocialwellKeywordRegister(input: $input) {
                  keywordId
                }
              }`,
        variables: {
          input: {
            keywordId: id,
            keywordDetails: {
              keywordDetailsId: keywordDetailsId,
              label,
              keyword,
              defination,
              language: "en",
            },
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error;
  }
};
