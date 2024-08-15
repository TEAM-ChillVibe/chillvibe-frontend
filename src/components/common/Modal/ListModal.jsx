import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const ListModal = ({
  open,
  onClose,
  title,
  description,
  options,
  selectedValue,
  onSelect,
  primaryButtonText,
  onPrimaryClick,
  secondaryButtonText,
  onSecondaryClick,
  primaryButtonDisabled,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="list-modal-title"
      aria-describedby="list-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          minWidth: '450px',
          bgcolor: '#1f1f1f',
          borderRadius: 1,
          boxShadow: 24,
          py: 4,
          px: 6,
        }}
      >
        <Typography
          id="list-modal-title"
          variant="modalTitle"
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          {title}
        </Typography>
        <Typography
          id="list-modal-description"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 3,
            whiteSpace: 'pre-line',
            textAlign: 'center',
          }}
        >
          {description}
        </Typography>
        <Box
          sx={{
            mt: 5,
            maxHeight: '350px',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px', // 스크롤바 너비
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#D8A1F0', // 스크롤바 색상
              borderRadius: '6px', // 스크롤바 모서리 둥글기
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#1f1f1f', // 스크롤바 트랙 색상
            },
          }}
        >
          <List>
            {options.length > 0 ? (
              options.map((option, index) => (
                <ListItem
                  button
                  key={index}
                  selected={option.value === selectedValue}
                  onClick={() => onSelect(option.value)}
                >
                  <ListItemIcon>
                    <MusicNoteIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={option.label} />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="플레이리스트 없음" />
              </ListItem>
            )}
          </List>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, gap: 1 }}>
          <Button onClick={onSecondaryClick} color="inherit">
            {secondaryButtonText}
          </Button>
          <Button
            onClick={onPrimaryClick}
            variant="contained"
            color="primary"
            disabled={primaryButtonDisabled}
          >
            {primaryButtonText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ListModal;
