import { SurveyResponse } from "@/Containers";
import ProtectedRoute from "@/utils/ProtectedRoute";

const SurveyResponseView = ({ slug }: any) => {
  return (
    <ProtectedRoute>
      <SurveyResponse {...{ slug }} />
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

export default SurveyResponseView;
