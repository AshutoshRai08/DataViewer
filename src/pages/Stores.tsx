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
          
          rowSelection={true}
          disableRowSelectionOnClick
          sx={{ 
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'red', 
              color: '#848884', 
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
