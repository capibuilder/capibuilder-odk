import { CloseIcon, PlusIcon } from "@/assets";
import useToken from "@/hooks/useToken";
import { ModelWrapper } from "@/styles/globals";
import { odkAxios } from "@/utils/useAxios";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { CloseButton, Flex, useAlert } from "socialwell-design";
import { Overlay, SurveyModelContainer, UploadDropZone } from "./styles";

const SurveyModel = ({ handleClose }: { handleClose: () => void }) => {
  const [loading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { setAlert } = useAlert();
  const { token } = useToken();
  const FileType =
    file?.type === "text/xml"
      ? "application/xml"
      : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  const { query } = useRouter();
  const projectId = query.projectid;

  const { push } = useRouter();

  const handleUpload = () => {
    if (!file) return;

    setIsLoading(true);

    const fileData = new Blob([file]);

    odkAxios
      .post(`/v1/projects/${projectId}/forms?ignoreWarnings=true`, fileData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": FileType,
          "X-XlsForm-FormId-Fallback": file?.name.replace(".xlsx", "") || "",
        },
      })
      .then(v => {
        setAlert({
          show: true,
          state: "success",
          text: `${
            v.data.xmlFormId ? v.data.xmlFormId : "Form"
          } created successfully`,
          title: "Form Created",
        });
        push(`/projects/${projectId}/survey`);
      })
      .catch(error => {
        if (error.request.statusText === "Conflict") {
          setAlert({
            show: true,
            state: "error",
            text: "Form already exists",
            title: "Request Failed",
          });

          return;
        }

        setAlert({
          show: true,
          state: "error",
          text: error.response.data.message || "Something went wrong",
          title: "Request Failed",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    file && handleUpload();
  }, [file]);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <SurveyModelContainer>
      <Overlay onClick={handleClose} />
      <ModelWrapper data-animate="opacity">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          className="head"
        >
          <h2>Import form</h2>
          <div className="close-btn">
            <CloseButton onClick={handleClose} icon={<CloseIcon />} />
          </div>
        </Flex>
        <hr />
        <UploadDropZone>
          <span>
            {loading ? (
              <span>
                <img src="/loading.svg" alt="" />
                <center>Uploading</center>
              </span>
            ) : file ? (
              file.name
            ) : (
              <span>
                <PlusIcon /> Drop a file here, or Select file to upload.
              </span>
            )}
          </span>
          <input
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/xml"
            type="file"
            multiple={false}
            onChange={handleFile}
          />
        </UploadDropZone>
      </ModelWrapper>
    </SurveyModelContainer>
  );
};

export default SurveyModel;
