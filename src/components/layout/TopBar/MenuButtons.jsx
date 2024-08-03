import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const MenuButtons = () => {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button
        color="inherit"
        component={Link}
        to="/discover"
        sx={{ textTransform: 'none' }}
      >
        Discover
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/all-tags"
        sx={{ textTransform: 'none' }}
      >
        All Tags
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/popular-tags"
        sx={{ textTransform: 'none' }}
      >
        Popular Tags
      </Button>
    </Box>
  );
};

export default MenuButtons;
