export function Trimmer(str: string, length: number) {
  if (str.length > length) {
    return str.slice(0, length) + "...";
  }
  return str;
}
