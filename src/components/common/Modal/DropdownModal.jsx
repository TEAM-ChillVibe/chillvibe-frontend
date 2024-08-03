import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from '@mui/material';

const DropdownModal = ({
  open,
  onClose,
  title,
  description,
  options,
  selectedValue,
  onChange,
  primaryButtonText,
  onPrimaryClick,
  secondaryButtonText,
  onSecondaryClick,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="dropdown-modal-title"
      aria-describedby="dropdown-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          minWidth: '450px',
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          py: 4,
          px: 6,
        }}
      >
        <Typography
          id="dropdown-modal-title"
          variant="modalTitle"
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          {title}
        </Typography>
        <Typography
          id="dropdown-modal-description"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
            whiteSpace: 'pre-line', // 줄바꿈을 문자열에 포함
            textAlign: 'center',
          }}
        >
          {description}
        </Typography>
        <Box sx={{ mt: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Playlists</InputLabel>
            <Select value={selectedValue} onChange={onChange} label="Playlists">
              {options.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
          <Button onClick={onSecondaryClick} color="inherit">
            {secondaryButtonText}
          </Button>
          <Button onClick={onPrimaryClick} variant="contained" color="primary">
            {primaryButtonText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DropdownModal;
