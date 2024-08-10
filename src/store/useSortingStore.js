import create from 'zustand';

const useSortingStore = create(set => ({
  sortOrder: 'latest',
  setSortOrder: newOrder => set({ sortOrder: newOrder }),
}));

export default useSortingStore;
