// src/components/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage:", error);
            localStorage.removeItem('user');
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (username, password) => {
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        try {
            const res = await fetch(`${API_URL}/api/accounts/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            // --- DEBUGGING START ---
            console.log('Login API Response Data:', data); // Log the full response data
            // --- DEBUGGING END ---

            if (!res.ok) {
                // If the response is not OK, it means the backend returned an error (e.g., 400, 401)
                console.error('Login failed with status:', res.status, 'and data:', data);
                throw new Error(data.detail || 'Login failed: Invalid credentials or server error.');
            }

            // Assuming your backend returns 'access', 'refresh', and 'role' directly in the data object
            const loggedInUserRole = data.role; // This is the expected place for the role
            const accessToken = data.access;
            const refreshToken = data.refresh;

            const loggedInUser = { username: username, role: loggedInUserRole };

            // --- DEBUGGING START ---
            console.log('Parsed User Object for Frontend:', loggedInUser);
            console.log('User Role received:', loggedInUser.role);
            // --- DEBUGGING END ---

            // Store user data and tokens in localStorage
            setUser(loggedInUser);
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            localStorage.setItem('access', accessToken);
            localStorage.setItem('refresh', refreshToken);

            // Role-based redirection logic
            if (loggedInUser.role === 'finance') {
                console.log('Redirecting to finance-dashboard');
                navigate('/finance-dashboard');
            } else if (loggedInUser.role === 'leader') {
                console.log('Redirecting to leader-dashboard');
                navigate('/leader-dashboard');
            } else if (loggedInUser.role === 'admin') { // Explicitly check for 'admin'
                console.log('Redirecting to admin-dashboard (admin role)');
                navigate('/admin-dashboard');
            }
            else {
                // Fallback for any other roles not explicitly handled, or if role is missing/unexpected
                console.log('Redirecting to default dashboard (unhandled role or default fallback)');
                navigate('/admin-dashboard'); // Or a general '/dashboard' route
            }

            return true; // Indicate successful login
        } catch (error) {
            console.error('Login error caught in AuthContext:', error);
            throw error; // Re-throw to be caught by the calling component (e.g., Login.js)
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
