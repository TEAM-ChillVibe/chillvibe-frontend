import { axiosWithToken, axiosWithoutToken } from '../../axios';

// 유저 정보
export const userInfo = async userId => {
  try {
    const response = await axiosWithToken.get(`/api/userpage/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// 나의 정보
export const myInfo = async () => {
  try {
    const response = await axiosWithToken.get(`/api/mypage`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 회원정보 수정
export const editProfile = async formData => {
  try {
    const response = await axiosWithToken.put('/api/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
