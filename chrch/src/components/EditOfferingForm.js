// src/components/EditOfferingForm.js
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

const EditOfferingForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('access');

    const [formData, setFormData] = useState({
        receipter: '',
        purpose: '',
        amount: 0, // Initialize as number
        date_given: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ? CORRECTED BASE URL ?
    const getBaseUrl = () => 'http://127.0.0.1:8000/api/';

    useEffect(() => {
        const fetchOffering = async () => {
            try {
                const response = await fetch(`${getBaseUrl()}finances/offerings/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setFormData({
                    receipter: data.receipter || '',
                    purpose: data.purpose || '',
                    amount: parseFloat(data.amount) || 0, // Ensure it's a number
                    date_given: data.date_given || '',
                });
            } catch (err) {
                setError('Failed to fetch offering data: ' + err.message);
                console.error('Fetch offering error:', err);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchOffering();
        } else {
            navigate('/login');
        }
    }, [id, token, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            // Convert amount to float
            [name]: name === 'amount' ? parseFloat(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${getBaseUrl()}finances/offerings/${id}/`, {
                method: 'PUT', // Or 'PATCH' if you only send changed fields
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
            }

            alert('Offering updated successfully!');
            navigate('/admin-dashboard'); // Go back to the dashboard
        } catch (err) {
            setError('Failed to update offering: ' + err.message);
            console.error('Update offering error:', err);
            alert('Failed to update offering. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div style={formContainerStyle}>Loading offering data...</div>;
    }

    if (error) {
        return <div style={{ ...formContainerStyle, color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div style={formContainerStyle}>
            <h2 style={{ textAlign: 'center', color: '#004080', marginBottom: '1.5rem' }}>Edit Offering</h2>
            <form onSubmit={handleSubmit}>
                <div style={formGroupStyle}>
                    <label htmlFor="receipter" style={labelStyle}>Receipter Name:</label>
                    <input type="text" id="receipter" name="receipter" value={formData.receipter} onChange={handleChange} style={inputStyle} required />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="purpose" style={labelStyle}>Purpose:</label>
                    <input type="text" id="purpose" name="purpose" value={formData.purpose} onChange={handleChange} style={inputStyle} required />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="amount" style={labelStyle}>Amount:</label>
                    <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} style={inputStyle} required step="0.01" min="0" />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="date_given" style={labelStyle}>Date Given:</label>
                    <input type="date" id="date_given" name="date_given" value={formData.date_given} onChange={handleChange} style={inputStyle} />
                </div>
                <div style={buttonGroupStyle}>
                    <button type="button" onClick={() => navigate('/admin-dashboard')} style={cancelButtonStyle}>Cancel</button>
                    <button type="submit" style={saveButtonStyle}>Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default EditOfferingForm;