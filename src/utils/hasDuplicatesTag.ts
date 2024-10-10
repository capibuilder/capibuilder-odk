export function hasDuplicates(array: any[]): boolean {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i].dataAttribute === array[j].dataAttribute) {
        return true;
      }
    }
  }
  return false;
}
