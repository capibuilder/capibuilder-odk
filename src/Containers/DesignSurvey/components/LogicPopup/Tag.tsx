import styled from "styled-components";

interface props {
  text: "IF" | "THEN" | "AND" | "OR";
}

export default function Tag({ text }: props) {
  return (
    <TagWrapper
      style={{
        background:
          text === "OR" ? "#7FBFFF" : text === "AND" ? "#F7CB70" : "#a4a4a4",
      }}
    >
      {text} {text === "AND" ? upDown : text === "OR" ? upDown : <></>}
    </TagWrapper>
  );
}

const TagWrapper = styled.span`
  display: block;
  padding: 10px 0;

  width: 110px;

  display: flex;
  align-items: center;
  gap: 20px;
  border-radius: 5px;
  color: #fff;
  font-weight: 600;
  justify-content: center;
`;

const upDown = (
  <svg
    width="11"
    height="20"
    viewBox="0 0 11 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.40138 4.2875L9.05693 8.25L10.6887 6.48125L5.40138 0.75L0.114105 6.48125L1.74584 8.25L5.40138 4.2875ZM5.40138 19.7125L1.74584 15.75L0.114105 17.5188L5.40138 23.25L10.6887 17.5188L9.05693 15.75L5.40138 19.7125Z"
      fill="white"
    />
  </svg>
);
