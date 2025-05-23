import {cn} from "@/lib/utils.ts"
import {Button} from "@/components/ui/button.tsx"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Label} from "@/components/ui/label.tsx"
import * as React from "react";
import {useState} from "react";
import {Eye, EyeOff, Loader2} from "lucide-react";
import {Link} from "react-router-dom";
import {useRegisterForm} from "@/features/auth/hooks/useRegisterForm.ts";

export function RegisterForm({
                                 className,
                                 ...props
                             }: React.ComponentPropsWithoutRef<"div">) {
    const {formik, isLoading, formError} = useRegisterForm();
    const [showPassword, setShowPassword] = useState(false);


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Enter your details below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="name"
                                    name="name"
                                    placeholder="John Doe"
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="text-red-500 text-sm text-start">{formik.errors.name}</div>
                                ) : null}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="johndoe@example.com"
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-red-500 text-sm text-start">{formik.errors.email}</div>
                                ) : null}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                        onClick={toggleShowPassword}
                                    >
                                        {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                                    </button>
                                </div>
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-red-500 text-sm text-start">{formik.errors.password}</div>
                                ) : null}
                            </div>

                            {formError && (
                                <div className="text-red-500 text-sm text-start">{formError}</div>
                            )}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        Creating Account...
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="underline underline-offset-4">
                                Login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
