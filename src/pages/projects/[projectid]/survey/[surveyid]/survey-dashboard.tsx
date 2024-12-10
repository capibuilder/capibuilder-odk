import { SurveyDashboard } from "@/Containers";
import ProtectedRoute from "@/utils/ProtectedRoute";

const SurveyDashboardView = ({ surveyId }: any) => {
  return (
    <ProtectedRoute>
      <SurveyDashboard slug={surveyId} isDraft={false} />
    </ProtectedRoute>
  );
};

export const getServerSideProps = async (context: any) => {
  const { surveyid } = context.params;
  return {
    props: {
      surveyId: surveyid || null,
    },
  };
};

export default SurveyDashboardView;
