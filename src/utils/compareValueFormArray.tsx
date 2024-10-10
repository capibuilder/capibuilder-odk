/**
 * This is a TypeScript function that compares a string value with an array of strings and returns a
 * boolean indicating whether the string is present in the array.
 * @param {string} string - A string value that will be compared to the values in the array.
 * @param {string[]} array - The `array` parameter is an array of strings that will be searched for a
 * match with the `string` parameter.
 * @returns A boolean value is being returned.
 */
export const compareValueFormArray = (
  string: string,
  array: string[]
): boolean => {
  let result = false;
  array.forEach(item => {
    if (item.toLowerCase() === string.toLowerCase()) {
      result = true;
    }
  });
  return result;
};
