// src/components/AddEquipmentForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    form: {
        maxWidth: '450px', // Slightly wider form
        margin: '2rem auto',
        padding: '2.5rem', // More padding
        backgroundColor: '#ffffff', // Pure white background
        borderRadius: '10px', // More rounded corners
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)', // Stronger, softer shadow
        position: 'relative', // For positioning back button if needed inside form
    },
    heading: {
        textAlign: 'center',
        marginBottom: '2rem', // More space
        color: '#2c3e50', // Darker, professional color
        fontSize: '2rem', // Larger heading
        fontWeight: '600',
    },
    label: { // Added labels for better accessibility and UX
        display: 'block',
        marginBottom: '0.5rem',
        marginTop: '1rem',
        color: '#555',
        fontWeight: 'bold',
        fontSize: '0.9rem',
    },
    input: {
        width: '100%',
        padding: '0.85rem', // Slightly more padding
        marginBottom: '1rem',
        border: '1px solid #dcdcdc', // Lighter border
        borderRadius: '8px', // More rounded input fields
        fontSize: '1rem',
        boxSizing: 'border-box',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    },
    textarea: {
        width: '100%',
        padding: '0.85rem',
        marginBottom: '1rem',
        border: '1px solid #dcdcdc',
        borderRadius: '8px',
        fontSize: '1rem',
        boxSizing: 'border-box',
        resize: 'vertical',
        minHeight: '80px', // Minimum height for textarea
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    },
    focus: { // Pseudo-class styles not directly supported, but for reference
        borderColor: '#4a90e2',
        boxShadow: '0 0 0 3px rgba(74, 144, 226, 0.2)',
    },
    button: {
        width: '100%',
        padding: '0.9rem', // Larger button
        backgroundColor: '#4a90e2', // Primary blue
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.1rem', // Larger font
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
        marginTop: '1.5rem', // More space above button
    },
    backButton: {
        backgroundColor: '#6c757d', // Grey for secondary action
        color: '#fff',
        padding: '10px 20px', // More padding
        borderRadius: '8px', // Matched with other elements
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem', // Slightly larger font
        fontWeight: 'bold',
        marginBottom: '1.5rem', // Consistent spacing
        // Position it explicitly if you want it outside the form flow
        // For now, it's just a button at the top of the form
    },
    successMessage: {
        color: '#28a745',
        textAlign: 'center',
        marginTop: '1.5rem',
        fontWeight: 'bold',
        backgroundColor: '#d4edda', // Light green background
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #28a745',
    },
    errorMessage: {
        color: '#dc3545',
        textAlign: 'center',
        marginTop: '1.5rem',
        fontWeight: 'bold',
        backgroundColor: '#f8d7da', // Light red background
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #dc3545',
    },
    buttonDisabled: {
        opacity: 0.6, // Dimmer when disabled
        cursor: 'not-allowed',
        transform: 'none', // No lift effect when disabled
        boxShadow: 'none',
    }
};

const AddEquipmentForm = () => {
    const [equipment, setEquipment] = useState({
        name: '',
        code: '',
        description: '',
        quantity: ''
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // For quantity and code, ensure they are numbers. Use empty string for invalid numeric input
        const newValue = (name === 'quantity' || name === 'code') ? (value === '' ? '' : parseInt(value)) : value;
        setEquipment(prev => ({ ...prev, [name]: newValue })); // Use functional update
        setMessage(''); // Clear messages on input change
        setIsError(false);
    };

    const handleBack = () => {
        navigate(-1); // Go back one step in the history
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (!equipment.name.trim() || !equipment.code || !equipment.description.trim() || !equipment.quantity) {
            setMessage('All fields are required.');
            setIsError(true);
            return;
        }
        if (isNaN(equipment.code) || equipment.code <= 0) {
            setMessage('Code must be a positive number.');
            setIsError(true);
            return;
        }
        if (isNaN(equipment.quantity) || equipment.quantity <= 0) {
            setMessage('Quantity must be a positive number.');
            setIsError(true);
            return;
        }

        const token = localStorage.getItem('access'); // Retrieve the JWT token from localStorage

        if (!token) {
            setMessage('Authentication required. Please log in.');
            setIsError(true);
            return;
        }

        setIsSubmitting(true);
        setMessage('');
        setIsError(false);

        try {
            const response = await fetch('http://localhost:8000/api/equipment/equipment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(equipment)
            });

            if (response.ok) { // Check if the response status is 2xx (success)
                setMessage('Equipment added successfully!');
                setIsError(false);
                setEquipment({ name: '', code: '', description: '', quantity: '' }); // Clear the form
                setTimeout(() => {
                    navigate('/admin-dashboard'); // Navigate back to dashboard after successful submission
                }, 1500);
            } else {
                const errorData = await response.json();
                console.error('Failed to add equipment:', response.status, errorData);

                let errorMessage = `Failed to add equipment. Status: ${response.status}.`;
                if (errorData) {
                    if (errorData.detail) {
                        errorMessage = `Failed to add equipment: ${errorData.detail}`;
                    } else if (typeof errorData === 'object') {
                        const fieldErrors = Object.keys(errorData)
                            .map(key => `${key}: ${Array.isArray(errorData[key]) ? errorData[key].join(', ') : errorData[key]}`)
                            .join('\n'); // Join with newline for better readability
                        errorMessage = `Failed to add equipment:\n${fieldErrors}`;
                    } else {
                        errorMessage = `Failed to add equipment: ${JSON.stringify(errorData)}`;
                    }
                }
                setMessage(errorMessage);
                setIsError(true);
            }
        } catch (error) {
            console.error('Network error or unexpected issue:', error);
            setMessage('An error occurred while connecting to the server. Please check your network.');
            setIsError(true);
        } finally {
            setIsSubmitting(false); // Re-enable button
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <button
                type="button" // Important: use type="button" to prevent it from submitting the form
                onClick={handleBack}
                style={styles.backButton}
            >
                &larr; Back to Dashboard
            </button>

            <h2 style={styles.heading}>Add New Equipment</h2> {/* Updated heading */}

            <label htmlFor="name" style={styles.label}>Equipment Name:</label>
            <input
                id="name"
                style={styles.input}
                name="name"
                placeholder="e.g., Mixing Console"
                value={equipment.name}
                onChange={handleChange}
                required
            />

            <label htmlFor="code" style={styles.label}>Equipment Code:</label>
            <input
                id="code"
                style={styles.input}
                name="code"
                type="number"
                placeholder="e.g., 101 (Unique Identifier)"
                value={equipment.code}
                onChange={handleChange}
                required
            />

            <label htmlFor="description" style={styles.label}>Description:</label>
            <textarea
                id="description"
                style={styles.textarea}
                name="description"
                placeholder="e.g., Behringer X32, 32-channel digital mixer"
                value={equipment.description}
                onChange={handleChange}
                rows="4" // Increased rows for more description space
                required
            />

            <label htmlFor="quantity" style={styles.label}>Quantity:</label>
            <input
                id="quantity"
                style={styles.input}
                name="quantity"
                type="number"
                placeholder="e.g., 1 or 5"
                value={equipment.quantity}
                onChange={handleChange}
                required
            />

            {message && (
                <p style={isError ? styles.errorMessage : styles.successMessage}>
                    {message.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)} {/* Render newlines in messages */}
                </p>
            )}

            <button
                type="submit"
                style={{ ...styles.button, ...(isSubmitting ? styles.buttonDisabled : {}) }}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Adding Equipment...' : 'Add Equipment'} {/* Updated button text */}
            </button>
        </form>
    );
};

export default AddEquipmentForm;