import { GridReadyEvent, RowClassParams, RowStyle } from "ag-grid-community";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { useRouter } from "next/router";
import { useCallback, useMemo, useRef, useState } from "react";

const BuyerTable = () => {
  const router = useRouter();
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    // const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      headerName: "Name",
      field: "landOwned",
      width: 150,
    },
    {
      headerName: "Buyer Type",
      field: "landOwned",
      width: 150,
    },
    {
      headerName: "Duration",
      field: "landOwned",
      width: 150,
    },
    {
      headerName: "Address",
      field: "landOwned",
      width: 150,
    },
    {
      headerName: "Status",
      field: "landOwned",
      width: 150,
    },
    {
      headerName: "Contact Name",
      field: "landOwned",
      width: 150,
    },
    {
      headerName: "Designation",
      field: "landOwned",
      width: 150,
    },
    {
      headerName: "Phone",
      field: "landOwned",
      width: 150,
    },
    {
      headerName: "Email",
      field: "landOwned",
      width: 150,
    },
  ]);

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

  const onGridReady = useCallback((params: GridReadyEvent) => {
    (async () => {
      try {
        // const res = await axios.post('/api/get-table-data', {
        //    projects: slug,
        // })

        setRowData([]);
      } catch (error) {
        console.log(error);
      } finally {
        params.api.sizeColumnsToFit();
      }
    })();
  }, []);

  const getRowStyle = useCallback(
    (params: RowClassParams): RowStyle | undefined => {
      if (params.node.rowPinned) {
        return { fontWeight: "bold" };
      }
    },
    []
  );

  return (
    <div className="ag-theme-alpine" id="ag-grid">
      <AgGridReact
        ref={gridRef}
        className="scrollbar-hidden"
        columnDefs={columnDefs}
        rowData={rowData}
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
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default BuyerTable;
