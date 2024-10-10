import { LoadingBlock } from "@/components";
import { useToken } from "@/hooks";
import useKeyPress from "@/hooks/useKeyPress";
import { SurveyInterface } from "@/interfaces";
import { qrSettings } from "@/utils/generateQrCode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "socialwell-design";
import styled from "styled-components";

interface props {
  onClose: () => void;
  data: SurveyInterface;
}

export default function QRCode({ data, onClose }: props) {
  const [qrData, setQrData] = useState("");
  const { token } = useToken();

  const { query } = useRouter();
  const projectId = query.projectid as string;

  useKeyPress("Escape", () => {
    onClose();
  });

  useEffect(() => {
    qrSettings(data.xmlFormId, data.draftToken!, data.title!, projectId)
      .then(res => {
        setQrData(res!);
      })
      .catch(() => {});
  }, [data]);

  return (
    <>
      <Wrapper data-animate="slideUp">
        <span>Scan QR code from ODK Collect App</span>
        <Button
          onClick={() => {
            onClose();
          }}
          name="Close"
          type="button"
          variant="outline"
        />
        {qrData ? (
          <div dangerouslySetInnerHTML={{ __html: qrData }} />
        ) : (
          <LoadingBlock />
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  z-index: 10;

  span {
    display: block;
    margin-bottom: 30px;
    font-weight: 500;
    font-size: 18px;
  }

  button {
    position: absolute;
    right: 30px;
    top: 30px;
    border-radius: 0;
  }

  img {
    display: block;
    margin: 0 auto;
  }

  position: fixed;
  left: 0;
  bottom: 0;
  height: calc(100vh - 0px);
  width: 100%;
  display: grid;
  place-content: center;
  background: #fff;
  z-index: 10;
`;
