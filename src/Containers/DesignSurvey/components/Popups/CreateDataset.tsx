import { CloseIcon } from "@/assets";
import useSurveyStore from "@/context/surveyStores";
import { useToken } from "@/hooks";
import useInputFocus from "@/hooks/useInputFocus";
import { ModelWrapper } from "@/styles/globals";
import { odkAxios } from "@/utils/useAxios";
import { useRouter } from "next/router";
import { useState } from "react";
import { CloseButton, Flex, FormControl } from "socialwell-design";
import { Button, Form, Overlay, SurveyModelContainer } from "./styles";

interface datasetsResponse {
  name: string;
  createdAt: string;
  projectId: number;
  approvalRequired: boolean;
}

const SurveyModel = ({ handleClose }: { handleClose: () => void }) => {
  const [Error, setError] = useState({ feild: "", message: "" });
  const addData = useSurveyStore(state => state.addData);
  const { token } = useToken();
  const { query } = useRouter();
  const projectId = query.projectid as string;

  const [detail, setDetail] = useState({
    datasetName: "",
  });

  const focusInputRef = useInputFocus();

  const fetchExistingDatasets = async () => {
    return odkAxios
      .get(`/v1/projects/${projectId}/datasets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        return {
          error: false,
          list: data?.map((e: datasetsResponse) => e.name),
        };
      })
      .catch(() => {
        return { error: true, list: [] };
      });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (detail.datasetName === "") {
      return setError({
        feild: "datasetName",
        message: "Dataset name is required !",
      });
    }

    const { error, list } = await fetchExistingDatasets();

    if (error) {
      return setError({
        feild: "datasetName",
        message: "Something went wrong!",
      });
    }
    if (list.includes(detail.datasetName)) {
      return setError({
        feild: "datasetName",
        message: "A dataset with the same name exists in the same project !",
      });
    }

    addData({ entity: { datasetName: detail.datasetName } });
    return handleClose();
  };

  return (
    <SurveyModelContainer>
      <Overlay onClick={handleClose} />
      <ModelWrapper data-animate="opacity" className="cont">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          className="head"
        >
          <h2>Create Dataset</h2>
          <div className="close-btn">
            <CloseButton onClick={handleClose} icon={<CloseIcon />} />
          </div>
        </Flex>
        <hr />

        <Form onSubmit={handleSubmit}>
          <div>
            <FormControl
              ref={focusInputRef}
              inputType="text"
              label="Dataset Name"
              name="datasetname"
              onChange={e => {
                setError({ feild: "", message: "" });
                setDetail({
                  datasetName: e.target.value,
                });
              }}
              placeholder="Enter dataset name"
              value={detail.datasetName}
            />
            {Error.feild === "datasetName" && (
              <span className="error">{Error.message}</span>
            )}
          </div>
          <Button disabled={Error.feild !== ""} type="submit">
            Create Dataset
          </Button>
        </Form>
      </ModelWrapper>
    </SurveyModelContainer>
  );
};

export default SurveyModel;
