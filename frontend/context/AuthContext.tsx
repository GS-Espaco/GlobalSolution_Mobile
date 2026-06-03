import { createContext, useContext, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

export function AuthProvider({ children }: any) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function login(token: string) {
        console.log(token);
        setIsAuthenticated(true);
    }

    function logout() {
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}