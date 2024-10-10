import { DesignSurvey } from "@/Containers";
import ProtectedRoute from "@/utils/ProtectedRoute";

const DesignSurveyPage = () => {
  return (
    <ProtectedRoute>
      <DesignSurvey />
    </ProtectedRoute>
  );
};

export default DesignSurveyPage;
