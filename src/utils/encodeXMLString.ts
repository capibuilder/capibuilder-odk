export function encodeXMLString(input: string): string {
  return input.replaceAll("&", "&amp;");
  // .replaceAll("<", "&lt;")
  // .replaceAll(">", "&gt;")
  // .replaceAll('"', "&quot;");
}

export const specialXMLCharators = ["&"];
// export const specialXMLCharators = ["&", "<", ">", "'", '"'];
