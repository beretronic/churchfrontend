// src/components/OfferingForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection after submission

const styles = {
    form: {
        maxWidth: '450px',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
        fontFamily: 'Segoe UI, sans-serif',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '1.8rem',
        color: '#2c3e50',
    },
    input: {
        width: '100%',
        padding: '0.8rem',
        marginBottom: '1.2rem',
        border: '1px solid #ced4da',
        borderRadius: '8px',
        fontSize: '1rem',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '1rem',
        backgroundColor: '#28a745', // Green for positive action
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, opacity 0.3s ease',
    },
    successMessage: {
        color: '#28a745',
        textAlign: 'center',
        marginTop: '1rem',
        fontWeight: 'bold',
    },
    errorMessage: {
        color: '#dc3545',
        textAlign: 'center',
        marginTop: '1rem',
        fontWeight: 'bold',
    },
    buttonDisabled: {
        opacity: 0.7,
        cursor: 'not-allowed',
    },
    // Added back button style
    backButton: {
        backgroundColor: '#6c757d', // Grey color for back button
        color: '#fff',
        padding: '8px 15px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        marginBottom: '20px',
        marginRight: '10px'
    }
};

const OfferingForm = () => {
    const navigate = useNavigate();
    const [offering, setOffering] = useState({
        receipter: '',
        purpose: '',
        amount: '',
        date_given: ''
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const token = localStorage.getItem('access'); // Get your JWT token
    // ===>>> CORRECTED THIS LINE <<<===
    const offeringApiEndpoint = 'http://localhost:8000/api/finances/offerings/'; // Correct endpoint based on your DRF setup

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOffering({ ...offering, [name]: value });
        setMessage(''); // Clear messages on input change
        setIsError(false);
    };

    const handleBack = () => {
        navigate(-1); // Go back one step in history
        // Alternatively, navigate('/admin-dashboard'); to always go to the dashboard
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (!offering.receipter || !offering.purpose || !offering.amount || !offering.date_given) {
            setMessage('Please fill in all required fields.');
            setIsError(true);
            return;
        }

        // Validate amount is a positive number
        const parsedAmount = parseFloat(offering.amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setMessage('Amount must be a positive number.');
            setIsError(true);
            return;
        }
        // Ensure amount is sent as a number, not a string
        const dataToSend = { ...offering, amount: parsedAmount };


        if (!token) {
            setMessage('Authentication required. Please log in.');
            setIsError(true);
            return;
        }

        setIsSubmitting(true);
        setMessage('');
        setIsError(false);

        try {
            const response = await fetch(offeringApiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include token for authentication
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                setMessage('Offering submitted successfully!');
                setIsError(false);
                setOffering({ receipter: '', purpose: '', amount: '', date_given: '' }); // Clear form

                setTimeout(() => {
                    navigate('/admin-dashboard'); // Redirect to admin dashboard after successful submission
                }, 1500);
            } else {
                const errorData = await response.json();
                console.error('Offering submission failed:', response.status, errorData);

                let errorMessage = 'Failed to submit offering. An unknown error occurred.';
                if (errorData) {
                    if (errorData.detail) {
                        errorMessage = `Failed to submit offering: ${errorData.detail}`;
                    } else {
                        const fieldErrors = Object.keys(errorData)
                            .map(key => `${key}: ${Array.isArray(errorData[key]) ? errorData[key].join(', ') : errorData[key]}`)
                            .join('\n');
                        errorMessage = `Failed to submit offering: ${fieldErrors}`;
                    }
                }
                setMessage(errorMessage);
                setIsError(true);
            }
        } catch (error) {
            console.error('Network error during offering submission:', error);
            setMessage('Network error. Please check your connection and try again.');
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
                style={styles.backButton} // Apply back button style
            >
                &larr; Back to Dashboard
            </button>

            <h2 style={styles.heading}>Add Offering</h2>
            <input
                style={styles.input}
                name="receipter"
                placeholder="Receipter"
                value={offering.receipter}
                onChange={handleChange}
                required
            />
            <input
                style={styles.input}
                name="purpose"
                placeholder="Purpose"
                value={offering.purpose}
                onChange={handleChange}
                required
            />
            <input
                style={styles.input}
                type="number" // Ensures numeric input
                name="amount"
                placeholder="Amount"
                value={offering.amount}
                onChange={handleChange}
                step="0.01" // Allows decimal input
                required
            />
            <input
                style={styles.input}
                type="date"
                name="date_given"
                value={offering.date_given}
                onChange={handleChange}
                required
            />

            {message && (
                <p style={isError ? styles.errorMessage : styles.successMessage}>
                    {message}
                </p>
            )}

            <button
                type="submit"
                style={{ ...styles.button, ...(isSubmitting ? styles.buttonDisabled : {}) }}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Offering'}
            </button>
        </form>
    );
};

export default OfferingForm;