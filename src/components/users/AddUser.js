import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack } from '@mui/material';
import { useState } from 'react';

const AddUserModal = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    class: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name) return; // simple validation
    onSave(form);
    setForm({ name: '', class: '' }); // reset after save
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New User</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2} mt={1}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
          <TextField label="Class" name="class" value={form.class} onChange={handleChange} fullWidth />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddUserModal;
