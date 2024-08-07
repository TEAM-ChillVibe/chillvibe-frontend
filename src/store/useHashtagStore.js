import create from 'zustand';

const useHashtagStore = create(set => ({
  selectedHashtag: null,
  setSelectedHashtag: hashtag => set({ selectedHashtag: hashtag }),
}));

export default useHashtagStore;
