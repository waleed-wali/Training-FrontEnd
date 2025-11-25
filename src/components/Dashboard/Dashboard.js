import { Grid, Paper, Typography, Box } from '@mui/material';

const stats = [
  { label: 'Total Users', value: 120, bg: '#1976d2' },
  { label: 'Products', value: 56, bg: '#2e7d32' },
  { label: 'Orders', value: 89, bg: '#ed6c02' },
  { label: 'Revenue', value: '$12k', bg: '#9c27b0' },
];

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((item, index) => (
          <Grid key={index}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                bgcolor: item.bg,
                color: '#fff',
              }}>
              <Typography variant="h6">{item.label}</Typography>
              <Typography variant="h4">{item.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
