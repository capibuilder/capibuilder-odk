import { Empty, LoadingBlock, Search, TableCover } from "@/components";
import ErrorPage from "@/components/Error";
import useToken from "@/hooks/useToken";
import { ProjectInterface } from "@/interfaces";
import { FormResponse } from "@/interfaces/form";
import { Trimmer } from "@/utils/Trimmer";
import { sortByCreatedAt } from "@/utils/sortForms";
import { odkAxios } from "@/utils/useAxios";
import { useWindowClick } from "@poiler/utils";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { FaUserAltSlash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { TbError404, TbFaceIdError } from "react-icons/tb";
import { Flex, ToolTips, Typography } from "socialwell-design";
import Row from "./components/Row";
import { Table, Wrapper } from "./styles";

export default function Index() {
  const [perPage, setPerPage] = useState(10);
  const { query, isReady } = useRouter();
  const [page, setPage] = useState(1);
  const [forms, setForms] = useState<FormResponse[]>([]);
  const [projectData, setProjectdata] = useState<ProjectInterface>();
  const projectId = query.projectid;
  const [error, setError] = useState<null | number>(null);
  const { token } = useToken();
  const [loading, setLoading] = useState(true);
  const [OpenSettingIndex, setOpenSettingIndex] = useState<null | number>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  useWindowClick(() => {
    setOpenSettingIndex(null);
  });

  const handleRefresh = async (isRefetching: boolean) => {
    try {
      setLoading(!isRefetching);

      const projectData = await odkAxios.get(`/v1/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjectdata(projectData.data);

      const forms = await odkAxios.get(`/v1/projects/${projectId}/forms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setForms(sortByCreatedAt(forms.data || []));
    } catch (error: any) {
      setError(error.response.status || 500);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (!projectId) return;
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_PIVOT_API_BASE_URL}/files/${projectId}?type=survey`
        );
        setFileNames(res.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      handleRefresh(false);
    }
  }, [isReady, projectId]);

  const filteredData: FormResponse[] = useMemo(() => {
    return query.q
      ? forms.filter(s =>
          s.name.toLowerCase().includes(String(query.q).toLowerCase())
        )
      : forms;
  }, [query.q, forms]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return filteredData.slice(start, end);
  }, [page, perPage, filteredData]);

  if (error) {
    return error === 403 ? (
      <ErrorPage
        message="You do not have permission to view this page."
        icon={<FaUserAltSlash size={60} />}
      />
    ) : error === 404 ? (
      <ErrorPage
        message="The page you are trying to access is unavailable."
        icon={<TbError404 size={80} />}
      />
    ) : (
      <ErrorPage
        message="An error while loading this resource"
        icon={<TbFaceIdError size={50} />}
      />
    );
  }

  return (
    <>
      <Wrapper>
        <Flex
          alignItems="center"
          gap="30px"
          className="header"
          justifyContent="space-between"
        >
          <Flex direction="column" alignItems="flex-start" gap="10px">
            <Typography
              content={Trimmer(projectData?.name || "Surveys", 60)}
              as="h2"
              weight="600"
            />
            <ToolTips
              text={projectData?.description || "No description available"}
              position="bottom"
            >
              <Typography
                content={projectData?.description || "No description available"}
                as="h4"
                weight="200"
                className="description-block"
              />
            </ToolTips>
          </Flex>

          <Search
            inputProps={{
              onFocus: () => {
                setPerPage(50);
              },
              onBlur: () => {
                setPerPage(10);
              },
            }}
          />
        </Flex>
        <TableCover
          perPage={perPage}
          setPerPage={setPerPage}
          total={filteredData.length}
          page={page}
          setPage={setPage}
          disableControls={filteredData.length === 0}
        >
          <Table className="table">
            <div className="head grid">
              <span>Title</span>
              <span>Date</span>
              <span>Status</span>
              <span></span>
            </div>

            {loading ? (
              <LoadingBlock />
            ) : filteredData.length === 0 ? (
              <Empty message="No surveys were found in this project." />
            ) : (
              paginatedData.map((data, i) => (
                <Row
                  fileNames={fileNames}
                  key={data.xmlFormId}
                  handleRefresh={handleRefresh}
                  data={data}
                  index={i}
                  setOpenSettingIndex={setOpenSettingIndex}
                  openSetting={OpenSettingIndex === i}
                />
              ))
            )}
          </Table>
        </TableCover>

        <Link
          href={`/projects/${projectId}/survey/new`}
          className="generate-btn"
        >
          <ToolTips text="Create Survey" position="top">
            <FiPlus size={36} />
          </ToolTips>
        </Link>
      </Wrapper>
    </>
  );
}
