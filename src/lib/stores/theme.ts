import { writable } from 'svelte/store';

export type Theme = 'minas-tirith' | 'minas-morgul';

const STORAGE_KEY = 'theme';

function getInitialTheme(): Theme {
	if (typeof globalThis.window === 'undefined') {
		return 'minas-tirith'; // Default pour SSR
	}

	const stored = globalThis.localStorage.getItem(STORAGE_KEY);
	if (stored === 'minas-tirith' || stored === 'minas-morgul') {
		return stored;
	}

	// Détecter la préférence système
	if (globalThis.window.matchMedia) {
		const prefersDark = globalThis.window.matchMedia('(prefers-color-scheme: dark)').matches;
		return prefersDark ? 'minas-morgul' : 'minas-tirith';
	}

	return 'minas-tirith';
}

function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>(getInitialTheme());

	return {
		subscribe,
		set: (theme: Theme) => {
			if (typeof globalThis.window !== 'undefined' && globalThis.localStorage) {
				globalThis.localStorage.setItem(STORAGE_KEY, theme);
			}
			set(theme);
		},
		toggle: () => {
			update((current) => {
				const newTheme = current === 'minas-tirith' ? 'minas-morgul' : 'minas-tirith';
				if (typeof globalThis.window !== 'undefined' && globalThis.localStorage) {
					globalThis.localStorage.setItem(STORAGE_KEY, newTheme);
				}
				return newTheme;
			});
		}
	};
}

export const theme = createThemeStore();
