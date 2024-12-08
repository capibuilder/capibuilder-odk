import { Loading, LoadingBlock } from "@/components";
import ProtectedRoute from "@/utils/ProtectedRoute";
import { getTokenFormLocal } from "@/utils/useAxios";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Flex } from "socialwell-design";

const OdkTable = dynamic(() => import("@/components/ag-grid/OdkTable"), {
  loading() {
    return <LoadingBlock />;
  },
});

const ProjectView = ({ query }: { query: any }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    colDefData: [],
    tableData: [],
  });

  

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(
          "/api/get-coldef-data-draft",
          {
            projectId: query.projectid,
            formId: `${query.surveyid}`,
          },
          {
            headers: {
              Authorization: getTokenFormLocal(),
            },
          }
        );

        setData(res.data);
      } catch (error: any) {
        console.error("Error Response >> ", error.response.data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <ProtectedRoute>
      <Flex>
        <div style={{ width: "100%" }}>
          {loading ? <Loading /> : <OdkTable data={data} />}
        </div>
      </Flex>
    </ProtectedRoute>
  );
};

export async function getServerSideProps(context: any) {
  return {
    props: {
      query: context.params,
    },
  };
}

export default ProjectView;
