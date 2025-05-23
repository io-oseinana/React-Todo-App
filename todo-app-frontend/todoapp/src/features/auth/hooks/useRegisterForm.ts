import {useFormik} from "formik";
import {registerSchema} from "@/utils/validationSchemas.ts";
import {useEffect, useState} from "react";
import useAuthStore from "@/features/auth/store/authStore.ts";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";

export const useRegisterForm = () => {
    const {isLoading, error, register, clearError} = useAuthStore();
    const [formError, setFormError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            setFormError(error);
        }
    }, [error]);


    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            setFormError(null);
            clearError();

            try {
                await register(values);
                toast.success("Account created successful!");
                navigate('/login')

            } catch (err: any) {
                toast.error("Creating account failed:", err);
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