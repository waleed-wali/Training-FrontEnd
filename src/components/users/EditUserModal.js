import { useState } from 'react';
import { TextField, Button, Box, Typography, Modal, Stack, Paper } from '@mui/material';

const EditUserModal = ({ user, onClose, onSave }) => {
  const [form, setForm] = useState({ ...user });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 2,
            minWidth: 400,
          }}>
          <Typography variant="h6" mb={2}>
            Edit User
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField label="Name" name="name" value={form.name} onChange={handleChange} required fullWidth />

              <TextField label="Class" name="class" value={form.class} onChange={handleChange} required fullWidth />

              <TextField
                label="Created At"
                name="createdAt"
                value={form.createdAt}
                onChange={handleChange}
                required
                fullWidth
                disabled
              />

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="contained" type="submit">
                  Save
                </Button>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Modal>
  );
};
export default EditUserModal;
