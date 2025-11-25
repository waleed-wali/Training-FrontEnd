import { Box } from '@mui/material';
import Header from '../Header/Header';
import Sidebar from '../sidebar/sidebar';
import { useState } from 'react';

const Layout = ({ children }) => {
  const [open, setOpen] = useState(true);

  const handleToggle = () => setOpen(!open);
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
      <Sidebar open={open} />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header handleToggle={handleToggle} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: '#f5f6fa',
            overflowY: 'auto',
          }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
export default Layout;
