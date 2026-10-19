import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { LoginFormData, User } from "../api/types/auth.js";
import api from "../api/dummy-json-instance.js";

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (credentials: LoginFormData) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const response = await api.get<User>('/auth/me');
                setUser({ ...response.data, accessToken: token });
            } catch (error) {
                console.error("Session is expired or token not valid: ", error);
                localStorage.removeItem('token');
                setUser(null);
            }
            finally{ setLoading(false) }
        }
        checkToken();
    }, [])

    const login = async(creds:LoginFormData)=>{
        try {
            const response = await api.post<User>('auth/login',{
                username: creds.username,
                password: creds.password,
                expiresInMins: 30
            });

            const user = response.data;

            localStorage.setItem('token', user.accessToken);
            setUser(user);
        } catch (error:any) {
            throw new Error(error.response?.data?.message || 'Auth error');
        }
    }

    const logout = ()=>{
        localStorage.removeItem('token');
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user, loading, login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('For use hook useAuth please provide AuthProvider');
    }
    return context;
}
