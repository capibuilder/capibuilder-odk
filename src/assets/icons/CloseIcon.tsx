import React from "react";

const CloseIcon = ({ size = "48" }: { size?: string }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.8 24L39.4 11.4C40.2 10.6 40.2 9.4 39.4 8.6C38.6 7.8 37.4 7.8 36.6 8.6L24 21.2L11.4 8.6C10.6 7.8 9.4 7.8 8.6 8.6C7.8 9.4 7.8 10.6 8.6 11.4L21.2 24L8.6 36.6C8.2 37 8 37.4 8 38C8 39.2 8.8 40 10 40C10.6 40 11 39.8 11.4 39.4L24 26.8L36.6 39.4C37 39.8 37.4 40 38 40C38.6 40 39 39.8 39.4 39.4C40.2 38.6 40.2 37.4 39.4 36.6L26.8 24Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CloseIcon;
