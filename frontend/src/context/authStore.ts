import {create} from 'zustand';

interface AuthState {
    token: string | null;
    alias: string | null;
    setAuth: (token: string, alias: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    alias: null,
    setAuth: (token, alias) => set({token, alias}),
    logout: () => set({token: null, alias: null}),
}));
