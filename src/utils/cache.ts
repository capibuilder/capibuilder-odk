/**
 * The function `setCache` takes a key and a value, serializes the value into a JSON string, and stores
 * it in the browser's local storage.
 * @param {string} key - A string representing the key under which the value will be stored in the
 * cache. This key is used to retrieve the value later.
 * @param {any} value - The value parameter can be any data type, such as a string, number, boolean,
 * object, or array.
 */
export function setCache(key: string, value: any): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error setting cache:", error);
  }
}

/**
 * The function `getCache` retrieves a value from the browser's local storage using a specified key and
 * returns it as a deserialized object, or null if the key does not exist or an error occurs.
 * @param {string} key - The `key` parameter is a string that represents the key used to retrieve the
 * value from the cache.
 * @returns The function `getCache` returns either the deserialized value from the localStorage with
 * the given key, or `null` if the value is not found or if there is an error during the
 * deserialization process.
 */
export function getCache(key: string): any | null {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error("Error getting cache:", error);
    return null;
  }
}

/**
 * The function `deleteCache` removes an item from the local storage based on the provided key.
 * @param {string} key - The `key` parameter is a string that represents the key of the item to be
 * removed from the localStorage.
 */
export function deleteCache(key: string): any | null {
  localStorage.removeItem(key);
}
