import {useFormik} from "formik";
import {loginSchema} from "@/utils/validationSchemas.ts";
import {useEffect, useState} from "react";
import useAuthStore from "@/features/auth/store/authStore.ts";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";

export const useLoginForm = () => {
    const {isLoading, error, login, clearError} = useAuthStore();
    const [formError, setFormError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            setFormError(error);
        }
    }, [error]);


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            setFormError(null);
            clearError();

            try {
                await login(values);
                toast.success("Login successful!");
                navigate('/todos')

            } catch (err: any) {
                toast.error("Login failed:", err);
                setFormError(err.message);
            }
        },
    });

    return {
        formik,
        isLoading,
        formError,
    };
}