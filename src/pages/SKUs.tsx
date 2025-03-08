// import React, { useState } from 'react';
// import { Container, Typography, List, ListItem, ListItemText, IconButton, TextField, Button, Paper } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

// interface SKU {
//   id: number;
//   name: string;
//   price: number;
//   cost: number;
// }

// const SKUs: React.FC = () => {
//   const [skus, setSkus] = useState<SKU[]>([
//     { id: 1, name: 'SKU 1', price: 10, cost: 7 },
//     { id: 2, name: 'SKU 2', price: 15, cost: 10 },
//   ]);
//   const [newSKU, setNewSKU] = useState<{ name: string; price: string; cost: string }>({
//     name: '',
//     price: '',
//     cost: '',
//   });

//   const addSKU = () => {
//     if (newSKU.name.trim() && newSKU.price && newSKU.cost) {
//       const newId = skus.length ? Math.max(...skus.map(s => s.id)) + 1 : 1;
//       setSkus([...skus, { id: newId, name: newSKU.name, price: parseFloat(newSKU.price), cost: parseFloat(newSKU.cost) }]);
//       setNewSKU({ name: '', price: '', cost: '' });
//     }
//   };

//   const deleteSKU = (id: number) => {
//     setSkus(skus.filter(sku => sku.id !== id));
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         SKUs
//       </Typography>
//       <Paper sx={{ padding: 2, mb: 2 }}>
//         <TextField
//           label="SKU Name"
//           value={newSKU.name}
//           onChange={(e) => setNewSKU({ ...newSKU, name: e.target.value })}
//           sx={{ mr: 2 }}
//         />
//         <TextField
//           label="Price"
//           type="number"
//           value={newSKU.price}
//           onChange={(e) => setNewSKU({ ...newSKU, price: e.target.value })}
//           sx={{ mr: 2 }}
//         />
//         <TextField
//           label="Cost"
//           type="number"
//           value={newSKU.cost}
//           onChange={(e) => setNewSKU({ ...newSKU, cost: e.target.value })}
//           sx={{ mr: 2 }}
//         />
//         <Button variant="contained" onClick={addSKU}>
//           Add SKU
//         </Button>
//       </Paper>
//       <List>
//         {skus.map((sku) => (
//           <ListItem
//             key={sku.id}
//             secondaryAction={
//               <IconButton edge="end" onClick={() => deleteSKU(sku.id)}>
//                 <DeleteIcon />
//               </IconButton>
//             }
//           >
//             <DragIndicatorIcon sx={{ mr: 1, cursor: 'grab' }} />
//             <ListItemText primary={`${sku.name} - Price: $${sku.price}, Cost: $${sku.cost}`} />
//           </ListItem>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default SKUs;
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete'; 
import skuMock from '../Data/mockSKU.json'

interface SKU {
  id: number;
  name: string;
  price: number;
  cost: number;
}

const initialSKUs: SKU[] = skuMock as SKU[]
// [
//   { id: 1, name: 'Cotton Polo Shirt', price: 134.99, cost: 20.79 },
//   { id: 2, name: 'Tassel Fringe Handbag', price: 139.49, cost: 30.25 },
//   { id: 3, name: 'Minimalist Leather Watch', price: 99.99, cost: 15.99 },
//   { id: 4, name: 'Foldable Travel Hat', price: 49.99, cost: 8.16 },
//   { id: 5, name: 'Striped Cotton Socks', price: 14.99, cost: 3.68 },
//   { id: 6, name: 'Fleece-Lined Hooded Coat', price: 79.99, cost: 25.12 },
//   { id: 7, name: 'Pleated Leather Belt', price: 34.99, cost: 5.82 },
//   { id: 8, name: 'Yoga Leggings', price: 29.99, cost: 6.14 },
//   { id: 9, name: 'Graphic Print T-Shirt', price: 19.99, cost: 4.32 },
//   { id: 10, name: 'Luxury Silk Tie', price: 44.99, cost: 10.79 },
// ];

const SKUs: React.FC = () => {
  // -----------------------------
  // 1) State Management
  // -----------------------------
  const [skus, setSkus] = useState<SKU[]>(initialSKUs);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [newSKU, setNewSKU] = useState<Partial<SKU>>({ name: '', price: 0, cost: 0 });

  // -----------------------------
  // 2) Handlers
  // -----------------------------
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewSKU({ name: '', price: 0, cost: 0 });
  };

  const handleSave = () => {
    if (!newSKU.name || !newSKU.price || !newSKU.cost) return;
    const nextId = skus.length ? Math.max(...skus.map((s) => s.id)) + 1 : 1;
    setSkus([...skus, { id: nextId, ...newSKU } as SKU]);
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    setSkus(skus.filter((sku) => sku.id !== id));
  };

  // -----------------------------
  // 3) DataGrid Columns
  // -----------------------------
  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: '',
      width: 50, // Column width for delete icon
      sortable: false,
      renderCell: (params: GridRenderCellParams<SKU>) => (
        <DeleteIcon
          color="primary"
          sx={{ cursor: 'pointer' }}
          onClick={() => handleDelete(params.row.id)}
        />
      ),
    },
    {
      field: 'name',
      headerName: 'SKU',
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 120,
      renderCell: (params: GridRenderCellParams<SKU>) =>
        `$ ${params.value?.toFixed(2)}`,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      width: 120,
      renderCell: (params: GridRenderCellParams<SKU>) =>
        `$ ${params.value?.toFixed(2)}`,
    },
  ];

  // -----------------------------
  // 4) Render
  // -----------------------------
  return (
    <Container maxWidth="xl" sx={{ width: '87vw' }}>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <DataGrid
          rows={skus}
          columns={columns}
          pageSizeOptions={[7,14,21,50,100]}
          rowSelection={false}
          // disableRowSelectionOnClick
          sx={{ 
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'red', // Set red background for header
              color: '#848884', // Set black text color
            },
          }}
        />
      </Paper>

      <Box display="flex" justifyContent="flex-start">
        <Button
          variant="contained"
          color="warning"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{ fontWeight: 'bold' }}
        >
          NEW SKU
        </Button>
      </Box>

      {/* Dialog for Adding a New SKU */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>New SKU</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="SKU Name"
            fullWidth
            value={newSKU.name}
            onChange={(e) => setNewSKU({ ...newSKU, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={newSKU.price}
            onChange={(e) =>
              setNewSKU({ ...newSKU, price: parseFloat(e.target.value) })
            }
          />
          <TextField
            margin="dense"
            label="Cost"
            type="number"
            fullWidth
            value={newSKU.cost}
            onChange={(e) =>
              setNewSKU({ ...newSKU, cost: parseFloat(e.target.value) })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SKUs;
