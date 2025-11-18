// src/components/EditPledgeForm.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const formContainerStyle = {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif',
};

const formGroupStyle = {
    marginBottom: '1rem',
};

const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#333',
};

const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
};

const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1.5rem',
};

const saveButtonStyle = {
    backgroundColor: '#004080',
    color: '#fff',
    padding: '0.8rem 1.5rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
};

const cancelButtonStyle = {
    backgroundColor: '#6c757d',
    color: '#fff',
    padding: '0.8rem 1.5rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
};

const EditPledgeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('access');

    const [formData, setFormData] = useState({
        name: '',
        purpose: '',
        amount: 0, // Initialize as number
        installment1: 0, // Initialize as number
        installment2: 0, // Initialize as number
        installment3: 0, // Initialize as number
        // status and created_at are managed by backend, not edited directly here
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ? CORRECTED BASE URL ?
    const getBaseUrl = () => 'http://127.0.0.1:8000/api/';

    useEffect(() => {
        const fetchPledge = async () => {
            try {
                const response = await fetch(`${getBaseUrl()}finances/pledges/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setFormData({
                    name: data.name || '',
                    purpose: data.purpose || '',
                    amount: parseFloat(data.amount) || 0, // Ensure it's a number
                    installment1: parseFloat(data.installment1) || 0, // Ensure it's a number
                    installment2: parseFloat(data.installment2) || 0, // Ensure it's a number
                    installment3: parseFloat(data.installment3) || 0, // Ensure it's a number
                });
            } catch (err) {
                setError('Failed to fetch pledge data: ' + err.message);
                console.error('Fetch pledge error:', err);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchPledge();
        } else {
            navigate('/login');
        }
    }, [id, token, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            // Convert numerical fields to float
            [name]: ['amount', 'installment1', 'installment2', 'installment3'].includes(name)
                ? parseFloat(value) || 0
                : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${getBaseUrl()}finances/pledges/${id}/`, {
                method: 'PUT', // Or 'PATCH' if you only send changed fields
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                // Send only the fields that are editable by the user
                body: JSON.stringify({
                    name: formData.name,
                    purpose: formData.purpose,
                    amount: formData.amount,
                    installment1: formData.installment1,
                    installment2: formData.installment2,
                    installment3: formData.installment3,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
            }

            alert('Pledge updated successfully!');
            navigate('/admin-dashboard'); // Go back to the dashboard
        } catch (err) {
            setError('Failed to update pledge: ' + err.message);
            console.error('Update pledge error:', err);
            alert('Failed to update pledge. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div style={formContainerStyle}>Loading pledge data...</div>;
    }

    if (error) {
        return <div style={{ ...formContainerStyle, color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div style={formContainerStyle}>
            <h2 style={{ textAlign: 'center', color: '#004080', marginBottom: '1.5rem' }}>Edit Pledge</h2>
            <form onSubmit={handleSubmit}>
                <div style={formGroupStyle}>
                    <label htmlFor="name" style={labelStyle}>Pledger Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} style={inputStyle} required />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="purpose" style={labelStyle}>Purpose:</label>
                    <input type="text" id="purpose" name="purpose" value={formData.purpose} onChange={handleChange} style={inputStyle} required />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="amount" style={labelStyle}>Total Pledge Amount:</label>
                    <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} style={inputStyle} required step="0.01" min="0" />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="installment1" style={labelStyle}>Installment 1:</label>
                    <input type="number" id="installment1" name="installment1" value={formData.installment1} onChange={handleChange} style={inputStyle} required step="0.01" min="0" />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="installment2" style={labelStyle}>Installment 2:</label>
                    <input type="number" id="installment2" name="installment2" value={formData.installment2} onChange={handleChange} style={inputStyle} required step="0.01" min="0" />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="installment3" style={labelStyle}>Installment 3:</label>
                    <input type="number" id="installment3" name="installment3" value={formData.installment3} onChange={handleChange} style={inputStyle} required step="0.01" min="0" />
                </div>
                {/* Note: 'status' is calculated by the backend and not editable directly here */}
                {/* 'created_at' is also auto-generated by the backend */}
                <div style={buttonGroupStyle}>
                    <button type="button" onClick={() => navigate('/admin-dashboard')} style={cancelButtonStyle}>Cancel</button>
                    <button type="submit" style={saveButtonStyle}>Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default EditPledgeForm;