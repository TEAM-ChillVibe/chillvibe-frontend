import { Avatar, Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
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
  const { clearUser } = useUserStore(state => ({
    clearUser: state.clearUser,
  }));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.reload(); // 페이지 새로고침
    handleMenuClose();
  };

  if (user) {
    // 로그인 상태인 경우
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pl: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="white">
            {user.name}
          </Typography>
          <Avatar
            alt={user.name}
            src={user.profilePicture || '/static/images/avatar/placeholder.jpg'}
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
        to="/sign-up"
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
