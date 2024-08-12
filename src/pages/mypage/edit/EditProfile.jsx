import BaseContainer from '../../../components/layout/BaseContainer';
import {
  Avatar,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Switch,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { AddPhotoAlternate } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllHashtags } from '../../../api/hashtag/hashtagApi';
import HashtagChips from '../../../components/common/HashtagChips';
import { editProfile, myInfo } from '../../../api/user/userApi';
import SnackbarAlert from '../../../components/common/Alert/SnackbarAlert';

const EditProfile = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [hashtagIds, setSelectedHashtags] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  useEffect(() => {
    // 사용자 정보를 가져오는 비동기 함수
    const fetchUserData = async () => {
      try {
        const response = await myInfo();
        const userData = response;

        // 사용자 정보 상태 업데이트
        setEmail(userData.email);
        setNickname(userData.nickname);
        setIntroduction(userData.introduction || '');
        setImagePreview(userData.profileUrl || '');
        setIsPublic(userData.public);
        const userHashtags = userData.hashtags.map(hashtag => hashtag.id);
        setSelectedHashtags(userHashtags);
      } catch (error) {
        setSnackbarMessage('사용자 정보를 가져오는 데 실패했습니다.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    };

    fetchUserData();
  }, []);

  const handleHashtagClick = selectedHashtags => {
    setSelectedHashtags(selectedHashtags);
  };

  const handleImageChange = event => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleSubmit = async event => {
    event.preventDefault();

    // 사용자 정보 업데이트 API 호출
    try {
      const formData = new FormData();
      const userUpdateDto = {
        nickname,
        introduction,
        hashtagIds,
        isPublic,
      };

      formData.append('userUpdateDto', JSON.stringify(userUpdateDto));

      if (profileImage) {
        formData.append('profileImg', profileImage);
      }

      if (window.confirm('정말로 회원정보를 수정하시겠습니까?')) {
        await editProfile(formData);
        setSnackbarMessage('회원정보가 수정되었습니다.');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/my-page');
        }, 1500);
      }
    } catch (error) {
      setSnackbarMessage('프로필 업데이트에 실패했습니다. 다시 시도해 주세요.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const isFormValid = email && nickname;

  const handleChangePassword = () => {
    navigate('/edit-password'); // 비밀번호 변경 페이지로 이동
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <BaseContainer>
      <Box
        sx={{
          width: '70%',
          minWidth: '350px',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          m: '0 auto',
          p: 2,
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* 프로필 이미지 추가 영역 */}
          <Box
            sx={{
              position: 'relative',
              width: 150,
              height: 150,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 4,
              mx: 'auto',
            }}
          >
            <Avatar sx={{ width: 150, height: 150 }} src={imagePreview} />
            <IconButton
              component="label"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                bgcolor: 'background.paper',
                borderRadius: '50%',
              }}
            >
              <AddPhotoAlternate />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </IconButton>
          </Box>
          {/* 회원정보 입력 필드 */}
          <TextField
            label="닉네임"
            fullWidth
            required
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            margin="normal"
          />
          <TextField
            label="이메일"
            fullWidth
            value={email}
            InputProps={{
              readOnly: true,
            }}
            margin="normal"
          />
          <TextField
            label="소개글"
            fullWidth
            multiline
            rows={5}
            value={introduction}
            onChange={e => setIntroduction(e.target.value)}
            margin="normal"
          />
          <HashtagChips
            fetchHashtags={fetchAllHashtags}
            onChipClick={handleHashtagClick}
            multiSelectMode={true}
            selectedHashtags={hashtagIds}
          />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 5 }}
          >
            <FormControlLabel
              label="게시글 공개"
              labelPlacement="start"
              control={
                <Switch
                  checked={isPublic}
                  onChange={() => setIsPublic(prev => !prev)}
                />
              }
            />
          </Box>
          {/* 버튼 */}
          <Box sx={{ width: '100%', display: 'flex', mt: 5, gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{ flex: 1 }}
              size="large"
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ flex: 1 }}
              size="large"
              disabled={!isFormValid}
            >
              저장
            </Button>
          </Box>
        </form>
        <Button
          variant="text"
          fullWidth
          onClick={handleChangePassword}
          sx={{ flex: 1, my: 5 }}
          size="large"
        >
          비밀번호 변경
        </Button>
      </Box>
      <SnackbarAlert
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </BaseContainer>
  );
};

export default EditProfile;
