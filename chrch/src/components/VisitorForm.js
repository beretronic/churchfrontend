// src/components/VisitorForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    formContainer: {
        maxWidth: '550px',
        margin: '2rem auto',
        padding: '2.5rem',
        backgroundColor: '#ffffff',
        borderRadius: '15px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
        fontFamily: 'Segoe UI, sans-serif',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#2c3e50',
        fontSize: '2rem',
    },
    input: {
        width: '100%',
        padding: '12px',
        margin: '10px 0',
        borderRadius: '8px',
        border: '1px solid #dcdcdc',
        fontSize: '1.1rem',
        boxSizing: 'border-box',
    },
    textarea: {
        width: '100%',
        padding: '12px',
        margin: '10px 0',
        borderRadius: '8px',
        border: '1px solid #dcdcdc',
        fontSize: '1.1rem',
        boxSizing: 'border-box',
        minHeight: '80px',
        resize: 'vertical',
    },
    button: {
        width: '100%',
        padding: '15px',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        marginTop: '20px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        transition: 'background-color 0.3s ease, opacity 0.3s ease',
    },
    successMessage: {
        color: '#28a745',
        textAlign: 'center',
        marginTop: '1.5rem',
        fontWeight: 'bold',
        fontSize: '1.05rem',
    },
    errorMessage: {
        color: '#dc3545',
        textAlign: 'center',
        marginTop: '1.5rem',
        fontWeight: 'bold',
        fontSize: '1.05rem',
    },
    buttonDisabled: {
        opacity: 0.7,
        cursor: 'not-allowed',
        backgroundColor: '#a6d3f2',
    }
};

const VisitorForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', phone_number: '', address: '' });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const token = localStorage.getItem('access');
    const visitorApiEndpoint = 'http://localhost:8000/api/visitors/visitor/'; // corrected endpoint

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setMessage('');
        setIsError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email) {
            setMessage('Name and Email are required fields.');
            setIsError(true);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setMessage('Please enter a valid email address.');
            setIsError(true);
            return;
        }

        if (!token) {
            setMessage('Authentication required. Please log in.');
            setIsError(true);
            return;
        }

        setIsSubmitting(true);
        setMessage('');
        setIsError(false);

        try {
            const response = await fetch(visitorApiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });

            const contentType = response.headers.get('content-type');

            if (response.ok && contentType && contentType.includes('application/json')) {
                setMessage('Visitor registered successfully!');
                setIsError(false);
                setFormData({ name: '', email: '', phone_number: '', address: '' });

                setTimeout(() => {
                    // navigate('/admin/visitors-list');
                }, 1500);
            } else {
                let errorMessage = 'Registration failed.';
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    if (errorData.email && errorData.email.includes('This field must be unique.')) {
                        errorMessage = 'A visitor with this email already exists.';
                    } else if (errorData.detail) {
                        errorMessage = `Registration failed: ${errorData.detail}`;
                    } else {
                        const fieldErrors = Object.keys(errorData)
                            .map(key => `${key}: ${Array.isArray(errorData[key]) ? errorData[key].join(', ') : errorData[key]}`)
                            .join('\n');
                        errorMessage = `Registration failed: ${fieldErrors}`;
                    }
                } else {
                    const errorText = await response.text();
                    console.error('Unexpected error response:', errorText);
                    errorMessage = 'Unexpected server response. Please try again later.';
                }
                setMessage(errorMessage);
                setIsError(true);
            }
        } catch (error) {
            console.error('Network error during visitor registration:', error);
            setMessage('Network error. Please check your connection and try again.');
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form style={styles.formContainer} onSubmit={handleSubmit}>
            <h2 style={styles.heading}>Visitor Registration</h2>

            {message && (
                <p style={isError ? styles.errorMessage : styles.successMessage}>
                    {message}
                </p>
            )}

            <input
                style={styles.input}
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                style={styles.input}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                style={styles.input}
                type="text"
                name="phone_number"
                placeholder="Phone Number (optional)"
                value={formData.phone_number}
                onChange={handleChange}
            />
            <textarea
                style={styles.textarea}
                name="address"
                placeholder="Address (optional)"
                value={formData.address}
                onChange={handleChange}
            />
            <button
                style={{ ...styles.button, ...(isSubmitting ? styles.buttonDisabled : {}) }}
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Registering...' : 'Register Visitor'}
            </button>
        </form>
    );
};

export default VisitorForm;