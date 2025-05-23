import api from '../../../services/api';
import type {LoginData, RegisterData,} from "../types/auth.ts";


const register = async (userData: RegisterData) => {
    const response = await api.post('/register', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const login = async (userData: LoginData) => {
    const response = await api.post('/login', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    register,
    login,
    logout,
};

export default authService;