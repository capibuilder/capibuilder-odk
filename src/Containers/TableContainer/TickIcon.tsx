const TickIcon: React.FC = () => {
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_376_831)">
        <path
          d="M2 11.2308L7.19231 17L17 2"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_376_831"
          x="0"
          y="0.499817"
          width="19.0001"
          height="19.0002"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.5" />
          <feGaussianBlur stdDeviation="0.25" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_376_831"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_376_831"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
export default TickIcon;
