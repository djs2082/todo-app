import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type User = {
	id?: string | number;
	email?: string;
	firstName?: string;
	lastName?: string;
	accountName?: string;
}

export interface UserState {
	isSignedIn: boolean;
	user: User | null;
	setSignedIn: (val: boolean) => void;
	setUser: (user: User | null) => void;
	signIn: (user?: User) => void;
	signOut: () => void;
	updateUser: (patch: Partial<User>) => void;
}

export const useUserStore = create<UserState>()(
	persist(
		(set, get) => ({
			isSignedIn: false,
			user: null,

			setSignedIn: (val) => set({ isSignedIn: val }),
			setUser: (user) => set({ user }),

			signIn: (user) => set({ isSignedIn: true, user: user ?? get().user }),
			signOut: () => set({ isSignedIn: false, user: null }),

			updateUser: (patch) => {
				const current = get().user ?? {};
				set({ user: { ...current, ...patch } });
			}
		}),
		{
			name: 'user-store',
			storage: createJSONStorage(() => (typeof window !== 'undefined' ? window.localStorage : undefined as any)),
			partialize: (state) => ({ isSignedIn: state.isSignedIn, user: state.user }),
		}
	)
);

export default useUserStore;
