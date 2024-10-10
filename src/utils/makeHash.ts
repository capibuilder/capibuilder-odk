import { createHash } from "crypto";

export function makeHash(input: string): string {
  if (!input) return "";

  const hash = createHash("sha256");
  hash.update(input);
  return hash.digest("base64");
}
