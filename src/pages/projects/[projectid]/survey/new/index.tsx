import { CreateSurvey } from "@/Containers";
import ProtectedRoute from "@/utils/ProtectedRoute";

const CreateSurveyPage = () => {
  return (
    <ProtectedRoute>
      <CreateSurvey />
    </ProtectedRoute>
  );
};

export default CreateSurveyPage;
