import { axiosWithToken, axiosWithoutToken } from '../../axios';

// 유저 정보
export const userInfo = async userId => {
  try {
    const response = await axiosWithoutToken.get(`/api/userpage`, {
      params: { userId },
    });
    return response;
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
