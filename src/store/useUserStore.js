import create from 'zustand';

const useUserStore = create(set => ({
  // 기본 상태: 비로그인 상태
  user: [],
  token: null,
  isAutehnticated: false,
  login: (user, token) => set({ user, token, isAutehnticated: true }),
  logout: () => set({ user: null, token: null, isAutehnticated: false }),

  // 기본 상태: 로그인 상태로 설정 (ui 확인용)
  // user: {
  //   name: 'John Doe', // 예시 사용자 이름
  // },

  // 사용자 정보를 설정하는 함수
  setUser: user => set({ user }),

  // 사용자 정보를 삭제하는 함수 (로그아웃 시 호출)
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
