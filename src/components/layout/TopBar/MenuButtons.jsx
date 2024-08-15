import { Box, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const MenuButtons = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button
        color={currentPath === '/discover' ? 'primary' : 'inherit'}
        component={Link}
        to="/discover"
        sx={{ textTransform: 'none' }}
      >
        Discover
      </Button>
      <Button
        color={currentPath === '/featured-tracks' ? 'primary' : 'inherit'}
        component={Link}
        to="/featured-tracks"
        sx={{ textTransform: 'none' }}
      >
        Featured Tracks
      </Button>
      <Button
        color={currentPath === '/all-tags' ? 'primary' : 'inherit'}
        component={Link}
        to="/all-tags"
        sx={{ textTransform: 'none' }}
      >
        All Tags
      </Button>
      <Button
        color={currentPath === '/popular-tags' ? 'primary' : 'inherit'}
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
