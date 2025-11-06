import { create } from 'zustand';
import type { LoaderState } from '../../../types';

export const useLoaderStore = create<LoaderState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: (state.count || 0) + 1 })),
  decrement: () => set((state) => ({ count: (state.count || 0) - 1 })),
}));


export default useLoaderStore;
