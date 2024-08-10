import { Box, Typography, Button } from '@mui/material';
import BaseContainer from '../../components/layout/BaseContainer';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ errorCode, message }) => {
  const navigate = useNavigate();

  // 홈으로 돌아가는 함수
  const goHome = () => {
    navigate('/');
  };

  return (
    <BaseContainer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column', // 자식 요소들을 세로 방향으로 나열
          justifyContent: 'center', // 수평 중앙 정렬
          alignItems: 'center', // 수직 중앙 정렬
          mx: '20%',
          my: '20%',
          gap: 4,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: '6rem',
            fontWeight: 'bold',
          }}
        >
          {errorCode}
        </Typography>
        <Typography>{message}</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: 'darkgray', // 버튼 호버 시 배경색
            },
          }}
          onClick={goHome}
        >
          Back to Home
        </Button>
      </Box>
    </BaseContainer>
  );
};

export default ErrorPage;
