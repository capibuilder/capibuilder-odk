import TemplatePreview from "@/Containers/TemplatePreview";
import React from "react";

const Preview = ({ id }: any) => {
  return <TemplatePreview {...{ id }} />;
};

export const getServerSideProps = async (context: any) => {
  const { id } = context.params;
  return {
    props: {
      id,
    },
  };
};

export default Preview;
