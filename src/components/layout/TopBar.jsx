import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

const Topbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        px: '10%',
        py: theme => theme.spacing(1),
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div">
          ChillVibe
        </Typography>
        <Box sx={{ position: 'absolute', right: 16 }}>
          <Button color="inherit">Sign up</Button>
          <Button color="inherit">Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
