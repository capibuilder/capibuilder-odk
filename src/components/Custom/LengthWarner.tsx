export default function LengthWarner({
  allowedLength,
  text,
  input,
}: {
  text: string;
  input?: string;
  allowedLength: number;
}) {
  if (text.length < allowedLength) return null;

  return (
    <p style={{ fontSize: "14px" }} className="error">
      The {input || "input"} is too long; keep it under {allowedLength}{" "}
      characters.
    </p>
  );
}
