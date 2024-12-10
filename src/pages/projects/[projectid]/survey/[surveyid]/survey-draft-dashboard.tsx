import { SurveyDashboard } from "@/Containers";
import ProtectedRoute from "@/utils/ProtectedRoute";

const SurveyDraftDashboardView = ({ surveyId }: any) => {
  return (
    <ProtectedRoute>
      <SurveyDashboard slug={surveyId} isDraft={true} />
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

export default SurveyDraftDashboardView;
