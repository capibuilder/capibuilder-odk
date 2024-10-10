import { MySurvey } from "@/Containers";
import ProtectedRoute from "@/utils/ProtectedRoute";

const MySurveysPage = () => {
  return (
    <ProtectedRoute>
      <MySurvey />
    </ProtectedRoute>
  );
};

export default MySurveysPage;
