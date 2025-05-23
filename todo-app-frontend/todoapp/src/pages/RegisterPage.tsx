import {AuthLayout} from "@/features/auth/components/AuthLayout.tsx";
import {RegisterForm} from "@/features/auth/components/forms/Register.tsx";

const RegisterPage = () => {
    return (
        <AuthLayout>
            <RegisterForm/>
        </AuthLayout>
    )
}
export default RegisterPage
