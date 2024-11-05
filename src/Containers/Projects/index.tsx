import { Empty, LoadingBlock, Search, TableCover } from "@/components";
import ManageProjectUser from "@/components/Drawer/ManageProjectUser";
import AddDashboard from "@/components/Drawer/addDashboard";
import AddProject from "@/components/Drawer/addProject";
import useToken from "@/hooks/useToken";
import { ProjectInterface } from "@/interfaces";
import { sortByCreatedAt } from "@/utils/sortForms";
import { odkAxios } from "@/utils/useAxios";
import { useWindowClick } from "@poiler/utils";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Flex, ToolTips, Typography, useAlert } from "socialwell-design";
import Row from "./components/ProjectRow";
import { Table, Wrapper } from "./styles";

export type DrawerType = "project" | "dashboard" | "manageUser" | null;

export default function Projects() {
  const [perPage, setPerPage] = useState(10);
  const { query, isReady } = useRouter();
  const [page, setPage] = useState(1);
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const { setAlert } = useAlert();
  const { token } = useToken();
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState<{
    show: boolean;
    id: null | string;
    type: DrawerType;
  }>({
    show: true,
    id: null,
    type: null,
  });
  const [settingOpenIndex, setSettingOpenIndex] = useState<null | number>(null);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleRefresh = async (isRefetching: boolean) => {
    try {
      // if (!isLoggedIn || !getProjectId()) return;
      setLoading(!isRefetching);
      const response = await odkAxios("/v1/projects?forms=true", config);
      setProjects(sortByCreatedAt(response.data || []));
    } catch (error: any) {
      if (error.response.status !== 500) {
        setAlert({
          title: "Error",
          text: error.message,
          state: "error",
          show: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleRefresh(false);
  }, [isReady]);

  const filteredData: ProjectInterface[] = useMemo(() => {
    return query.q
      ? projects.filter(s =>
          s.name?.toLowerCase().includes(String(query.q).toLowerCase())
        )
      : projects;
  }, [query.q, projects]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return filteredData.slice(start, end);
  }, [page, perPage, filteredData]);

  useWindowClick(() => {
    setSettingOpenIndex(null);
    // setOpenDrawer({ show: false, id: null, type: null });
  });

  return (
    <>
      <Wrapper>
        {openDrawer.show && openDrawer.type === "project" && (
          <AddProject
            onClose={() => setOpenDrawer({ show: false, id: null, type: null })}
            id={openDrawer.id}
            refresh={() => handleRefresh(false)}
          />
        )}
        {openDrawer.show && openDrawer.type === "dashboard" && (
          <AddDashboard
            onClose={() => setOpenDrawer({ show: false, id: null, type: null })}
            id={openDrawer.id}
            refresh={() => handleRefresh(false)}
          />
        )}
        {openDrawer.show && openDrawer.type === "manageUser" && (
          <ManageProjectUser
            onClose={() => setOpenDrawer({ show: false, id: null, type: null })}
            id={openDrawer.id}
          />
        )}
        <Flex
          alignItems="center"
          gap="30px"
          className="header"
          justifyContent="space-between"
        >
          <Typography content="Projects" as="h1" weight="600" />
          <Search />
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
              <span>Project Name</span>
              <span>
                <center> Total forms</center>
              </span>
              <span>Created at</span>
              <span>Status</span>
              <span></span>
            </div>

            {loading ? (
              <LoadingBlock />
            ) : filteredData.length === 0 ? (
              <Empty message="You do not have any projects avilable" />
            ) : (
              paginatedData.map((data, i) => (
                <Row
                  key={data.id}
                  handleRefresh={handleRefresh}
                  data={data}
                  index={i}
                  isOpened={i === settingOpenIndex}
                  setParentSettingOpenIndex={setSettingOpenIndex}
                  setOpenDrawer={setOpenDrawer}
                />
              ))
            )}
          </Table>
        </TableCover>
        <button
          className="add-new"
          onClick={e => {
            e.stopPropagation();
            setOpenDrawer(v => ({ id: null, show: !v.show, type: "project" }));
          }}
        >
          <ToolTips text="Create Project" position="top">
            <FiPlus size={36} />
          </ToolTips>
        </button>
      </Wrapper>
    </>
  );
}
