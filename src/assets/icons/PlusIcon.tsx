export default function PlusIcon({
  size = "60",
  color = "#667080",
}: {
  size?: string;
  color?: string;
}) {
  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 12.5V47.5"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 30H47.5"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
