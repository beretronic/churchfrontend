// src/components/PledgeForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection

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
        backgroundColor: '#0078d4', // Blue for primary action
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, opacity 0.3s ease',
    },
    statusText: { // Updated style name for clarity
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#555', // Default color
    },
    completedStatus: {
        color: '#28a745', // Green for completed
    },
    notCompletedStatus: {
        color: '#dc3545', // Red for not completed
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
    backButton: { // Style for the back button
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

const PledgeForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        purpose: '',
        amount: '',
        installment1: 0,
        installment2: 0,
        installment3: 0,
        status: 'Not Completed' // Initial status
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const token = localStorage.getItem('access'); // Get your JWT token
    // ===>>> CORRECTED THIS LINE <<<===
    const pledgeApiEndpoint = 'http://localhost:8000/api/finances/pledges/'; // Correct endpoint based on your DRF setup

    // Effect to update status based on paid amount
    useEffect(() => {
        const totalPaid =
            Number(formData.installment1) +
            Number(formData.installment2) +
            Number(formData.installment3);
        const status = totalPaid >= Number(formData.amount) && Number(formData.amount) > 0 ? 'Completed' : 'Not Completed';

        // Only update if status actually changes to avoid infinite re-renders
        if (formData.status !== status) {
            setFormData((prev) => ({ ...prev, status }));
        }
    }, [formData.installment1, formData.installment2, formData.installment3, formData.amount, formData.status]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        // Convert amount and installments to numbers for calculations
        const newValue = ['amount', 'installment1', 'installment2', 'installment3'].includes(name)
            ? parseFloat(value) || 0 // Use parseFloat to handle decimals, default to 0 for empty/invalid
            : value;

        setFormData((prev) => ({
            ...prev,
            [name]: newValue
        }));
        setMessage('');
        setIsError(false);
    };

    const handleBack = () => {
        navigate(-1); // Go back one step in history
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (!formData.name || !formData.purpose || !formData.amount) {
            setMessage('Name, Purpose, and Total Amount are required.');
            setIsError(true);
            return;
        }
        if (parseFloat(formData.amount) <= 0) {
            setMessage('Total Amount must be a positive number.');
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
            // Send the formData directly. Django's save method will handle the status update.
            const response = await fetch(pledgeApiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setMessage('Pledge submitted successfully!');
                setIsError(false);
                // Reset form to initial state
                setFormData({
                    name: '',
                    purpose: '',
                    amount: '',
                    installment1: 0,
                    installment2: 0,
                    installment3: 0,
                    status: 'Not Completed'
                });

                setTimeout(() => {
                    navigate('/admin-dashboard'); // Redirect to admin dashboard after success
                }, 1500);
            } else {
                const errorData = await response.json();
                console.error('Pledge submission failed:', response.status, errorData);

                let errorMessage = 'Failed to submit pledge. An unknown error occurred.';
                if (errorData) {
                    if (errorData.detail) {
                        errorMessage = `Failed to submit pledge: ${errorData.detail}`;
                    } else {
                        // General handling for field errors from DRF
                        const fieldErrors = Object.keys(errorData)
                            .map(key => `${key}: ${Array.isArray(errorData[key]) ? errorData[key].join(', ') : errorData[key]}`)
                            .join('\n');
                        errorMessage = `Failed to submit pledge: ${fieldErrors}`;
                    }
                }
                setMessage(errorMessage);
                setIsError(true);
            }
        } catch (error) {
            console.error('Network error during pledge submission:', error);
            setMessage('Network error. Please check your connection and try again.');
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const statusStyle = formData.status === 'Completed' ? styles.completedStatus : styles.notCompletedStatus;

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <button
                type="button" // Important: use type="button" to prevent it from submitting the form
                onClick={handleBack}
                style={styles.backButton}
            >
                &larr; Back to Dashboard
            </button>

            <h2 style={styles.heading}>Add Pledge</h2>
            <input
                style={styles.input}
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                style={styles.input}
                type="text"
                name="purpose"
                placeholder="Purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
            />
            <input
                style={styles.input}
                type="number"
                name="amount"
                placeholder="Total Amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                required
            />
            <input
                style={styles.input}
                type="number"
                name="installment1"
                placeholder="Installment 1"
                value={formData.installment1}
                onChange={handleChange}
                step="0.01"
            />
            <input
                style={styles.input}
                type="number"
                name="installment2"
                placeholder="Installment 2"
                value={formData.installment2}
                onChange={handleChange}
                step="0.01"
            />
            <input
                style={styles.input}
                type="number"
                name="installment3"
                placeholder="Installment 3"
                value={formData.installment3}
                onChange={handleChange}
                step="0.01"
            />
            <p style={{ ...styles.statusText, ...statusStyle }}>
                Status: {formData.status}
            </p>

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
                {isSubmitting ? 'Submitting Pledge...' : 'Submit Pledge'}
            </button>
        </form>
    );
};

export default PledgeForm;