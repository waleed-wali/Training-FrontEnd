import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ handleToggle }) => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#0a152cff' }}>
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={handleToggle} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          My App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
