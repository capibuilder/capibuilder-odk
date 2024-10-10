import { useEffect, useState } from "react";

interface FetchDataOptions {
  method?: string;
  authToken?: string;
  body?: object;
}

interface FetchDataResult<T> {
  data: T | null;
  loading: boolean;
}

/**
 * This is a TypeScript function that fetches data from a specified URL and returns the data and
 * loading status.
 * @param {string} url - The URL of the API endpoint to fetch data from.
 * @param {FetchDataOptions} [options] - Optional object containing additional options for the fetch
 * request, including method (default is "GET"), authToken (default is null), and body (default is
 * null).
 * @returns The `useFetchData` function returns an object with two properties: `data` and `loading`.
 * The `data` property is of type `T | null`, which is the generic type parameter passed to the
 * function, and represents the data fetched from the specified URL. The `loading` property is of type
 * `boolean` and indicates whether the data is currently being fetched or not.
 */
const useFetchData = <T>(
  url: string,
  options?: FetchDataOptions
): FetchDataResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const { method = "GET", authToken = null, body = null } = options || {};

        let requestOptions: RequestInit = {
          method,
          headers: {},
          body: null,
        };

        if (authToken) {
          requestOptions = {
            method,
            headers: {
              Authorization: authToken,
            },
            body: null,
          };
        }

        if (body) {
          requestOptions = {
            ...requestOptions,
            method,
            body: JSON.stringify(body),
          };
        }

        const response = await fetch(url, requestOptions);
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading };
};

export default useFetchData;
