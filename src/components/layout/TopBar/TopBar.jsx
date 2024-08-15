import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthButtons from './AuthButtons';
import useUserStore from '../../../store/useUserStore';
import SearchBox from './SearchBox';
import MenuButtons from './MenuButtons';
import logoS from '../../../assets/logoImg/ChillVibeT_logoS.png';

const Topbar = () => {
  const user = useUserStore(state => state.user); // 현재 사용자 정보 가져오기

  return (
    <AppBar
      position="sticky"
      sx={{
        px: '13%',
        py: theme => theme.spacing(1),
        backgroundColor: 'black',
        boxShadow: '0px 4px 30px rgba(255, 255, 255, 0.25)',
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
          <img
            src={logoS}
            alt="Logo"
            style={{
              width: '130px',
              height: 'auto',
              paddingTop: 3,
            }}
          />
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
