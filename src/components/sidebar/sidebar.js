import { Drawer, List, ListItemButton, ListItemText, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 220;

const Sidebar = ({ open }) => {
  const drawerContent = (
    <>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#0a152cff',
          color: 'white',
        }}>
        <Button variant="h6" href="/">
          TASK
        </Button>
      </Toolbar>

      <List>
        <ListItemButton
          component={Link}
          to="/users"
          sx={{
            '&:hover': { bgcolor: '#00347eff' },
          }}>
          <ListItemText primary="Users" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/products"
          sx={{
            '&:hover': { bgcolor: '#00347eff' },
          }}>
          <ListItemText primary="Products" />
        </ListItemButton>
      </List>
    </>
  );

  return (
    <>
      {open && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              backgroundColor: '#0c1730ff',
              color: '#fff',
              transition: 'all 0.3s ease',
            },
          }}>
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};
export default Sidebar;
