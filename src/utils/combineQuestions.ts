/**
 * The function combines an array of objects' options into a single array.
 * @param {any[]} input - An array of objects, where each object has a property called "options" which
 * is an array of options.
 * @returns The function `combineQuestion` is returning an array that contains all the options from the
 * input array of objects. It is using the `reduce` method to iterate over the input array and
 * concatenate the options from each object into a single array.
 */
export function combineQuestion(input: any[]) {
  return input.reduce((options, obj) => {
    const objOptions: any = obj.options.map((option: any) => option);
    return options.concat(objOptions);
  }, []);
}
