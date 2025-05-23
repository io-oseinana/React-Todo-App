export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
}

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    register: (userData: RegisterData) => Promise<User>;
    login: (userData: LoginData) => Promise<User>;
    logout: () => void;
    clearError: () => void;
}


export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}