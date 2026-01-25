import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'mordor';

const STORAGE_KEY = 'theme';

function getInitialTheme(): Theme {
    if (!browser) return 'light';

    const stored = globalThis.localStorage.getItem(STORAGE_KEY);
    if ( stored === 'light' || stored === 'dark' || stored === 'mordor') {
        return stored;
    }

    return 'light';
}

class ThemeStore {
    #current = $state<Theme>(getInitialTheme());

    constructor() {
        if (browser) {
            this.#apply(this.#current);
        }
    }

    get current() {
        return this.#current;
    }

    toggle() {
        // TODO: ajouter de maniere aléatoire le theme mordor (~10% des cas) une fois qu'il sera implémenté
        this.#current = this.#current === 'light' ? 'dark' : 'light';
        if (browser) {
            globalThis.localStorage.setItem(STORAGE_KEY, this.#current);
            this.#apply(this.#current);
        }
    }

    #apply(theme: Theme) {
        if (!browser) return;

        const root = globalThis.document.documentElement;

        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }
}

export const theme = new ThemeStore();
