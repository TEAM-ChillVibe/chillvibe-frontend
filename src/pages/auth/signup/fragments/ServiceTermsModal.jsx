import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React from 'react';
import { styled } from '@mui/material/styles';

// CustomBox with styled scrollbars
const CustomScrollBox = styled(Box)(({ theme }) => ({
  '&::-webkit-scrollbar': {
    width: '5px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.grey[200],
    borderRadius: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.primary.main,
    borderRadius: '8px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: theme.palette.primary.dark,
  },
}));

const ServiceTermsModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <CustomScrollBox
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: '1000px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflowY: 'auto',
          maxHeight: '80vh',
        }}
      >
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}
        >
          서비스 이용 동의서
        </Typography>
        <Box
          component="pre"
          sx={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            mb: 2,
            lineHeight: 1.6,
            fontFamily: 'Roboto, Arial, sans-serif',
            fontSize: '0.875rem',
            color: 'text.primary',
          }}
        >
          {`ChillVibe(이하 '회사'라고 합니다)는 관련 법령에 따라 귀하의 개인정보 보호에 최선을 다하고 있습니다. 회사는 다음과 같은 내용으로 개인정보를 수집 및 처리하고자 합니다.




다음의 내용을 자세히 읽어보시고 모든 내용을 이해하신 후에 동의 여부를 결정해주시기 바랍니다.





제1조(서비스 이용 목적)

이용자가 제공한 개인정보는 다음의 목적을 위해 활용되며, 목적 이외의 용도로는 사용되지 않습니다.

- 서비스 제공 및 관리
- 본인확인 및 인증
- 고객 지원 및 문의 응대
- 서비스 개선 및 맞춤형 서비스 제공
- 법적 의무 이행




제2조(개인정보 수집 항목)

회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.

- 성명, 주소, 전화번호, 이메일, 성별, 나이 및 생년월일




제3조(개인정보 보유 및 이용 기간)

수집한 개인정보는 이용자의 동의일로부터 서비스 이용 종료 후 3년간 보관 및 이용합니다. 개인정보 보유기간의 경과, 처리목적의 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.




제4조(동의 거부 및 제한)

귀하는 본 안내에 따른 개인정보 수집 및 이용에 대하여 동의를 거부할 권리가 있습니다. 다만, 개인정보 동의를 거부하시는 경우 일부 서비스의 이용에 제한이 있을 수 있습니다.


본인은 위의 약관 내용을 충분히 숙지하였으며, 위와 같이 개인정보를 수집·이용하는데 동의합니다.


개인정보 수집 및 이용에 동의함 □ 동의하지 않음 □




제5조(개인정보의 제3자 제공)

회사는 개인정보보호법에 근거하여 다음과 같은 내용으로 개인정보를 제3자에게 제공할 수 있습니다.

1. 개인정보를 제공 받는 제3자: ChillVibe 계열사 및 서비스 파트너

2. 개인정보 제공 목적: 서비스 제공 및 관리, 법적 의무 이행

3. 개인정보 제공 항목: 성명, 이메일, 전화번호 등 서비스 제공에 필요한 정보

4. 개인정보 보유 및 이용 기간: 개인정보 제공 목적 달성일까지

5. 개인정보 제공 거부 시 불이익: 일부 서비스 이용 제한

2024년 08월 17일`}
        </Box>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="primary"
          sx={{ mt: 2, display: 'block', margin: '0 auto' }}
        >
          닫기
        </Button>
      </CustomScrollBox>
    </Modal>
  );
};

export default ServiceTermsModal;
