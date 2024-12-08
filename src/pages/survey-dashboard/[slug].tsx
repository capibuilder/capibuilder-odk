import { SurveyDashboard } from "@/Containers";
import ProtectedRoute from "@/utils/ProtectedRoute";

const SurveyDashboardView = ({ slug }: any) => {
  return (
    <ProtectedRoute>
      <SurveyDashboard {...{ slug }} />
    </ProtectedRoute>
  );
};

export const getServerSideProps = async (context: any) => {
  const { slug } = context.params;
  return {
    props: {
      slug,
    },
  };
};

export default SurveyDashboardView;
