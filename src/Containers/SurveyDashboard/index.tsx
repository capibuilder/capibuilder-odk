import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import { SurveyDashboardContainer, Wrapper } from "./styles";

interface SurveyDashboardProps {
  slug: string;
}

const SurveyDashboard = ({ slug }: SurveyDashboardProps) => {
  const router = useRouter();
  const surveyName = (router.query.name as string) || "Loading...";
  const projectId = router.query.projectid || "13";

  return (
    <SurveyDashboardContainer>
      <Wrapper>
        <div className="header-container">
          <Link href={`/projects/${projectId}/survey`} className="back-link">
            <IoIosArrowBack size={20} />
            <span>Back to Project</span>
          </Link>
          <div className="heading">{surveyName} Dashboard</div>
        </div>
      </Wrapper>
    </SurveyDashboardContainer>
  );
};

export default SurveyDashboard;
