import {
  AppBar,
  Box,
  Button,
  InputBase,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center', // 아이콘과 입력 필드 수직 정렬
  borderBottom: `1px solid ${theme.palette.grey[400]}`, // 하단선
  width: 'auto',
  marginLeft: theme.spacing(1),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  border: 'none',
  // 실제 입력 필드
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch', // 기본 문자 너비 12개
      '&:focus': {
        width: '20ch', // 포커스 문자 너비 20개
      },
    },
    '&::placeholder': {
      fontSize: '0.875rem',
    },
  },
}));

const Topbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        px: '10%',
        py: theme => theme.spacing(1),
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
          <Typography variant="h6" component="div">
            ChillVibe
          </Typography>
        </Link>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* 메뉴 */}
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

          {/* 검색창 */}
          <Search>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </Search>

          {/* 로그인/회원가입 */}
          <Box sx={{ position: 'flex', gap: 1 }}>
            <Button
              color="inherit"
              component={Link}
              to="/sign-up"
              sx={{ textTransform: 'none' }}
            >
              Sign up
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{ textTransform: 'none' }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
