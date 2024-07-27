import { Box, Typography } from '@mui/material';
import BaseContainer from '../../components/layout/BaseContainer';

function TestPage() {
  return (
    <BaseContainer>
      <Typography
        sx={{
          border: '1px solid #000',
        }}
      >
        container test container test container test container test container
        test container test container test container test
      </Typography>
      <Box
        sx={{
          height: '1000px',
        }}
      >
        empty box
      </Box>
    </BaseContainer>
  );
}

export default TestPage;
