// src/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// CORRECTED PATH: Now points to src/components/AuthContext
import { useAuth } from './components/AuthContext';
import heroBackgroundImage from './images/hero-background.jpg'; // Ensure this path is correct

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [linkHover, setLinkHover] = useState(false);

    const { login } = useAuth(); // Get the login function from AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(form.username, form.password);
            // Redirection is handled inside the login function in AuthContext
        } catch (err) {
            setError(err.message || 'An unexpected error occurred during login.');
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        wallpaperContainer: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${heroBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: -1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        wallpaperOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 0,
        },
        container: {
            maxWidth: '400px',
            margin: '0 auto',
            padding: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            fontFamily: 'Segoe UI, sans-serif',
            zIndex: 1,
            position: 'relative',
        },
        heading: {
            fontSize: '1.8rem',
            color: '#004080',
            textAlign: 'center',
            marginBottom: '1.5rem',
        },
        input: {
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '6px',
            boxSizing: 'border-box',
        },
        button: {
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#004080',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
        error: {
            color: '#c0392b',
            fontSize: '0.95rem',
            textAlign: 'center',
            marginTop: '0.5rem',
        },
        backLink: {
            display: 'block',
            textAlign: 'center',
            marginTop: '1.5rem',
            color: '#004080',
            textDecoration: 'none',
            fontSize: '0.95rem',
            transition: 'color 0.3s ease, text-decoration 0.3s ease',
        },
        backLinkHover: {
            color: '#0056b3',
            textDecoration: 'underline',
        },
    };

    return (
        <div style={styles.wallpaperContainer}>
            <div style={styles.wallpaperOverlay}></div>
            <form style={styles.container} onSubmit={handleSubmit}>
                <h2 style={styles.heading}>Login</h2>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    style={styles.input}
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    style={styles.input}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{ ...styles.button, ...(isHovered ? styles.buttonHover : {}) }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                {error && <p style={styles.error}>{error}</p>}

                <Link
                    to="/"
                    style={{ ...styles.backLink, ...(linkHover ? styles.backLinkHover : {}) }}
                    onMouseEnter={() => setLinkHover(true)}
                    onMouseLeave={() => setLinkHover(false)}
                >
                    ? Back to Home
                </Link>
            </form>
        </div>
    );
};

export default Login;