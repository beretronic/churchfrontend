// components/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/login');
    };

    return (
        <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
            Logout
        </button>
    );
};

export default LogoutButton;