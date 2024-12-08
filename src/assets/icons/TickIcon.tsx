import React from "react";

const TickIcon = ({ size = "82" }: { size?: string }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 82 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.4609 59.7891C28.5234 60.7266 27.1953 61.5078 26.0234 61.5078C24.8516 61.5078 23.5234 60.6875 22.5469 59.75L0.671875 37.875L7.625 30.9219L26.0625 49.3594L74.8125 0.257812L81.6484 7.32812L29.4609 59.7891Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default TickIcon;
