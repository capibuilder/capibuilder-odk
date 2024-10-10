export function sortByCreatedAt(arr: any[]) {
  return arr.sort((a, b) => {
    const dateA = Date.parse(a.createdAt);
    const dateB = Date.parse(b.createdAt);
    return dateB - dateA;
  });
}
