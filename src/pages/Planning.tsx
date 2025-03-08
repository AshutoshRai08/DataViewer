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

// Each row in the grid represents a Store/SKU combination.
interface PlanningRow {
  id: number;
  store: string;
  sku: string;

  // Example for 2 weeks. Add more as needed.
  w1Units: number;
  w1Price: number;
  w1Cost: number;

  w2Units: number;
  w2Price: number;
  w2Cost: number;
}

// Example row data
const initialRowData: PlanningRow[] = [
  {
    id: 1,
    store: 'Nashville Melody Music Store',
    sku: 'Ragged Utility Jacket',
    w1Units: 200,
    w1Price: 100,
    w1Cost: 55,
    w2Units: 180,
    w2Price: 100,
    w2Cost: 55,
  },
  {
    id: 2,
    store: 'Miami Breeze Apparel',
    sku: 'Floral Chiffon Wrap Dress',
    w1Units: 120,
    w1Price: 80,
    w1Cost: 30,
    w2Units: 140,
    w2Price: 80,
    w2Cost: 30,
  },
  // Add more rows as needed...
];

// Helper functions for calculations
const getSalesDollars = (units: number, price: number) => units * price;
const getGMDollars = (units: number, price: number, cost: number) =>
  getSalesDollars(units, price) - units * cost;
const getGMPercent = (units: number, price: number, cost: number) => {
  const sales = getSalesDollars(units, price);
  const gm = getGMDollars(units, price, cost);
  return sales > 0 ? gm / sales : 0;
};

// Return a cell style based on GM% thresholds
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

  const columnDefs: (ColDef<PlanningRow> | ColGroupDef<PlanningRow>)[] = [
    {
      headerName: 'Week 1 Units',
      field: 'w1Units',
      valueGetter: (params: ValueGetterParams<PlanningRow>) => params.data?.w1Units,
    },
    {
      headerName: 'Week 1 Sales',
      valueGetter: (params: ValueGetterParams<PlanningRow>) => params.data ? getSalesDollars(params.data.w1Units, params.data.w1Price) : 0,
    },
    {
      headerName: 'Week 1 GM$',
      valueGetter: (params: ValueGetterParams<PlanningRow>) => params.data ? getGMDollars(params.data.w1Units, params.data.w1Price, params.data.w1Cost) : 0,
    },
    {
      headerName: 'Week 1 GM%',
      valueGetter: (params: ValueGetterParams<PlanningRow>) => params.data ? getGMPercent(params.data.w1Units, params.data.w1Price, params.data.w1Cost) : 0,
    },
    {
      headerName: 'Week 2 Units',
      field: 'w2Units',
      valueGetter: (params: ValueGetterParams<PlanningRow>) => params.data?.w2Units,
    },
    {
      headerName: 'Week 2 Sales',
      valueGetter: (params: ValueGetterParams<PlanningRow>) => params.data ? getSalesDollars(params.data.w2Units, params.data.w2Price) : 0,
    },
    {
      headerName: 'Week 2 GM$',
      valueGetter: (params: ValueGetterParams<PlanningRow>) => params.data ? getGMDollars(params.data.w2Units, params.data.w2Price, params.data.w2Cost) : 0,
    },
    {
      headerName: 'Week 2 GM%',
      valueGetter: (params: ValueGetterParams<PlanningRow>) => params.data ? getGMPercent(params.data.w2Units, params.data.w2Price, params.data.w2Cost) : 0,
    },
  ];

  // Handle cell edits (e.g., changes to Sales Units)
  const onCellValueChanged = () => {
    // Force re-render with updated rowData
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
          //     backgroundColor: 'red', // Set red background for header
          //     color: '#848884', // Set black text color
          //   },
          // }}
        />
      </div>
    </Container>
  );
};

export default Planning;