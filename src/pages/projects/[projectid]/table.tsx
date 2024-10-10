import { Loading } from "@/components";
import ErrorPage from "@/components/Error";
import PivotTable from "@/components/PivotTable";
import ProtectedRoute from "@/utils/ProtectedRoute";
import { getTokenFormLocal } from "@/utils/useAxios";
import axios from "axios";
import { useEffect, useState } from "react";
import { TbFaceIdError } from "react-icons/tb";

// https://www.socialwell.in/swd-pivotapi/projects
// https://www.socialwell.in/swd-pivotapi/forms/4
// https://www.socialwell.in/swd-pivotapi/submissions/4/1.4.8

const ReportView = ({ query }: { query: any }) => {
  const [data, setData] = useState<any>({
    data: [],
    colData: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/get-pivot-data-v3",
        {
          projectId: query.projectid,
        },
        {
          headers: {
            Authorization: getTokenFormLocal(),
          },
        }
      );

      setData(res.data);
    } catch (error: any) {
      console.error("Error >> ", error.response.data);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProtectedRoute>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorPage
          message="An error while loading this resource"
          icon={<TbFaceIdError size={50} />}
        />
      ) : (
        <>
          <PivotTable {...{ data }} showBackBtn />
        </>
      )}
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

export default ReportView;
