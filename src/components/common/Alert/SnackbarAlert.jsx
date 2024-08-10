import { Alert, Snackbar } from '@mui/material';
import useMusicPlayerStore from '../../../store/useMusicPlayerStore';

const SnackbarAlert = ({ open, onClose, message, severity }) => {
  const { isVisible: isMusicPlayerVisible } = useMusicPlayerStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{
        bottom: isMusicPlayerVisible ? 100 : 0,
      }}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
