import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthButtons from './AuthButtons';
import useUserStore from '../../../store/useUserStore';
import SearchBox from './SearchBox';
import MenuButtons from './MenuButtons';
import { styled } from '@mui/material/styles';
import CloudIcon from '@mui/icons-material/Cloud';

const LogoTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'TheJamsil5Bold',
  fontSize: '1.3rem',
  fontWeight: 800,
}));

const Topbar = () => {
  const user = useUserStore(state => state.user); // 현재 사용자 정보 가져오기

  return (
    <AppBar
      position="sticky"
      sx={{
        px: '13%',
        py: theme => theme.spacing(1),
        backgroundColor: '#000',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}
      >
        {/* 로고 */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <CloudIcon />
            <LogoTypography variant="h6" sx={{ pt: 0.5 }}>
              ChillVibe
            </LogoTypography>
          </Box>
        </Link>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {/* 메뉴 */}
          <MenuButtons />
          {/* 검색창 */}
          <SearchBox />
          {/* 로그인/회원가입 */}
          <AuthButtons user={user} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
