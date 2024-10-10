import {
  LightText,
  RecentSurveyContainer,
  SurveyItem,
  SurveyItems,
  SurveyTitle,
  TitleContent,
  Wrapper,
} from "./styles";

import { Empty, Loading } from "@/components";
import authStore from "@/context/authStores";
import useToken from "@/hooks/useToken";
import { odkAxios } from "@/utils/useAxios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAlert } from "socialwell-design";

const RecentSurvey = () => {
  const [surveyData, setSurveyData] = useState([]);
  const { getProjectId } = authStore();
  const [loading, setLoading] = useState(true);
  const { setAlert } = useAlert();
  const { token } = useToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleRefresh = () => {
    if (getProjectId() === undefined) return;
    setLoading(true);
    odkAxios
      .get(`/v1/projects/${getProjectId()}/forms`, config)
      .then(e => {
        const surverys = e.data
          .slice(0, 3)
          .map((d: any) => ({
            id: d.xmlFormId,
            name: d.name,
            createdAt: new Date(d.createdAt).toLocaleDateString(),
            modifiedAt: new Date(d.updatedAt).toLocaleDateString(),
            questions: 0,
            time: 0,
            collectors: 0,
            tags: d.publishedAt === null ? "draft" : "published",
            isPublished: d.publishedAt === null ? false : true,
          }))
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        setSurveyData(surverys);
      })
      .catch(err => {
        setAlert({
          title: "Error",
          text: err.message,
          state: "error",
          show: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleRefresh();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handlePublish = async (id: string) => {
    try {
      await odkAxios.post(
        `/v1/projects/${getProjectId()}/forms/${id}/draft/publish`,
        {},
        config
      );

      const [projectsRes, appUserRes, appUserRoles] = await Promise.all([
        odkAxios.get(`/v1/projects/${getProjectId()}`, config),
        odkAxios.get(`/v1/projects/${getProjectId()}/app-users`, config),
        odkAxios.get(
          `/v1/projects/${getProjectId()}/assignments/forms/app-user`,
          config
        ),
      ]);

      // use object destructuring to extract the relevant data from appUserRes
      const user = appUserRes.data.find(
        (user: {
          projectId: number;
          id: number;
          type: string;
          displayName: string;
          createdAt: string;
          updatedAt: string;
          deletedAt: string;
          token: string;
        }) => user.token !== null
      );
      const formsByXmlFormId: {
        [key: string]: {
          xmlFormId: string;
          state: string;
          assignments: { actorId: number; roleId: number }[];
        };
      } = {};

      // create a map of xmlFormId to form object from appUserRoles
      appUserRoles.data.forEach(
        (data: { actorId: number; roleId: number; xmlFormId: string }) => {
          const { actorId, roleId, xmlFormId } = data;
          if (!formsByXmlFormId[xmlFormId]) {
            formsByXmlFormId[xmlFormId] = {
              xmlFormId,
              state: "open",
              assignments: [],
            };
          }
          formsByXmlFormId[xmlFormId].assignments.push({ actorId, roleId });
        }
      );

      // update the forms array based on surveyData
      const forms = surveyData.map((data: { xmlFormId: string }) => {
        const form = formsByXmlFormId[data.xmlFormId] || {
          xmlFormId: data.xmlFormId,
          state: "open",
          assignments: [],
        };
        if (form.xmlFormId === id) {
          form.assignments.push({ actorId: user.id, roleId: 2 });
        }
        return form;
      });

      const payload = {
        name: projectsRes.data.name,
        description: projectsRes.data.description,
        archived: projectsRes.data.archived,
        forms: forms,
      };

      await odkAxios.put(`/v1/projects/${getProjectId()}`, payload, config);

      handleRefresh();
    } catch (error) {}
  };

  const handleDelete = (id: string) => {
    odkAxios
      .delete(`/v1/projects/${getProjectId()}/forms/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // setResponses(e.data.value.length);
        handleRefresh();
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <RecentSurveyContainer>
      <Wrapper>
        <SurveyTitle>
          Recent Surveys - <Link href="/my-surveys">see all</Link>
        </SurveyTitle>
        <SurveyItems>
          {loading ? (
            <Loading />
          ) : (
            <>
              {surveyData.length === 0 && !loading ? (
                <Empty message="No recent surveys found" />
              ) : (
                surveyData.map((data, index) => (
                  <SurveyItemWrapper
                    data={data}
                    key={index}
                    {...{ handlePublish, handleDelete }}
                  />
                ))
              )}
            </>
          )}
        </SurveyItems>
        {/* <Pagination>
          <Content>Showing 3 of 3 surveys</Content>
        </Pagination> */}
      </Wrapper>
    </RecentSurveyContainer>
  );
};

const SurveyItemWrapper = ({
  data,
}: {
  data: any;
  handlePublish: any;
  handleDelete: any;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <SurveyItem data-animate="opacity">
      <TitleContent>
        <div className="content">
          <div className="title">{data.name}</div>
          <div className="light-text">created at {data.createdAt}</div>
          <div className="light-text">modified at {data.modifiedAt}</div>
          <div className={`tags tags--${data.tags}`}>{data.tags}</div>
        </div>
        <LightText>
          <span>{data.questions}</span>
          <span>questions</span>
        </LightText>
      </TitleContent>
      <LightText>
        <span>{data.time}</span>
        <span>Estimated time to complete</span>
      </LightText>
      <LightText>
        <span>{data.collectors}</span>
        <span>Collectors</span>
      </LightText>
    </SurveyItem>
  );
};

export default RecentSurvey;

// <RecentOptions>
// <Popover.Root open={open} onOpenChange={setOpen}>
//   <Popover.Trigger asChild>
//     <div className={open ? "active" : ""}>
//       <MenuIcon />
//     </div>
//   </Popover.Trigger>
//   <Popover.Portal>
//     <Popover.Content asChild>
//       {/* <Options>
//         {!data.isPublished && (
//           <>
//             <a
//               onClick={e => {
//                 e.preventDefault();
//                 handlePublish(data.id);
//                 setOpen(false);
//               }}
//               href="#"
//             >
//               publish
//             </a>
//           </>
//         )}
//         <Link href={`/survey-response/${data.id}`}>responses</Link>
//         <a
//           onClick={e => {
//             e.preventDefault();
//             handleDelete(data.id);
//           }}
//           href="#"
//         >
//           Delete
//         </a>
//       </Options> */}
//     </Popover.Content>
//   </Popover.Portal>
// </Popover.Root>
// </RecentOptions>
