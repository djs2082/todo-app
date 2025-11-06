import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, UserSettings, UserState } from './types';

// Re-export types for backward compatibility
export type { User, UserSettings, UserState };

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
