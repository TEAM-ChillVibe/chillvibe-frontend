import { Fab } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from 'react-router-dom';
import useMusicPlayerStore from '../../../store/useMusicPlayerStore';

const NewPostButton = () => {
  const navigate = useNavigate();
  const { isVisible: isMusicPlayerVisible } = useMusicPlayerStore();

  const handleClick = () => {
    navigate('/new-post');
  };

  return (
    <Fab
      size="medium"
      // color="secondary"
      aria-label="new post"
      onClick={handleClick}
      sx={{
        position: 'fixed',
        bottom: isMusicPlayerVisible ? 100 : 24,
        left: 80,
      }}
    >
      <CreateIcon />
    </Fab>
  );
};

export default NewPostButton;
