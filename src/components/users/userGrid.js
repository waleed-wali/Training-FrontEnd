import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';

import { Button, Box, Typography, Paper, Stack, Container } from '@mui/material';

import EditUserModal from './EditUserModal';
import ViewUserModal from './ViewUserModal';
import { formatToDMY } from '../../dateISO';
import AddUserModal from './AddUser';
import { loadUsers, addUser, upuser, deleteUserAsync } from '../../components/users/usersSlice';
import { themeMaterial } from 'ag-grid-community';

const UserGrid = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.list);
  const status = useSelector(state => state.users.status);
  const error = useSelector(state => state.users.error);

  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (status === 'idle') dispatch(loadUsers());
  }, [status, dispatch]);

  const handleSave = async updated => {
    try {
      await dispatch(upuser(updated)).unwrap(); // triggers API call
      setEditingUser(null); // close modal after success
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  const handleDelete = id => {
    dispatch(deleteUserAsync(id));
  };

  const handleAddUser = userData => {
    // const maxId = users.reduce((max, u) => (u.id > max ? u.id : max), -1);

    // const newUser = {
    //   // id: maxId + 1,
    // //    name: userData.name || "Unnamed",
    // // class:  userData.class || "A",
    //    // createdAt: new Date().toISOString(),
    //   };
    dispatch(addUser(userData));
    setShowAddForm(false);
  };

  const handleView = user => setViewingUser(user);

  const columnDefs = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name' },
    { field: 'class', headerName: 'class' },
    {
      field: 'createdAt',
      headerName: 'Created At',
      valueFormatter: p => formatToDMY(p.value),
    },
    {
      headerName: 'Action',
      minWidth: 230,
      cellRenderer: params => (
        <Stack direction="row" spacing={1} mt={0.3}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              px: 2,
            }}
            onClick={() => setEditingUser(params.data)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              px: 2,
            }}
            onClick={() => handleDelete(params.data.id)}>
            Delete
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              px: 2,
            }}
            onClick={() => handleView(params.data)}>
            View
          </Button>
        </Stack>
      ),
    },
  ];

  if (status === 'loading')
    return (
      <Typography variant="h6" align="center">
        Loading users…
      </Typography>
    );

  if (status === 'failed')
    return (
      <Typography variant="h6" color="error" align="center">
        Error loading users: {error}
      </Typography>
    );

  return (
    <Container sx={{ maxWidth: 'lg', mt: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">User Management</Typography>
          <Button variant="contained" onClick={() => setShowAddForm(true)}>
            Add User
          </Button>
          <AddUserModal open={showAddForm} onClose={() => setShowAddForm(false)} onSave={handleAddUser} />
        </Stack>

        {/* {showAddForm && (
          <Stack direction="row" spacing={2} mb={2}>
            <TextField
              label="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <TextField
              label="class"
              value={newclass}
              onChange={(e) => setNewclass(e.target.value)}
            />
            <Button variant="contained" onClick={handleAddUser}>
              Save
            </Button>
          </Stack>
        )} */}

        <Box
          sx={{
            height: 400,
            width: '100%',
            '& .ag-header': { backgroundColor: '#f5f5f5' },
          }}>
          <AgGridReact
            theme={themeMaterial}
            rowData={users}
            columnDefs={columnDefs}
            defaultColDef={{
              resizable: true,
              flex: 1,
            }}
            rowHeight={40}
          />
        </Box>
      </Paper>

      {editingUser && (
        <EditUserModal user={editingUser} onSave={u => handleSave(u)} onClose={() => setEditingUser(null)} />
      )}

      {viewingUser && <ViewUserModal user={viewingUser} onClose={() => setViewingUser(null)} />}
    </Container>
  );
};
export default UserGrid;
