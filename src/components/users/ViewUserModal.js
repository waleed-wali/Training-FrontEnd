import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Stack } from '@mui/material';
import { formatToDMY } from '../../dateISO';

const ViewUserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <Dialog open={Boolean(user)} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>User Details</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          <Typography>
            <strong>ID:</strong> {user.id}
          </Typography>
          <Typography>
            <strong>Name:</strong> {user.name}
          </Typography>
          <Typography>
            <strong>Class:</strong> {user.class}
          </Typography>
          <Typography>
            <strong>Created At:</strong> {formatToDMY(user.createdAt)}
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ViewUserModal;
