import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; 
import { AllCommunityModule, ModuleRegistry, ValueFormatterParams } from 'ag-grid-community'; 
import { PriceData } from '../types/priceData';
import { useDataContext } from '../context/DataContext';
import FullScreenToggle from './ScreenToggle';
// import { useVirtualizer } from '@tanstack/react-virtual'; 
ModuleRegistry.registerModules([AllCommunityModule]);

interface DataTableProps {
  search: string;
  styles?: {
    table: React.CSSProperties;   
  };
}


// dynamically creates row data based on the keys of the data object
const mapRowData = (data: any) => {
  if (!data || Object.keys(data).length === 0) return [];
  const keys = Object.keys(data || {});
  const rowCount = data[keys[0]].length;

return Array.from({ length: rowCount }, (_, index) => {
  const row: { [key: string]: any } = {};
  keys.forEach(key => {
    row[key] = key === 'timestamp' ? new Date(data[key][index]) : data[key][index];
  });
  return row;
});
};

const generateColDefs = (data: unknown) => {
  if (!data || Object.keys(data).length === 0) return [];
  return Object.keys(data).map((key) => ({
    headerName: key.charAt(0).toUpperCase() + key.slice(1), 
    field: key as keyof PriceData, 
    filter: true,
    valueFormatter: (params: ValueFormatterParams) => {
      if (key === 'timestamp') {
        return new Date(params.value);
      }
      return params.value;
    },
  }));
};  


const DataTable: React.FC<DataTableProps> = ({ search, styles }) => {
  const {data} = useDataContext();
  const [fullScreen, setFullScreen] = useState(false);
  const rowData = useMemo(() => mapRowData(data), [data]);
  const colDefs = useMemo(() => generateColDefs(data), [data]);  
  const filteredData = useMemo(() => {
    if (!search) return rowData;
    return rowData.filter(row => 
      Object.values(row).some(value => 
        value.toString().toLowerCase().includes(search.toLowerCase()) 
      )
    );
  }, [search, rowData]);

  // const parentRef = React.useRef<HTMLDivElement>(null);
  // const rowVirtualizer = useVirtualizer({
  //   count: filteredData.length,
  //   getScrollElement: () => parentRef.current,
  //   estimateSize: () => 50, // Adjust this value based on your row height
  //   overscan: 5, // Number of rows to render before and after the visible area
  // });

  const pageSize = Math.floor((fullScreen ? window.innerHeight - 200 : 1000) / 50);

  

  
return (
  <div>
    <div style={{ marginBottom: '10px' }}>
      <FullScreenToggle fullScreen={fullScreen} setFullScreen={setFullScreen} />
    </div>
    <div
    // table css passed as prop for global styling
      style={{ 
        height: fullScreen ? 'calc(100vh - 200px)' : 1000,
        ...styles?.table,
       
      }}
    >
      <AgGridReact
          rowData={filteredData}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={pageSize}
          paginationPageSizeSelector={[10, 25, 50]}
          paginationAutoPageSize={true}
      />
    </div>
  </div>
)
};

export default DataTable;
