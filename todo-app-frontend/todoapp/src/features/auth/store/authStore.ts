import {create} from "zustand/react";
import axios from "axios";
import authService from "@/features/auth/services/authService.ts";
import type {AuthState, LoginData, RegisterData, User} from "@/features/auth/types/auth.ts";


const getUserFromLocalStorage = (): User | null => {
    try {
        const user = localStorage.getItem('user');
        return user ? (JSON.parse(user) as User) : null;
    } catch (error) {
        console.error('Error parsing user from localStorage', error);
        return null;
    }
}

const useAuthStore = create<AuthState>((set) => ({
    user: getUserFromLocalStorage(),
    isLoading: false,
    error: null,

    register: async (userData: RegisterData) => {
        set({isLoading: true, error: null});

        try {
            const user = await authService.register(userData);
            set({user, isLoading: false})
            return user;
        } catch (error: unknown) {
            let message: string = 'An unexpected error occurred';
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data && error.response.data.message) {
                    message = error.response.data.message;
                } else if (error.message) {
                    message = error.message;
                }
            } else if (error instanceof Error) {
                message = error.message;
            } else if (typeof error === 'string') {
                message = error;
            }
            set({isLoading: false, error: message});
            throw error;
        }
    },

    login: async (userData: LoginData) => {
        set({isLoading: true, error: null});

        try {
            const user = await authService.login(userData);
            set({user, isLoading: false})
            return user;
        } catch (error: unknown) {
            let message: string = 'An unexpected error occurred';
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data && error.response.data.message) {
                    message = error.response.data.message;
                } else if (error.message) {
                    message = error.message;
                }
            } else if (error instanceof Error) {
                message = error.message;
            } else if (typeof error === 'string') {
                message = error;
            }
            set({isLoading: false, error: message});
            throw error;
        }
    },
    logout: () => {
        authService.logout();
        set({user: null, isLoading: false, error: null});
    },

    clearError: () => set({error: null}),
}));

export default useAuthStore;