import { Box } from '@mui/material';

const BaseContainer = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column', // 자식 요소들을 세로 방향으로 나열
        justifyContent: 'center', // 수평 중앙 정렬
        alignItems: 'center', // 수직 중앙 정렬
        mx: '20%',
        my: '60px',
        px: '16px',
        py: '24px',
        gap: 4,
      }}
    >
      {children}
    </Box>
  );
};

export default BaseContainer;
