import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserSettings = {
	id: number,
	key: string,
	value: string
}

export type User = {
	id?: string | number;
	email?: string;
	firstName?: string;
	lastName?: string;
	accountName?: string;
	settings?: UserSettings[];
}

export interface UserState {
	isSignedIn: boolean;
	user: User | null;
	setSignedIn: (val: boolean) => void;
	setUser: (user: User | null) => void;
	signIn: (user?: User) => void;
	signOut: () => void;
	updateUser: (patch: Partial<User>) => void;
	userTheme: () => 'light' | 'dark';
	updateUserTheme: (theme: 'light' | 'dark') => void;
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
			},
			userTheme: () => {
				const themeSetting = get().user?.settings?.find(s => s.key === 'theme');
				return themeSetting?.value as 'light' | 'dark';
			},
			updateUserTheme: (theme: 'light' | 'dark') => {
				const current = get().user;
				if (!current) return;
				const settings = current.settings ? [...current.settings] : [];
				const themeSettingIndex = settings.findIndex(s => s.key === 'theme');
				if (themeSettingIndex !== -1) {
					settings[themeSettingIndex] = { ...settings[themeSettingIndex], value: theme };
				}
				set({ user: { ...current, settings } });
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
