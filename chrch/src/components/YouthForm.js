// src/components/YouthForm.jsx

// src/components/YouthForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const formStyles = {
    container: {
        maxWidth: '550px',
        margin: '2rem auto',
        padding: '2.5rem',
        backgroundColor: '#ffffff',
        borderRadius: '15px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
        fontFamily: 'Segoe UI, sans-serif',
    },
    title: {
        textAlign: 'center',
        color: '#2c3e50',
        marginBottom: '2rem',
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
    textarea: { // Added explicit textarea style for clarity, though it's similar to input
        width: '100%',
        padding: '12px',
        margin: '10px 0',
        borderRadius: '8px',
        border: '1px solid #dcdcdc',
        fontSize: '1.1rem',
        boxSizing: 'border-box',
        minHeight: '80px', // Ensures a minimum height
        resize: 'vertical', // Allows vertical resizing by user
    },
    button: {
        backgroundColor: '#2c3e50',
        color: '#fff',
        padding: '15px 20px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '20px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease, opacity 0.3s ease',
    },
    buttonDisabled: { // Added specific style for disabled button
        opacity: 0.7,
        cursor: 'not-allowed',
        backgroundColor: '#5a6b7a', // Slightly lighter dark blue/gray
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
    label: { // Style for the DOB label
        fontSize: '0.9rem',
        color: '#555',
        marginTop: '5px',
        display: 'block',
        marginBottom: '5px', // Added a bit of margin below label
    }
};

const YouthForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        email: '',
        phone_number: '',
        address: '',
    });
    const [message, setMessage] = useState(''); // For displaying success/error messages
    const [isError, setIsError] = useState(false); // To determine message style
    const [isSubmitting, setIsSubmitting] = useState(false); // To manage button state

    const navigate = useNavigate(); // Initialize useNavigate for redirection

    // Get the authentication token from localStorage
    const token = localStorage.getItem('access');
    const youthApiEndpoint = 'http://localhost:8000/api/youth/youths/'; // Your Django API endpoint for Youth

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear messages when user starts typing again
        setMessage('');
        setIsError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Basic client-side validation
        if (!formData.first_name || !formData.last_name || !formData.date_of_birth || !formData.email || !formData.phone_number) {
            setMessage('Please fill in all required fields.');
            setIsError(true);
            return;
        }

        // Basic email format validation
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setMessage('Please enter a valid email address.');
            setIsError(true);
            return;
        }

        // Optional: Phone number regex for Zimbabwe
        // Example: starts with +263 or 07, followed by digits
        const zwPhoneRegex = /^((\+263)|0)[7][1378][0-9]{7}$/;
        if (formData.phone_number && !zwPhoneRegex.test(formData.phone_number)) {
            setMessage('Please enter a valid Zimbabwean phone number (e.g., +2637xxxxxxx or 07xxxxxxx).');
            setIsError(true);
            return;
        }


        // Check if token exists
        if (!token) {
            setMessage('Authentication token not found. Please log in.');
            setIsError(true);
            return;
        }

        setIsSubmitting(true); // Disable button during submission
        setMessage(''); // Clear previous messages
        setIsError(false);

        try {
            const response = await fetch(youthApiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Send the authentication token
                },
                body: JSON.stringify(formData), // Send the form data as JSON
            });

            if (response.ok) {
                setMessage('Youth registered successfully!');
                setIsError(false);
                // Optionally clear the form after successful submission
                setFormData({
                    first_name: '',
                    last_name: '',
                    date_of_birth: '',
                    email: '',
                    phone_number: '',
                    address: '',
                });
                // Redirect back to admin dashboard after a short delay
                setTimeout(() => {
                    navigate('/admin/youth-list'); // Consider a dedicated list page for youth
                }, 1500); // Redirect after 1.5 seconds
            } else {
                // If response is not OK (e.g., 400 Bad Request, 401 Unauthorized)
                const errorData = await response.json();
                console.error('Youth registration failed:', response.status, errorData);

                let errorMessage = 'Registration failed. An unknown error occurred.';
                if (errorData) {
                    if (errorData.email && errorData.email.includes('This field must be unique.')) {
                        errorMessage = 'Registration failed: A youth with this email already exists.';
                    } else if (errorData.detail) {
                        errorMessage = `Registration failed: ${errorData.detail}`;
                    } else {
                        // Attempt to extract field-specific errors
                        const fieldErrors = Object.keys(errorData)
                            .map(key => `${key}: ${Array.isArray(errorData[key]) ? errorData[key].join(', ') : errorData[key]}`)
                            .join('\n');
                        errorMessage = `Registration failed: ${fieldErrors}`;
                    }
                }
                setMessage(errorMessage);
                setIsError(true);
            }
        } catch (error) {
            // This catches network errors (e.g., server not reachable)
            console.error('Network error during youth registration:', error);
            setMessage('Network error. Please check your connection and try again.');
            setIsError(true);
        } finally {
            setIsSubmitting(false); // Re-enable button
        }
    };

    return (
        <form style={formStyles.container} onSubmit={handleSubmit}>
            <h2 style={formStyles.title}>Youth Registration</h2>

            {/* Display messages */}
            {message && (
                <p style={isError ? formStyles.errorMessage : formStyles.successMessage}>
                    {message}
                </p>
            )}

            <input
                style={formStyles.input}
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
            />
            <input
                style={formStyles.input}
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
            />
            <label htmlFor="date_of_birth" style={formStyles.label}>Date of Birth:</label>
            <input
                style={formStyles.input}
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
            />
            <input
                style={formStyles.input}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                style={formStyles.input}
                type="text"
                name="phone_number"
                placeholder="Phone Number (e.g., +2637xxxxxxx or 07xxxxxxx)"
                value={formData.phone_number}
                onChange={handleChange}
                required
            />
            <textarea
                style={formStyles.textarea} // Use textarea specific style
                name="address"
                placeholder="Address (optional)"
                value={formData.address}
                onChange={handleChange}
            />

            <button
                style={{ ...formStyles.button, ...(isSubmitting ? formStyles.buttonDisabled : {}) }}
                type="submit"
                disabled={isSubmitting} // Disable button when submitting
            >
                {isSubmitting ? 'Registering Youth...' : 'Register Youth'}
            </button>
        </form>
    );
};

export default YouthForm;