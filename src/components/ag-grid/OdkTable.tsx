import { ArrowLeft } from "@/assets";
import { RowClassParams, RowStyle } from "ag-grid-community";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useMemo, useRef, useState } from "react";
import { Flex, SelectField } from "socialwell-design";
import * as XLSX from "xlsx";
import Drawer from "./Drawer";

const ReviewCellRenderer = (props: any) => {
  const { query } = useRouter();

  return (
    <div
      className="review-cell"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <button
        className="btn-icons"
        onClick={() => {
          props.setDrawerOpen({
            open: true,
            params: {
              projectId: query.projectid,
              surveyId: query.surveyid,
              instanceId: props.data.__id,
              deprecatedId: props.data.meta__instanceID,
              submittedBy: props.data.__system__submitterName,
              submittedOn: props.data.__system__submissionDate,
              formVersion: props.data.__system__formVersion,
              status: props.data.__system__reviewState,
            },
            data: props.data,
          });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <g clipPath="url(#clip0_385_2736)">
            <path
              d="M0 0.386719V13.6089H10.1111V11.2756H9.33333V12.8312H0.77778V1.1645H9.33333V2.72005H10.1111V0.386719H0Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.94436 10.4981C9.77072 10.4981 10.5301 10.2117 11.1289 9.73273L13.3337 11.9396C13.4855 12.0915 13.7318 12.0916 13.8837 11.9398C14.0356 11.788 14.0358 11.5418 13.884 11.3898L11.6789 9.1828C12.1579 8.58401 12.4444 7.82443 12.4444 6.99805C12.4444 5.06505 10.8773 3.49805 8.94436 3.49805C7.01134 3.49805 5.44434 5.06505 5.44434 6.99805C5.44434 8.93102 7.01134 10.4981 8.94436 10.4981ZM8.94436 9.72027C10.4478 9.72027 11.6666 8.50146 11.6666 6.99805C11.6666 5.4946 10.4478 4.27582 8.94436 4.27582C7.44089 4.27582 6.22211 5.4946 6.22211 6.99805C6.22211 8.50146 7.44089 9.72027 8.94436 9.72027Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_385_2736">
              <rect width="14" height="14" fill="white" />
            </clipPath>
          </defs>
        </svg>
        Review
      </button>
    </div>
  );
};

const NameCellRenderer = (props: any) => {
  if (!props.value) {
    return <div className="review-cell">-</div>;
  }

  return (
    <div
      className="review-cell"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {props.value.split("::")[0]}
    </div>
  );
};

const DateCellRenderer = (props: any) => {
  const { data } = props;

  if (!data.__system__submissionDate) {
    return <div className="review-cell">-</div>;
  }

  const date = new Date(data.__system__submissionDate);
  const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  return (
    <div
      className="review-cell"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {formattedDate}
    </div>
  );
};

const StatusCellRenderer = (props: any) => {
  const { data } = props;

  if (!data.__system__reviewState) {
    return <div className="review-cell">received</div>;
  }

  return (
    <div
      className={`review-cell ${data.__system__reviewState}`}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {data.__system__reviewState === "-"
        ? "draft"
        : data.__system__reviewState}
    </div>
  );
};

const ModelCellRenderer = (props: any) => {
  const { query } = useRouter();
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const src = `${process.env.NEXT_PUBLIC_ODK_CENTRAL_REST_API}/v1/projects/${query.projectid}/forms/${query.surveyid}/submissions/${props.data.__id}/attachments/${props.value}`;

  const tableId = `${query.surveyid}-${query.projectid}-${props.data.__id}`;

  const handleClick = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(src, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      const blob = await response.blob();

      if (blob.type === "application/json") {
        const data = await blob.text();

        props.setOpenExcel({
          data: JSON.parse(data),
          url: src,
          tableId,
        });

        return;
      }

      if (blob) {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          const data = (e.target as FileReader).result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);

          const modifiedJson = json.map((row: any, index: number) => {
            return {
              ...row,
              rowIndex: String(index + 1),
            };
          });

          props.setOpenExcel({
            data: modifiedJson,
            url: src,
            tableId,
          });
        };

        reader.readAsBinaryString(blob);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <a onClick={handleClick} href="#">
        {props.value}
      </a>
    </div>
  );
};

const DownloadCellRenderer = (props: any) => {
  const { query } = useRouter();
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const src = `${process.env.NEXT_PUBLIC_ODK_CENTRAL_REST_API}/v1/projects/${query.projectid}/forms/${query.surveyid}/submissions/${props.data.__id}/attachments/${props.value}`;

  const handleClick = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(src, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      const blob = await response.blob();

      if (blob) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = props.value;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <a onClick={handleClick} href="#">
        {props.value}
      </a>
    </div>
  );
};

type Params = {
  projectId: string;
  surveyId: string;
  instanceId: string;
  deprecatedId: string;
  submittedBy: string;
  submittedOn: string;
  formVersion: string;
  status: string;
} | null;

export type DrawerOpenProps = {
  open: boolean;
  data: any;
  params: Params;
};

const OdkTable = ({ data }: { data: any }) => {
  const [activeTab, setActiveTab] = useState("responses");
  const { query } = useRouter();
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState(data.tableData);
  const [drawerOpen, setDrawerOpen] = useState<DrawerOpenProps>({
    open: false,
    data: null,
    params: null,
  });

  const columnDefs = useMemo(() => {
    const colData = data.colDefData;

    const extraCol = [
      {
        headerName: "Submitted By",
        field: "__system__submitterName",
        minWidth: 200,
        cellRenderer: NameCellRenderer,
        pinned: "left",
      },
      {
        headerName: "Submitted on",
        field: "__system__submissionDate",
        minWidth: 200,
        cellRenderer: DateCellRenderer,
        pinned: "left",
      },
      {
        headerName: "Status",
        field: "__system__reviewState",
        minWidth: 200,
        cellRenderer: StatusCellRenderer,
        pinned: "left",
      },
      {
        headerName: "",
        field: "",
        minWidth: 100,
        cellRenderer: ReviewCellRenderer,
        cellRendererParams: {
          setDrawerOpen,
        },
        pinned: "left",
      },
    ];

    const newColData = colData.map((col: any) => {
      return col;
    });

    return [...newColData, ...extraCol];
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      sortable: true,
      resizable: true,
      autoHeaderHeight: true,
    };
  }, []);

  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 250,
    };
  }, []);

  const getRowStyle = useCallback(
    (params: RowClassParams): RowStyle | undefined => {
      if (params.node.rowPinned) {
        return { fontWeight: "bold" };
      }
    },
    []
  );

  const autoSizeColumns = (params: any) => {
    const colIds = params.columnApi
      .getAllDisplayedColumns()
      .map((col: any) => col.getColId());

    params.columnApi.autoSizeColumns(colIds);
  };

  const onBtExport = useCallback(() => {
    gridRef.current!.api.exportDataAsExcel({
      exportMode: "xlsx",
    });
  }, []);

  const onBtExportCsv = useCallback(() => {
    gridRef.current!.api.exportDataAsExcel();
  }, []);

  return (
    <>
      {drawerOpen.open && <Drawer {...{ drawerOpen, setDrawerOpen }} />}
      <div className="ag-theme-alpine max-container" id="ag-grid">
        <div className="grid-link">
          <Link href={`/projects/${query.projectid}/survey`}>
            <ArrowLeft />
            Back to Survey
          </Link>
        </div>

        <Flex justifyContent="flex-end">
          <button className="button__ghost" onClick={onBtExport}>
            export xlsx
          </button>
          <button className="button__ghost" onClick={onBtExportCsv}>
            export csv
          </button>
        </Flex>
        <AgGridReact
          ref={gridRef}
          className="scrollbar-hidden"
          columnDefs={columnDefs}
          rowData={rowData}
          headerHeight={50}
          rowSelection="multiple"
          rowHeight={50}
          animateRows={true}
          paginationAutoPageSize={true}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          pagination={true}
          getRowStyle={getRowStyle}
          groupDisplayType={"groupRows"}
          // onGridReady={onGridReady}
          onFirstDataRendered={autoSizeColumns}
        />
      </div>
    </>
  );
};

const BlockRenderer = (props: any) => {
  // const { data } = props;

  if (Array.isArray(props.value)) {
    return (
      <div
        className="review-cell"
        style={{
          width: "100%",
        }}
      >
        <SelectField
          onChange={(o: any) => {
            props.setRowData((prev: any) => {
              return prev.map((row: any) => {
                if (row.rowIndex === props.data.rowIndex) {
                  return {
                    ...row,
                    [props.colDef.field]: o.value,
                  };
                }
                return row;
              });
            });
          }}
          value={props.value}
          options={props.value.map((item: any) => ({
            label: item,
            value: item,
          }))}
        />
      </div>
    );
  }

  return (
    <div
      className="review-cell"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {props.value}
    </div>
  );
};

const NumberRenderer = (props: any) => {
  return (
    <div
      className="review-cell"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <span>{props.value}</span>
    </div>
  );
};

export default OdkTable;
