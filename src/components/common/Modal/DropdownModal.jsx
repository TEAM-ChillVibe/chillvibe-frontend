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
  primaryButtonDisabled,
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
          bgcolor: '#1f1f1f',
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
            mt: 3,
            whiteSpace: 'pre-line', // 줄바꿈을 문자열에 포함
            textAlign: 'center',
          }}
        >
          {description}
        </Typography>
        <Box sx={{ mt: 5 }}>
          <FormControl fullWidth>
            <InputLabel>Playlists</InputLabel>
            <Select value={selectedValue} onChange={onChange} label="Playlists">
              {options.length > 0 ? (
                options.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>플레이리스트 없음</MenuItem>
              )}
            </Select>
          </FormControl>
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

export default DropdownModal;
