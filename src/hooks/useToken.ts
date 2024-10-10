/**
 * This function returns the token stored in the "auth" key of the localStorage object, parsed as a
 * JSON object.
 * @returns The function `useToken` returns an object with a `token` property. The value of the `token`
 * property is obtained by parsing the `auth` item from the `localStorage` object using `JSON.parse()`.
 * If the `auth` item is not found in the `localStorage` object, an empty object with a `token`
 * property is returned.
 */
export default function useToken() {
  return { token: JSON.parse(localStorage.getItem("auth") ?? "{}").token };
}
