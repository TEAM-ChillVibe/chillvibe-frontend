import { Avatar, Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/useUserStore';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { signout } from '../../../api/auth/authApi';
import SimpleModal from '../../common/Modal/SimpleModal';
import SnackbarAlert from '../../common/Alert/SnackbarAlert';

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

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error',
  });

  const handleLogout = async () => {
    try {
      // 로그아웃 요청
      await signout();

      // 클라이언트 측 저장소와 쿠키 정리
      localStorage.clear();

      // 상태 업데이트 (로그아웃 상태로 변경)
      logout();

      handleMenuClose();
      navigate('/'); // 홈페이지로 리디렉션
    } catch (error) {
      logout();
      setSnackbar({
        open: true,
        message: '로그아웃 중 오류가 발생했습니다. 다시 시도해 주세요.',
        severity: 'error',
      });
    } finally {
      handleModalClose();
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
            onClick={handleModalOpen}
            sx={{
              fontSize: '0.8rem',
              justifyContent: 'flex-end',
            }}
          >
            Logout
          </MenuItem>
        </Menu>
        <SimpleModal
          open={modalOpen}
          onClose={handleModalClose}
          description="로그아웃하시겠습니까?"
          primaryButtonText="로그아웃"
          secondaryButtonText="취소"
          onPrimaryClick={handleLogout}
          onSecondaryClick={handleModalClose}
          primaryButtonStyle={'error'}
        />

        <SnackbarAlert
          open={snackbar.open}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          message={snackbar.message}
          severity={snackbar.severity}
        />
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
