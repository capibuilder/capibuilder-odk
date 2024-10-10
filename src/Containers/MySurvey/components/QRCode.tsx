import { LoadingBlock } from "@/components";
import { useToken } from "@/hooks";
import useKeyPress from "@/hooks/useKeyPress";
import { FormResponse } from "@/interfaces/form";
import { handleQRForPublished, qrSettings } from "@/utils/generateQrCode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, useAlert } from "socialwell-design";
import styled from "styled-components";

interface props {
  onClose: () => void;
  data: FormResponse;
}

export default function QRCode({ data, onClose }: props) {
  const { query } = useRouter();
  const projectId = query.projectid as string;
  const [qrData, setQrData] = useState("");
  const { token } = useToken();
  const { setAlert } = useAlert();

  useKeyPress("Escape", () => {
    onClose();
  });

  useEffect(() => {
    if (data.publishedAt) {
      handleQRForPublished({
        xmlFormId: data.xmlFormId,
        name: data.name,
        projectId,
        token,
      }).then(s => {
        if (s.data) {
          setQrData(s.data);
        }
      });
    } else {
      qrSettings(data.xmlFormId, data.draftToken!, data.name!, projectId)
        .then(res => {
          setQrData(res!);
        })
        .catch(() => {
          setAlert({
            show: true,
            state: "error",
            text: "Error, Try again!",
            title: "",
          });
        });
    }
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
          <LoadingBlock style={{ height: "255px" }} />
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
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
