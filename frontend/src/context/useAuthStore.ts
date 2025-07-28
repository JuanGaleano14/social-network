import {create} from 'zustand'

type AuthStore = {
    token: string | null
    user: any
    login: (token: string, user: any) => void
    logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    token: null,
    user: null,
    login: (token, user) => set({token, user}),
    logout: () => {
        localStorage.removeItem('token');
        set({token: null, user: null});
    },
}))
