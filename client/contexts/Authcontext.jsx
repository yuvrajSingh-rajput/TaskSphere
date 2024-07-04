import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('auth');
        if (token) {
            setIsAuthenticated(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('/login', { email, password });
            localStorage.setItem('auth', data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            setIsAuthenticated(true);
            toast.success('Login Successful');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                toast.error(err.response.data.error);
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('auth');
        delete axios.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
        toast.success('Logged out successfully');
    };

    return (
        <Authcontext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </Authcontext.Provider>
    );
};

export const useAuth = () => useContext(Authcontext);
