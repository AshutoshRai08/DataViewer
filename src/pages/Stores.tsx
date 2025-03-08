// import React, { useState } from 'react';
// import { Container, Typography, List, ListItem, ListItemText, IconButton, TextField, Button, Paper } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

// interface Store {
//   id: number;
//   name: string;
// }

// const Stores: React.FC = () => {
//   const [stores, setStores] = useState<Store[]>([
//     { id: 1, name: 'Store 1' },
//     { id: 2, name: 'Store 2' },
//   ]);
//   const [newStore, setNewStore] = useState<string>('');

//   const addStore = () => {
//     if (newStore.trim()) {
//       const newId = stores.length ? Math.max(...stores.map(s => s.id)) + 1 : 1;
//       setStores([...stores, { id: newId, name: newStore }]);
//       setNewStore('');
//     }
//   };

//   const deleteStore = (id: number) => {
//     setStores(stores.filter(store => store.id !== id));
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Stores
//       </Typography>
//       <Paper sx={{ padding: 2, mb: 2 }}>
//         <TextField
//           label="New Store"
//           value={newStore}
//           onChange={(e) => setNewStore(e.target.value)}
//           sx={{ mr: 2 }}
//         />
//         <Button variant="contained" onClick={addStore}>
//           Add Store
//         </Button>
//       </Paper>
//       <List>
//         {stores.map((store) => (
//           <ListItem
//             key={store.id}
//             secondaryAction={
//               <IconButton edge="end" onClick={() => deleteStore(store.id)}>
//                 <DeleteIcon />
//               </IconButton>
//             }
//           >
//             <DragIndicatorIcon sx={{ mr: 1, cursor: 'grab' }} />
//             <ListItemText primary={store.name} />
//           </ListItem>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default Stores;
import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Paper,
  IconButton
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import mockStore from "../Data/mockStore.json";

interface Store {
  id: number;
  name: string;
  city: string;
  state: string;
}

const initialStores: Store[] = mockStore;

const Stores: React.FC = () => {
  // -----------------------------
  // 1) State management
  // -----------------------------
  const [stores, setStores] = useState<Store[]>(initialStores);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [newStore, setNewStore] = useState<Partial<Store>>({ name: '', city: '', state: '' });

  // -----------------------------
  // 2) Handlers
  // -----------------------------
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewStore({ name: '', city: '', state: '' });
  };

  const handleSave = () => {
    if (!newStore.name || !newStore.city || !newStore.state) return;
    const nextId = stores.length ? Math.max(...stores.map((s) => s.id)) + 1 : 1;
    setStores([...stores, { id: nextId, ...newStore } as Store]);
    handleCloseDialog();
  };

  // -----------------------------
  // 3) DataGrid columns
  // -----------------------------
  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: '',
      width: 80,
      sortable: false,  
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          color="primary"
          onClick={() => {
            setStores(stores.filter((s) => s.id !== params.row.id));
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
    {
      field: 'id',
      headerName: 'S. No',
      width: 80,
    },
    {
      field: 'name',
      headerName: 'Store Name',
      flex: 1,
    },
    {
      field: 'city',
      headerName: 'City',
      flex: 1,
    },
    {
      field: 'state',
      headerName: 'State',
      width: 80,
    },
  ];

  return (
    <Box sx={{ width: '84vw', padding: 2 }}>
      {/* DataGrid for store list */}
      <Paper sx={{ width: '84vw', mb: 2, ml: 1 }}>
        <DataGrid
          rows={stores}
          columns={columns}
          pageSizeOptions={[5,10,15,25,50,100]}
          // rowsp
          rowSelection={true}
          disableRowSelectionOnClick
          sx={{ 
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'red', // Set red background for header
              color: '#848884', // Set black text color
            },
          }}
        />
      </Paper>

      {/* Button to open dialog for new store */}
      <Box display="flex" justifyContent="flex-end" sx={{ mb: 4 }}>
        <Button
          variant="contained"
          color="warning"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{ fontWeight: 'bold' }}
        >
          NEW STORE
        </Button>
      </Box>

      {/* Dialog for adding a new store */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add New Store</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Store Name"
            fullWidth
            value={newStore.name}
            onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="City"
            fullWidth
            value={newStore.city}
            onChange={(e) => setNewStore({ ...newStore, city: e.target.value })}
          />
          <TextField
            margin="dense"
            label="State"
            fullWidth
            value={newStore.state}
            onChange={(e) => setNewStore({ ...newStore, state: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Stores;
