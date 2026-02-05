import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- TYPE DEFINITIONS ---

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => void;
}

// --- CONTEXT ---

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- PROVIDER ---

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('forsee_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem('forsee_user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // For demo: accept any email/password
        const newUser: User = {
            id: crypto.randomUUID(),
            name: email.split('@')[0],
            email,
            avatarUrl: '/avatar.png',
        };

        setUser(newUser);
        localStorage.setItem('forsee_user', JSON.stringify(newUser));
    };

    const signup = async (name: string, email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        const newUser: User = {
            id: crypto.randomUUID(),
            name,
            email,
            avatarUrl: '/avatar.png',
        };

        setUser(newUser);
        localStorage.setItem('forsee_user', JSON.stringify(newUser));
    };

    const loginWithGoogle = async () => {
        // Simulate Google OAuth
        await new Promise(resolve => setTimeout(resolve, 500));

        const newUser: User = {
            id: crypto.randomUUID(),
            name: 'Demo User',
            email: 'demo@forsee.ai',
            avatarUrl: '/avatar.png',
        };

        setUser(newUser);
        localStorage.setItem('forsee_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('forsee_user');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                signup,
                loginWithGoogle,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// --- HOOK ---

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthProvider;
