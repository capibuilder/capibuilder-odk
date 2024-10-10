import { MenuIcon } from "@/assets";
import AddProjectuser from "@/assets/icons/addProjectuser";
import CreateSurveyIcon from "@/assets/icons/createSurvey";
import EditProjectIcon from "@/assets/icons/editProject";
import { ProjectInterface } from "@/interfaces";
import { Trimmer } from "@/utils/Trimmer";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { CiViewTable } from "react-icons/ci";
import { DrawerType } from "..";
import { RowWrapper } from "./styles";

const ICON_SIZE = 20;

interface props {
  handleRefresh?: (isRefetching: boolean) => void;
  data: ProjectInterface;
  isOpened: boolean;
  index: number;
  setParentSettingOpenIndex: Dispatch<SetStateAction<number | null>>;
  setOpenDrawer: (value: {
    show: boolean;
    id: string;
    type: DrawerType;
  }) => void;
}

export default function Row({
  data,
  handleRefresh,
  index,
  isOpened,
  setParentSettingOpenIndex,
  setOpenDrawer,
}: props) {
  return (
    <>
      <Link href={data.archived ? "" : `/projects/${data.id}/survey`}>
        <RowWrapper
          aria-disabled={data.archived}
          className="grid project"
          data-animate="opacity"
        >
          <span className="bg">{Trimmer(data.name, 100)}</span>
          <span>{data.formList?.length}</span>
          <span>{formatDate(data.createdAt, "DD-MMM-yyyy")}</span>
          <span>
            <span
              className={data.archived ? "status deleted" : "status active"}
            >
              {data.archived ? "Deleted" : "Active"}
            </span>
          </span>

          <button
            disabled={data.archived}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              if (!data.archived) {
                setParentSettingOpenIndex(index);
              }
            }}
            className="pop"
          >
            <MenuIcon />
          </button>
          {isOpened && (
            <ul
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="popup"
            >
              <Link href={`/projects/${data.id}/survey/new`}>
                <li>
                  <CreateSurveyIcon /> Create Survey
                </li>
              </Link>

              <li
                onClick={() => {
                  setOpenDrawer({
                    id: data.id.toString(),
                    show: true,
                    type: "manageUser",
                  });
                }}
              >
                <AddProjectuser />
                Add Project User
              </li>

              <li
                onClick={() => {
                  setOpenDrawer({
                    id: data.id.toString(),
                    show: true,
                    type: "project",
                  });
                }}
              >
                <EditProjectIcon /> Edit Project
              </li>
              <Link href={`/projects/${data.id}/email`}>
                <li>
                  <CiViewTable size={ICON_SIZE} /> Email Submissions
                </li>
              </Link>
              <Link href={`/projects/${data.id}/table`}>
                <li>
                  <CiViewTable size={ICON_SIZE} /> Responses
                </li>
              </Link>
              {/* <li
                onClick={() => {
                  setOpenDrawer({
                    id: data.id.toString(),
                    show: true,
                    type: "dashboard",
                  });
                }}
              >
                <LuLayoutDashboard size={ICON_SIZE} /> Create Dashboard
              </li> */}
              {/* <Link href={`/dashboard/${data.id}`}>
                <li>
                  <LuLayoutDashboard size={ICON_SIZE} /> Dashboard
                </li>
              </Link> */}
            </ul>
          )}
        </RowWrapper>
      </Link>
    </>
  );
}
