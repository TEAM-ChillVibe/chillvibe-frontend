import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const SimpleModal = ({
  open,
  onClose,
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="simple-modal-title"
          variant="modalTitle"
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          {title}
        </Typography>
        <Typography
          id="form-modal-description"
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
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button onClick={onSecondaryClick} color="inherit" sx={{ mr: 1 }}>
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

export default SimpleModal;
