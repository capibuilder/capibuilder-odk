import { Templates } from "@/Containers";
import ProtectedRoute from "@/utils/ProtectedRoute";

const CreateSurveyPage = () => {
  return (
    <ProtectedRoute>
      <Templates />
    </ProtectedRoute>
  );
};

export default CreateSurveyPage;
