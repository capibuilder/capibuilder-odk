import Link from "next/link";
import { Content, Wrapper } from "./styles";

const Error404Page = () => {
  return (
    <Wrapper>
      <Content>
        <h1>
          <span>Oops!</span> Page not found
        </h1>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <Link href="/">go back to Home</Link>
      </Content>
    </Wrapper>
  );
};

export default Error404Page;
