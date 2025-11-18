
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    container: {
        maxWidth: '1000px',
        margin: '2rem auto',
        padding: '1rem',
        backgroundColor: '#f4f6f8',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        backgroundColor: '#2c3e50',
        color: '#fff',
        padding: '12px',
        textAlign: 'left',
    },
    td: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    actionBtn: {
        padding: '5px 10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    editBtn: {
        backgroundColor: '#4CAF50',
        color: '#fff',
    },
    deleteBtn: {
        backgroundColor: '#f44336',
        color: '#fff',
    },
};

const MemberTable = () => {
    const [memberList, setMemberList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/api/members/')
            .then((res) => res.json())
            .then((data) => setMemberList(data))
            .catch((err) => console.error('Error fetching member data:', err));
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit-member/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this member?');
        if (!confirmed) return;
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/members/members/${id}/`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setMemberList((prevList) => prevList.filter((member) => member.id !== id));
            } else {
                console.error('Failed to delete ');
            }
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Member Directory</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Surname</th>
                        <th style={styles.th}>Address</th>
                        <th style={styles.th}>Phone</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Gender</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {memberList.map((member) => (
                        <tr key={member.id}>
                            <td style={styles.td}>{member.name}</td>
                            <td style={styles.td}>{member.surname}</td>
                            <td style={styles.td}>{member.address || '—'}</td>
                            <td style={styles.td}>{member.phone_number}</td>
                            <td style={styles.td}>{member.email}</td>
                            <td style={styles.td}>{member.gender}</td>
                            <td style={styles.td}>
                                <button
                                    style={{ ...styles.actionBtn, ...styles.editBtn }}
                                    onClick={() => handleEdit(member.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                                    onClick={() => handleDelete(member.id)}
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

export default MemberTable;

