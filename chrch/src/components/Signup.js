// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation to login
import heroBackgroundImage from '../images/hero-background.jpg'; // Import your hero background image

const Signup = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '', password2: '' });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // State for submission status
    const navigate = useNavigate();

    // State for button hover
    const [isHovered, setIsHovered] = useState(false);

    const styles = {
        // New style for the full-page wallpaper
        wallpaperContainer: {
            position: 'fixed', // Fixed to cover the whole viewport
            top: 0,
            left: 0,
            width: '100vw',    // Viewport width
            height: '100vh',   // Viewport height
            backgroundImage: `url(${heroBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: -1, // Ensures it stays behind all content
            display: 'flex', // Use flexbox to center content vertically/horizontally
            justifyContent: 'center',
            alignItems: 'center',
        },
        // New style for the dimming overlay on the wallpaper
        wallpaperOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darkens the background for better readability
            zIndex: 0, // Above the image, below the form
        },
        container: {
            maxWidth: '400px',
            // Remove margin-top/bottom here since wallpaperContainer handles centering
            margin: '0 auto', // Center horizontally
            padding: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.95)', // Slightly transparent white for the form
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            fontFamily: 'Segoe UI, sans-serif',
            zIndex: 1, // Ensures the form is above the wallpaper and overlay
            position: 'relative', // Necessary for zIndex to work reliably
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
            boxSizing: 'border-box', // Include padding and border in the element's total width and height
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
            transition: 'background-color 0.3s ease, opacity 0.3s ease',
        },
        buttonDisabled: {
            opacity: 0.7,
            cursor: 'not-allowed',
            backgroundColor: '#88a6cc', // A slightly lighter blue for disabled state
        },
        // Added a simple hover effect for the button
        buttonHover: {
            backgroundColor: '#0056b3', // A slightly darker blue on hover
        },
        error: {
            color: '#c0392b',
            fontSize: '0.95rem',
            textAlign: 'center',
            marginTop: '0.5rem',
        },
        success: {
            color: '#28a745',
            fontSize: '0.95rem',
            textAlign: 'center',
            marginTop: '0.5rem',
        },
        link: {
            display: 'block',
            textAlign: 'center',
            marginTop: '1.5rem',
            color: '#004080',
            textDecoration: 'none',
            fontSize: '0.9rem',
            transition: 'color 0.2s ease', // Smooth transition for link hover
        },
        linkHover: {
            color: '#0056b3', // Darker blue on hover
            textDecoration: 'underline',
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsSubmitting(true);

        if (form.password !== form.password2) {
            setError('Passwords do not match.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/accounts/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: form.username,
                    email: form.email,
                    password: form.password,
                    password2: form.password2
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Registration successful! You can now log in.');
                setError('');
                // Optionally clear the form after successful registration
                setForm({ username: '', email: '', password: '', password2: '' });
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page after a short delay
                }, 2000); // 2-second delay
            } else {
                let errorMessage = 'Registration failed.';
                // Better error message parsing from Django REST Framework
                if (data) {
                    if (data.username) {
                        errorMessage = `Username: ${data.username.join(', ')}.`;
                    } else if (data.email) {
                        errorMessage = `Email: ${data.email.join(', ')}.`;
                    } else if (data.password) {
                        errorMessage = `Password: ${data.password.join(', ')}.`;
                    } else if (data.password2) {
                        errorMessage = `Password confirmation: ${data.password2.join(', ')}.`;
                    } else if (data.non_field_errors) {
                        errorMessage = `${data.non_field_errors.join(', ')}.`;
                    } else if (data.detail) { // General error detail from Django REST Framework
                        errorMessage = `Registration failed: ${data.detail}`;
                    } else {
                        errorMessage = JSON.stringify(data); // Fallback to raw data if structure is unknown
                    }
                }
                setError(errorMessage);
                setSuccessMessage('');
            }
        } catch (err) {
            console.error('Network or unexpected error:', err);
            setError('An error occurred. Please check your network connection.');
            setSuccessMessage('');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={styles.wallpaperContainer}> {/* This div acts as the full-page wallpaper */}
            <div style={styles.wallpaperOverlay}></div> {/* This div creates the dimming effect */}
            <form style={styles.container} onSubmit={handleSubmit}>
                <h2 style={styles.heading}>Sign Up</h2>

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
                    type="email"
                    name="email"
                    placeholder="Email"
                    style={styles.input}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
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

                <input
                    type="password"
                    name="password2"
                    placeholder="Confirm Password"
                    style={styles.input}
                    value={form.password2}
                    onChange={(e) => setForm({ ...form, password2: e.target.value })}
                    required
                />

                <button
                    type="submit"
                    style={{
                        ...styles.button,
                        ...(isSubmitting ? styles.buttonDisabled : {}),
                        ...(isHovered && !isSubmitting ? styles.buttonHover : {}) // Apply hover only if not disabled
                    }}
                    disabled={isSubmitting}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>

                {error && <p style={styles.error}>{error}</p>}
                {successMessage && <p style={styles.success}>{successMessage}</p>}

                {/* Link to login page */}
                <Link
                    to="/login"
                    style={{ ...styles.link, ...(isHovered ? styles.linkHover : {}) }}
                    onMouseEnter={() => setIsHovered(true)} // Reusing isHovered state for link, might need separate if more complex
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Already have an account? Login here.
                </Link>
            </form>
        </div>
    );
};

export default Signup;