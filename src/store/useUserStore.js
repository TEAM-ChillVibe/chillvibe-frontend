import { create } from 'zustand';
import { reauth } from '../api/auth/authApi';
import { devtools } from 'zustand/middleware';
import { myInfo } from '../api/user/userApi';

const useUserStore = create(
  devtools(
    set => ({
      user: null,
      isAuthenticated: false,

      initialize: async () => {
        const accessToken = localStorage.getItem('access');
        if (accessToken) {
          try {
            const userData = await reauth();
            set({ user: userData, isAuthenticated: true });
          } catch (error) {
            set({ user: null, isAuthenticated: false });
          }
        }
      },

      // 내 정보 초기화
      fetchMyInfo: async () => {
        try {
          const userData = await myInfo();
          set({ user: userData, isAuthenticated: true });
        } catch (error) {
          set({ user: null, isAuthenticated: false });
        }
      },

      login: user => {
        set({ user, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      setUser: user => {
        set({ user });
      },

      clearUser: () => {
        set({ user: null });
      },
    }),
    { name: 'UserStore' },
  ),
);

export default useUserStore;
