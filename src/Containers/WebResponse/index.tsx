import { ODK_CENTRAL_REST_API } from "@/config";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";

export default function Index() {
  const { query } = useRouter();

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
  }, []);

  return (
    <>
      <FormIframe
        src={`${ODK_CENTRAL_REST_API}/-/single/${query.formId}?st=${query.st}`}
      ></FormIframe>
    </>
  );
}

export const FormIframe = styled.iframe`
  width: 100%;
  height: 100vh;
`;
