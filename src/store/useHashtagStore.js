import create from 'zustand';

const useHashtagStore = create(set => ({
  // 다중 선택 모드에서 사용하는 상태와 함수
  multiSelectedHashtags: [], // 다중 선택 모드에서 사용
  multiToggleHashtag: hashtag =>
    set(state => {
      const newSelected = new Set(state.multiSelectedHashtags);
      if (newSelected.has(hashtag)) {
        newSelected.delete(hashtag);
      } else {
        if (newSelected.size < 5) {
          // 최대 5개 제한
          newSelected.add(hashtag);
        }
      }
      return { multiSelectedHashtags: Array.from(newSelected) };
    }),
  multiSetSelectedHashtags: hashtags =>
    set({ multiSelectedHashtags: hashtags }),

  // 단일 선택 모드에서 사용하는 상태와 함수
  singleSelectedHashtag: null, // 단일 선택 모드에서 사용
  singleSetSelectedHashtag: hashtag => set({ singleSelectedHashtag: hashtag }),

  // 모드 설정
  mode: 'single', // 선택 모드 ('single' or 'multi')
  setMode: mode => set({ mode }),
}));

export default useHashtagStore;
