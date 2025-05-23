import React from "react";

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
        <div className="w-full max-w-sm">
                {children}
            </div>
        </div>
    );
};