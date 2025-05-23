import {AuthLayout} from "@/features/auth/components/AuthLayout.tsx";
import {LoginForm} from "@/features/auth/components/forms/Login.tsx";

const LoginPage = () => {
    return (
       <AuthLayout>
           <LoginForm />
       </AuthLayout>
    )
}
export default LoginPage
