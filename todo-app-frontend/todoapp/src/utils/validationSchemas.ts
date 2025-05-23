import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3characters long')
        .max(50, 'Name cannot exceed 50 characters'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long')
        .max(50, 'Password cannot exceed 50 characters'),
})

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
})

export const todoSchema = Yup.object().shape({
    text: Yup.string()
        .required('Todo text is required')
        .min(3, 'Todo text must be at least 3 characters')
        .max(100, 'Todo text cannot exceed 100 characters'),
})
