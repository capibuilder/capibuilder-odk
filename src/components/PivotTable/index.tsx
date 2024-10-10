import { ArrowLeft } from "@/assets";
import { RowClassParams, RowStyle } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Link from "next/link";
import { useCallback, useMemo, useRef } from "react";
import { Flex } from "socialwell-design";

const PivotTable = ({
  data,
  showBackBtn = false,
}: {
  data: any;
  showBackBtn?: boolean;
}) => {
  const gridRef = useRef<AgGridReact>(null);

  const defaultColDef = useMemo(() => {
    return {
      width: 180,
      sortable: true,
      resizable: true,
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

  // const {
  //   isMemberFpoCount,
  // } = useComputedValues(rowData);

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
      <div className="ag-theme-alpine" id="ag-grid">
        <Flex justifyContent="space-between">
          {showBackBtn && (
            <div className="grid-link">
              <Link href={"/projects"}>
                <ArrowLeft />
                Back to Projects
              </Link>
            </div>
          )}
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
          columnDefs={data.colData}
          rowData={data.data}
          headerHeight={40}
          rowSelection="multiple"
          rowHeight={40}
          animateRows={true}
          paginationAutoPageSize={true}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          pagination={true}
          getRowStyle={getRowStyle}
          // pivotMode={true}
          sideBar={"columns"}
          groupDisplayType={"groupRows"}
        />
      </div>
    </>
  );
};

export default PivotTable;
