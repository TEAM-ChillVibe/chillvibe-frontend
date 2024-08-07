import { Avatar, Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/useUserStore';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const RoundedButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  padding: theme.spacing(0.3, 1.5),
  borderRadius: '50px',
  color: '#000',
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

const AuthButtons = ({ user }) => {
  const { logout } = useUserStore(state => ({
    logout: state.logout,
  }));

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('정말 로그아웃하시겠습니까?');
    if (confirmLogout) {
      logout();
      localStorage.removeItem('access');
      localStorage.removeItem('user');
      handleMenuClose();
      navigate('/'); // 홈페이지로 리디렉션
    }
  };

  if (user) {
    // 로그인 상태인 경우
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pl: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="white">
            {user.nickname}
          </Typography>
          <Avatar
            alt={user.nickname}
            src={user.profileUrl || '/static/images/avatar/placeholder.jpg'}
            sx={{ width: 24, height: 24, cursor: 'pointer' }}
            onClick={handleMenuOpen}
          />
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              bgcolor: '#fff',
              color: '#000',
              borderRadius: 1,
              marginTop: 1.5,
              paddingX: 1,
            },
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem
            component={Link}
            to="/my-page"
            onClick={handleMenuClose}
            sx={{
              fontSize: '0.8rem',
              justifyContent: 'flex-end',
            }}
          >
            My Page
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            sx={{
              fontSize: '0.8rem',
              justifyContent: 'flex-end',
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  // 비로그인 상태인 경우
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pl: 1 }}>
      <Link
        to="/signup"
        style={{
          textDecoration: 'none',
          color: '#fff',
          fontSize: '0.875rem',
          borderBottom: '1px solid #fff',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        }}
      >
        Sign up
      </Link>
      <RoundedButton component={Link} to="/login">
        Login
      </RoundedButton>
    </Box>
  );
};

export default AuthButtons;
