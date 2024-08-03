import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="body2">
        © ChillVibe. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
