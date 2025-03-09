import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-community';

// Register all community features
ModuleRegistry.registerModules([AllCommunityModule]);

// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: "legacy" });

import type {
  ColDef,
  ColGroupDef,
  ValueGetterParams,
  CellClassParams,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


interface PlanningRow {
  id: number;
  store: string;
  sku: string;

  w1Units: number;
  w1Price: number;
  w1Cost: number;

  w2Units: number;
  w2Price: number;
  w2Cost: number;
}


const initialRowData: PlanningRow[] = [

    { id:1, store: 'Store A', sku: 'SKU123', w1Units: 10, w1Price: 20, w1Cost: 15, w2Units: 15, w2Price: 22, w2Cost: 14 },
    { id:2, store: 'Store B', sku: 'SKU456', w1Units: 5, w1Price: 50, w1Cost: 25, w2Units: 8, w2Price: 52, w2Cost: 24 },
    { id:3, store: 'Store C', sku: 'SKU789', w1Units: 20, w1Price: 30, w1Cost: 10, w2Units: 25, w2Price: 35, w2Cost: 12 },
    { id:4, store: 'Store D', sku: 'SKU234', w1Units: 12, w1Price: 40, w1Cost: 30, w2Units: 18, w2Price: 45, w2Cost: 28 },
    { id:5, store: 'Store E', sku: 'SKU567', w1Units: 8, w1Price: 60, w1Cost: 50, w2Units: 12, w2Price: 65, w2Cost: 52 },
// {
//   id: 1,
 //   store: 'Nashville Melody Music Store',
  //   sku: 'Ragged Utility Jacket',
  //   w1Units: 200,
  //   w1Price: 100,
  //   w1Cost: 55,
  //   w2Units: 180,
  //   w2Price: 100,
  //   w2Cost: 55,
  // },
  // {
  //   id: 2,
  //   store: 'Miami Breeze Apparel',
  //   sku: 'Floral Chiffon Wrap Dress',
  //   w1Units: 120,
  //   w1Price: 80,
  //   w1Cost: 30,
  //   w2Units: 140,
  //   w2Price: 80,
  //   w2Cost: 30,
  // },

];


const getSalesDollars = (units: number, price: number) => units * price;
const getGMDollars = (units: number, price: number, cost: number) =>
  getSalesDollars(units, price) - units * cost;
const getGMPercent = (units: number, price: number, cost: number) => {
  const sales = getSalesDollars(units, price);
  const gm = getGMDollars(units, price, cost);
  return sales > 0 ? gm / sales : 0;
};


const gmCellStyle = (params: CellClassParams<PlanningRow>) => {
  const value = Number(params.value); // GM% as a fraction
  if (value >= 0.4) return { backgroundColor: '#4CAF50', color: '#fff' }; // green
  if (value >= 0.1 && value < 0.4) return { backgroundColor: '#FFEB3B' }; // yellow
  if (value >= 0.05 && value < 0.1) return { backgroundColor: '#FF9800', color: '#fff' }; // orange
  if (value <= 0.05) return { backgroundColor: '#F44336', color: '#fff' }; // red
  return undefined;
};

const Planning: React.FC = () => {
  const [rowData, setRowData] = useState<PlanningRow[]>(initialRowData);

  // const columnDefs: (ColDef<PlanningRow> | ColGroupDef<PlanningRow>)[] = [
  //   {
  //     headerName: 'Week 1 Units',
  //     field: 'w1Units',
  //     valueGetter: (params: ValueGetterParams<PlanningRow>) => params.data?.w1Units,
  //   },
  //   {
  //     headerName: 'Week 1 Sales',
  //     valueGetter: (params: ValueGetterParams<PlanningRow>) => params.data ? getSalesDollars(params.data.w1Units, params.data.w1Price) : 0,
  //   },
  //   {
  //     headerName: 'Week 1 GM$',
  //     valueGetter: (params: ValueGetterParams<PlanningRow>) => params.data ? getGMDollars(params.data.w1Units, params.data.w1Price, params.data.w1Cost) : 0,
  //   },
  //   {
  //     headerName: 'Week 1 GM%',
  //     valueGetter: (params: ValueGetterParams<PlanningRow>) => params.data ? getGMPercent(params.data.w1Units, params.data.w1Price, params.data.w1Cost) : 0,
  //   },
  //   {
  //     headerName: 'Week 2 Units',
  //     field: 'w2Units',
  //     valueGetter: (params: ValueGetterParams<PlanningRow>) => params.data?.w2Units,
  //   },
  //   {
  //     headerName: 'Week 2 Sales',
  //     valueGetter: (params: ValueGetterParams<PlanningRow>) => params.data ? getSalesDollars(params.data.w2Units, params.data.w2Price) : 0,
  //   },
  //   {
  //     headerName: 'Week 2 GM$',
  //     valueGetter: (params: ValueGetterParams<PlanningRow>) => params.data ? getGMDollars(params.data.w2Units, params.data.w2Price, params.data.w2Cost) : 0,
  //   },
  //   {
  //     headerName: 'Week 2 GM%',
  //     valueGetter: (params: ValueGetterParams<PlanningRow>) => params.data ? getGMPercent(params.data.w2Units, params.data.w2Price, params.data.w2Cost) : 0,
  //   },
  // ];

  
  const columnDefs: (ColDef<PlanningRow> | ColGroupDef<PlanningRow>)[] = [
    { headerName: 'Store', field: 'store', pinned: 'left' },
    { headerName: 'SKU', field: 'sku', pinned: 'left' },
    {
      headerName: 'Week 1',
      children: [
        { headerName: 'Sales Units', field: 'w1Units' },
        { headerName: 'Sales Dollars', valueGetter: (params) => getSalesDollars(params.data?.w1Units, params.data?.w1Price) },
        { headerName: 'GM Dollars', valueGetter: (params) => getGMDollars(params.data?.w1Units, params.data?.w1Price, params.data?.w1Cost) },
        { headerName: 'GM Percent', valueGetter: (params) => getGMPercent(params.data?.w1Units, params.data?.w1Price, params.data?.w1Cost), cellStyle: gmCellStyle },
      ],
    },
    {
      headerName: 'Week 2',
      children: [
        { headerName: 'Sales Units', field: 'w2Units' },
        { headerName: 'Sales Dollars', valueGetter: (params) => getSalesDollars(params.data?.w2Units, params.data?.w2Price) },
        { headerName: 'GM Dollars', valueGetter: (params) => getGMDollars(params.data?.w2Units, params.data?.w2Price, params.data?.w2Cost) },
        { headerName: 'GM Percent', valueGetter: (params) => getGMPercent(params.data?.w2Units, params.data?.w2Price, params.data?.w2Cost), cellStyle: gmCellStyle },
      ],
    },
  ];
  
  
  const onCellValueChanged = () => {
  
    setRowData([...rowData]);
  };

  return (
    <Container maxWidth="xl" sx={{ width: '87vw', ml:0.5 }}>      

      <div
        title='ABC'
        className="ag-theme-alpine"
        style={{ height: 700, width: '100%', marginBottom: '1rem' }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onCellValueChanged={onCellValueChanged}
          defaultColDef={{
            resizable: true,
            sortable: true,
          }}
          // sx={{ 
          //   '& .MuiDataGrid-columnHeaders': {
          //     backgroundColor: 'red', 
          //     color: '#848884', 
          //   },
          // }}
        />
      </div>
    </Container>
  );
};

export default Planning;