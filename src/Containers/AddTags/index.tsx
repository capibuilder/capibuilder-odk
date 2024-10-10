import { PrimaryButton } from "@/components";
import { attributeAxios } from "@/utils/useAxios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useReducer, useState } from "react";
import {
  Flex,
  FormContainer,
  FormControl,
  FormHeader,
  useAlert,
} from "socialwell-design";
import { AddTagsContainer, Container, Wrapper } from "./styles";

type ReducerStateProps = {
  formInfo: boolean;
};

type ReducerActionProps = {
  type: string;
};

const reducer = (state: ReducerStateProps, action: ReducerActionProps) => {
  switch (action.type) {
    case "formInfo":
      return { ...state, formInfo: !state.formInfo };
    default:
      return state;
  }
};

const AddTags = () => {
  const [state] = useReducer(reducer, {
    formInfo: true,
  });
  const progressData = [
    { title: "Data Attribute Information", isActive: state.formInfo },
  ];

  return (
    <AddTagsContainer>
      <FormHeader
        {...{ progressData }}
        offsetTop="0"
        title="Add Data Attribute"
        backgroundColor="#C087AC"
      />
      <Wrapper>
        <TagsInfo />
      </Wrapper>
    </AddTagsContainer>
  );
};

const TagsInfo = () => {
  const [data, setData] = useState({
    tag: "",
    label: "",
    definition: "",
  });
  const { setAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    setLoading(true);

    if (data.tag === "" || data.label === "" || data.definition === "") {
      setLoading(false);
      setAlert({
        title: "Error",
        text: "Please fill all the fields",
        state: "error",
        show: true,
      });
      return;
    }

    if (data.tag.includes(" ")) {
      setLoading(false);
      setAlert({
        title: "Error",
        text: "Data Attribute name should not contain spaces",
        state: "error",
        show: true,
      });
      return;
    }

    attributeAxios
      .post("/createAttribute", data)
      .then(() => {
        setAlert({
          title: "Success",
          text: "Data Attribute added successfully",
          state: "success",
          show: true,
        });
        router.push("/tags");
      })
      .catch(err => {
        setAlert({
          title: "Error",
          text: err.message,
          state: "error",
          show: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <FormContainer title="information">
      <Head>
        <title>Add Tags</title>
      </Head>
      <Container>
        <Flex>
          <FormControl
            inputType="text"
            label="Data Attribute Label"
            name="tagName"
            value={data.label}
            onChange={e => setData({ ...data, label: e.target.value })}
            placeholder="Enter Label"
          />
          <FormControl
            inputType="text"
            label="Data Attribute"
            name="tagName"
            value={data.tag}
            onChange={e => setData({ ...data, tag: e.target.value })}
            placeholder="Enter Data Attribute"
          />
        </Flex>
        <Flex margin="16px 0">
          <FormControl
            inputType="textarea"
            label="Defination"
            name="definition"
            value={data.definition}
            onChange={e => setData({ ...data, definition: e.target.value })}
            placeholder="Enter Defination"
          />
        </Flex>
        <Flex margin="24px 0" justifyContent="flex-end">
          <PrimaryButton
            name="Submit"
            onClick={handleSubmit}
            loading={loading}
          />
        </Flex>
      </Container>
    </FormContainer>
  );
};

export default AddTags;
