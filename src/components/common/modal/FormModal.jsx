import React from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';

const FormModal = ({
  open,
  onClose,
  title,
  description,
  formFields,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="form-modal-title"
      aria-describedby="form-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          py: 4,
          px: 6,
        }}
      >
        <Typography
          id="form-modal-title"
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
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 4 }}>
          {formFields.map((field, index) => (
            <TextField
              key={index}
              label={field.label}
              variant="outlined"
              fullWidth
              margin="dense"
              type={field.type || 'text'}
              value={field.value || ''}
              onChange={field.onChange || (() => {})}
            />
          ))}
        </Box>
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

export default FormModal;
