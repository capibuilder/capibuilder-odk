import GetComponents from "@/components/Dashboard/GetComponents";
import useToken from "@/hooks/useToken";
import { FormResponse } from "@/interfaces/form";
import { odkAxios } from "@/utils/useAxios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaComments } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineAssessment } from "react-icons/md";
import { TbFileImport } from "react-icons/tb";
import styled, { css } from "styled-components";
import { SurveyDashboardContainer, Wrapper } from "./styles";

interface SurveyDashboardProps {
  slug: string;
  isDraft: boolean;
}

const SurveyDashboard = ({ slug, isDraft }: SurveyDashboardProps) => {
  const router = useRouter();
  const { token } = useToken();
  const [surveyData, setSurveyData] = useState<FormResponse | null>(null);
  const projectId = router.query.projectid || "13";

  const dashboardData = {
    title: isDraft ? "Draft Development" : "Development",
    description: isDraft
      ? "This is the draft dashboard"
      : "This is the development dashboard",
    componentTypes: [
      {
        id: "1",
        columns: "4",
        components: [
          {
            id: "1",
            type: "card",
            tag: "#totalSubmissions",
            title: "Survey Submissions",
            icon: TbFileImport,
            isDraft,
          },
          ...(isDraft
            ? []
            : [
                {
                  id: "2",
                  type: "card",
                  tag: "#totalComments",
                  title: "Submission Comments",
                  icon: FaComments,
                  isDraft,
                },
                {
                  id: "3",
                  type: "card",
                  tag: "#totalAudits",
                  title: "Audits Available",
                  icon: MdOutlineAssessment,
                  isDraft,
                },
                {
                  id: "4",
                  type: "card",
                  tag: "#totalEnumerators",
                  title: "Enumerators",
                  icon: HiUsers,
                  isDraft,
                },
              ]),
        ],
      },
    ],
  };

  const [componentData, setComponentData] = useState<any>(dashboardData);

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const response = await odkAxios.get(
          `/v1/projects/${projectId}/forms/${slug}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSurveyData(response.data);
      } catch (error) {
        console.error("Error fetching survey data:", error);
      }
    };

    fetchSurveyData();
  }, [slug, token, projectId]);

  return (
    <SurveyDashboardContainer>
      <Wrapper>
        <div className="header-container">
          <Link href={`/projects/${projectId}/survey`} className="back-link">
            <IoIosArrowBack size={20} />
            <span>Back to Survey</span>
          </Link>
          <div className="heading">
            {surveyData?.name || "Loading..."} Dashboard
          </div>
        </div>

        <ComponentContent readOnly className="c-scrollbar">
          {componentData.componentTypes.map((v: any) => (
            <ComponentItem key={v.id} column={v.columns}>
              {v.components.map((component: any) => (
                <GetComponents
                  key={component.id}
                  component={component}
                  columnId={v.id}
                  column={v.columns}
                />
              ))}
            </ComponentItem>
          ))}
        </ComponentContent>
      </Wrapper>
    </SurveyDashboardContainer>
  );
};

const ComponentContent = styled.div<{
  readOnly?: boolean;
}>`
  overflow-y: auto;
  max-height: calc(100vh - 119px);
  position: relative;
  padding-block-start: 20px;
  display: grid;
  gap: 20px;

  ${props =>
    props.readOnly &&
    css`
      max-height: unset;
      overflow: unset;
      padding-block: 20px;
    `}
`;

const ComponentItem = styled.div<{
  column: string;
  currentColumn?: boolean;
}>`
  width: 98%;
  margin-inline: auto;
  height: max-content;
  display: grid;
  grid-template-columns: repeat(${props => props.column}, 1fr);
  grid-auto-rows: min-content;
  grid-gap: 20px;
  align-items: flex-start;
  border: 3px solid transparent;
  position: relative;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }

  ${props =>
    props.currentColumn &&
    css`
      border: 3px solid lightgray;
      border-radius: 5px;
    `}

  .component-btn {
    position: absolute;
    line-height: 0;
    width: 18px;
    height: 18px;
    display: grid;
    place-content: center;
    background-color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: var(--primary-color);
      color: #fff;
    }

    &.up {
      top: calc(44% - 10px);
      right: -10px;

      &:disabled {
        background-color: #fff;
        color: lightslategray;
        cursor: not-allowed;
      }
    }

    &.down {
      bottom: calc(44% - 10px);
      right: -10px;
    }

    &.drag {
      top: -8px;
      right: -8px;
      cursor: grab;
    }
  }
`;

export default SurveyDashboard;
