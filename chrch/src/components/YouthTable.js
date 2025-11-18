import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tableStyles = {
    container: {
        maxWidth: '1000px',
        margin: '2rem auto',
        padding: '1rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        overflowX: 'auto',
        fontFamily: 'Segoe UI, sans-serif',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        padding: '12px',
        backgroundColor: '#2c3e50',
        color: '#fff',
        textAlign: 'left',
    },
    td: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    actionBtn: {
        marginRight: '8px',
        padding: '6px 10px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    editBtn: {
        backgroundColor: '#2980b9',
        color: '#fff',
    },
    deleteBtn: {
        backgroundColor: '#c0392b',
        color: '#fff',
    },
};

const YouthTable = () => {
    const [youthList, setYouthList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/api/youths/')
            .then((res) => res.json())
            .then((data) => setYouthList(data))
            .catch((err) => console.error('Error fetching youth data:', err));
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit-youth/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this youth?');
        if (!confirmed) return;

        try {
            const res = await fetch(`http://localhost:8000/api/youth/youths/${id}/`, {
                
                method: 'DELETE',
            });

            if (res.ok) {
                setYouthList((prevList) => prevList.filter((youth) => youth.id !== id));
            } else {
                console.error('Failed to delete youth');
            }
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    return (
        <div style={tableStyles.container}>
            <h2>Youth Directory</h2>
            <table style={tableStyles.table}>
                <thead>
                    <tr>
                        <th style={tableStyles.th}>Name</th>
                        <th style={tableStyles.th}>Date of Birth</th>
                        <th style={tableStyles.th}>Email</th>
                        <th style={tableStyles.th}>Phone</th>
                        <th style={tableStyles.th}>Address</th>
                        <th style={tableStyles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {youthList.map((youth) => (
                        <tr key={youth.id}>
                            <td style={tableStyles.td}>
                                {youth.first_name} {youth.last_name}
                            </td>
                            <td style={tableStyles.td}>{youth.date_of_birth}</td>
                            <td style={tableStyles.td}>{youth.email}</td>
                            <td style={tableStyles.td}>{youth.phone_number}</td>
                            <td style={tableStyles.td}>{youth.address}</td>
                            <td style={tableStyles.td}>
                                <button
                                    style={{ ...tableStyles.actionBtn, ...tableStyles.editBtn }}
                                    onClick={() => handleEdit(youth.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    style={{ ...tableStyles.actionBtn, ...tableStyles.deleteBtn }}
                                    onClick={() => handleDelete(youth.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default YouthTable;