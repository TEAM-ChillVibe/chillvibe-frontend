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
  primaryButtonStyle = 'primary',
  disablePrimaryButton = false, // 버튼 비활성화 (저장 시)
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
          bgcolor: '#1f1f1f',
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
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, gap: 1 }}>
          <Button onClick={onSecondaryClick} color="inherit">
            {secondaryButtonText}
          </Button>
          <Button
            onClick={onPrimaryClick}
            variant="contained"
            color={primaryButtonStyle}
            disabled={disablePrimaryButton} // 비활성화 상태 적용
          >
            {primaryButtonText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SimpleModal;
