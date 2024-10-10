import { Loading } from "@/components";
import PivotTable from "@/components/PivotTable";
import ProtectedRoute from "@/utils/ProtectedRoute";
import axios from "axios";
import { useEffect, useState } from "react";

// https://www.socialwell.in/swd-pivotapi/projects
// https://www.socialwell.in/swd-pivotapi/forms/4
// https://www.socialwell.in/swd-pivotapi/submissions/4/1.4.8

const ReportView = () => {
  const [data, setData] = useState<any>({
    data: [],
    colData: [],
  });

  useEffect(() => {
    const pivotData = sessionStorage.getItem("pivotData");
    const projectId = "34";

    if (!pivotData) {
      (async () => {
        const res = await axios.post("/api/get-pivot-data-v3", {
          projectId,
        });

        // sessionStorage.setItem("pivotData", JSON.stringify(res.data));
        setData(res.data);
      })();
      return;
    }

    const jsonData = JSON.parse(pivotData || "[]");

    setData(jsonData);
  }, []);

  return (
    <ProtectedRoute>
      {!!data.colData.length && !!data.data.length ? (
        <PivotTable {...{ data }} />
      ) : (
        <Loading />
      )}
    </ProtectedRoute>
  );
};

export default ReportView;
