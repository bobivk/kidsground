import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);   // { username, role } or null
    const [loading, setLoading] = useState(true);

    const fetchMe = useCallback(async () => {
        try {
            const res = await fetch('https://kidsground.bg:8009/v1/users/me', {
                credentials: 'include',
            });
            if (res.ok) {
                const data = await res.json();
                setUser({ username: data.username, role: data.role });
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchMe(); }, [fetchMe]);

    const login = (userData) => setUser({ username: userData.username, role: userData.role });

    const logout = async () => {
        await fetch('https://kidsground.bg:8009/v1/users/logout', {
            method: 'POST',
            credentials: 'include',
        });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
