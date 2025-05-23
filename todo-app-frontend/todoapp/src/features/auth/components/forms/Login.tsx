import {cn} from "@/lib/utils.ts"
import {Button} from "@/components/ui/button.tsx"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Label} from "@/components/ui/label.tsx"
import * as React from "react";
import {useState} from "react";
import {Eye, EyeOff, Loader2} from "lucide-react";
import {Link} from "react-router-dom";
import {useLoginForm} from "@/features/auth/hooks/useLoginForm.ts";

export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentPropsWithoutRef<"div">) {
    const {formik, isLoading, formError} = useLoginForm();
    const [showPassword, setShowPassword] = useState(false);


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col gap-6">
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
                                        type={showPassword ? "text" : "password"}
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
                                        Logging In...
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" className="underline underline-offset-4">
                            Register
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
