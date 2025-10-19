import { create } from 'zustand';

interface LoaderCount {
  count: number;
  increment: () => void;
  decrement: () => void;
}


export const useLoaderStore = create<LoaderCount>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: (state.count || 0) + 1 })),
  decrement: () => set((state) => ({ count: (state.count || 0) - 1 })),
}));


export default useLoaderStore;
