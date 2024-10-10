import { getCache, setCache } from "./cache";

/**
 * The function `getCachedPublicLink` retrieves a cached public link based on a given form ID.
 * @param {string} formId - The `formId` parameter is a string that represents the unique identifier of
 * a form.
 * @returns The function `getCachedPublicLink` returns a `DataItem` object that matches the provided
 * `formId` parameter. If no matching object is found, it returns `null`.
 */
export function getCachedPublickLink(formId: string) {
  const cachedValues: DataItem[] = getCache("publicLinks") || [];
  return cachedValues.find(data => data.formId === formId) || null;
}

/**
 * The function `deleteCachedPublicLink` deletes a cached public link based on the provided form ID.
 * @param {string} formId - The `formId` parameter is a string that represents the unique identifier of
 * a form.
 */
export function deleteCachedPublickLink(formId: string) {
  const cachedValues: DataItem[] = getCache("publicLinks") || [];

  const cleanValues = cachedValues.filter(data => data.formId !== formId);

  setCache("publicLinks", cleanValues);
}

/**
 * The function `cachePublickLink` caches a public link by storing the formId, enketoId, and token in a
 * cache.
 * @param {string} formId - A string representing the ID of the form.
 * @param {string} enketoId - The `enketoId` parameter is a string that represents the unique
 * identifier for an Enketo form. Enketo is an open-source form engine that allows users to create and
 * fill out forms offline. The `enketoId` is used to identify a specific form in the Enketo
 * @param {string} token - The `token` parameter is a string that represents a unique identifier for
 * the public link. It is used to authenticate and authorize access to the form associated with the
 * public link.
 */
export function cachePublickLink(
  formId: string,
  enketoId: string,
  token: string
) {
  const PrevValues: [] = getCache("publicLinks");

  const cleanValues = removeDuplicates([
    ...(PrevValues || []),
    {
      formId: formId,
      enketoId,
      token,
    },
  ]);

  setCache("publicLinks", cleanValues);
}

interface DataItem {
  formId: string;
  enketoId: string;
  token: string;
}

/**
 * The function removes duplicate items from an array based on a specific identifier.
 * @param {DataItem[]} data - The `data` parameter is an array of `DataItem` objects.
 * @returns The function `removeDuplicates` returns an array of `DataItem` objects without any
 * duplicates.
 */
function removeDuplicates(data: DataItem[]): DataItem[] {
  const uniqueData: DataItem[] = [];
  const seen: Set<string> = new Set();

  for (const item of data) {
    const identifier = `${item.formId}`;

    if (!seen.has(identifier)) {
      uniqueData.push(item);
      seen.add(identifier);
    }
  }

  return uniqueData;
}
