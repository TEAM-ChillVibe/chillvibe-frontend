import axios from 'axios';
import useUserStore from './store/useUserStore';
import { signout } from './api/auth/authApi';
import { useNavigate } from 'react-router-dom';

// 토큰이 없는 요청을 위한 인스턴스
const axiosWithoutToken = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 기본 인스턴스
const axiosWithToken = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosWithToken.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// 응답 인터셉터
axiosWithToken.interceptors.response.use(
  response => response,
  async error => {
    if (!error.response) {
      return Promise.reject(error);
    }

    // 에러가 발생하면 기존의 요청을 담아둠
    const originalRequest = error.config;
    const status = error.response?.status;

    // 401에러 발생시 요청이 재시도된 적이 있는지 확인
    // 무한루프 방지
    if (status === 401 && !originalRequest._retry) {
      // 첫번째 재시도라면 재시도 값을 true로 바꿈
      originalRequest._retry = true;

      try {
        // 토큰 재발급 요청
        const response = await axiosWithoutToken.post('/api/reissue');

        // 재발급 응답 헤더에 포함된 access토큰 가져와서
        const newAccessToken = response.headers['authorization'].split(' ')[1];

        // localStorage에 세팅
        localStorage.setItem('access', newAccessToken);

        // axiosWithToken의 헤더 디폴트값에 새로 발급받은 access토큰을 넣고 초기화
        axiosWithToken.defaults.headers['Authorization'] =
          `Bearer ${newAccessToken}`;

        // 기존의 요청 재시도
        return axiosWithToken(originalRequest);
      } catch (refreshError) {
        // 토큰 재발급 실패시 동작
        localStorage.clear();

        const { clearUser, logout } = useUserStore.getState();
        clearUser();
        logout();
        await signout();
        alert('로그인 세션이 만료되었습니다. 다시 로그인해 주세요.');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export { axiosWithToken, axiosWithoutToken };
