// import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { AllCommunityModule, ModuleRegistry, ValueFormatterParams } from 'ag-grid-community'; 
import { PriceData } from '../types/priceData';
import { useDataContext } from '../context/DataContext';
import { useState } from 'react';
ModuleRegistry.registerModules([AllCommunityModule]);


// dynamically creates row data based on the keys of the data object
const mapRowData = (data: any) => {
  if (!data || Object.keys(data).length === 0) return [];

const keys = Object.keys(data || {});
const rowCount = data[keys[0]].length;

return Array.from({ length: rowCount }, (_, index) => {
  const row: { [key: string]: any } = {};
  keys.forEach(key => {
    row[key] = data[key][index];
  });
  return row;
});
};

const generateColDefs = (data: unknown) => {
  if (!data || Object.keys(data).length === 0) return [];

  return Object.keys(data).map((key) => ({
    headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter for header
    field: key as keyof PriceData, 
    filter: true,
    valueFormatter: (params: ValueFormatterParams) => {
      if (key === 'timestamp') {
        return params.value ? params.value.toLocaleString() : '';
      }
      return params.value;
    },
  }));
};  


const DataTable = () => {
  const {data} = useDataContext();
  const [fullScreen, setFullScreen] = useState(false);
  
  // const { open, close, high, low, volume, timestamp } = data || {};
// Creates an array of row data by iterating over the 'open' array. 
// For each 'open' price at index 'i', it maps the corresponding values from 
// 'timestamp', 'close', 'high', 'low', and 'volume' arrays to form a new object for each data point.
// const rowData = open?.map((openPrice, index) => ({
//       open: openPrice,
//       timestamp: timestamp?.[index] ? new Date(timestamp[index]) : null,
//       close: close?.[index],
//       high: high?.[index],
//       low: low?.[index],
//       volume: volume?.[index],
//     }));

//     const colDefs = Object.keys(data || {}).map((key) => ({
//       headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter for header
//       field: key as keyof PriceData, 
//       filter: true,
//       valueFormatter: (params: ValueFormatterParams) => {
//         if (key === 'timestamp') {
//           return params.value ? params.value.toLocaleString() : '';
//         }
//         return params.value;
//       },
//       // floatingFilter: true,
//     }));

const rowData = mapRowData(data);
const colDefs = generateColDefs(data);  

    console.log(rowData);

    const pageSize = Math.floor((fullScreen ? window.innerHeight - 200 : 1000) / 50); // Adjust 50 based on row height

  
return (
  <div>
    <div style={{ marginBottom: '10px' }}>
      <label>
        <input
          type="checkbox"
          checked={fullScreen}
          onChange={(e) => setFullScreen(e.target.checked)}
        />
        Adjust Screen
      </label>
    </div>
    <div
      style={{ 
        height: fullScreen ? 'calc(100vh - 200px)' : 1000,
        width: '100%'
      }}
    >
      <AgGridReact
          rowData={rowData}
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
