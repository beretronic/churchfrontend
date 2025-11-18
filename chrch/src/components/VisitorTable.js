// src/components/VisitorTable.jsx

import React, { useEffect, useState } from 'react';

const tableStyles = {
    container: {
        maxWidth: '900px',
        margin: '2rem auto',
        overflowX: 'auto',
        padding: '1rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    header: {
        backgroundColor: '#2c3e50',
        color: '#fff',
        textAlign: 'left',
    },
    th: {
        padding: '12px',
        borderBottom: '1px solid #ddd',
    },
    td: {
        padding: '12px',
        borderBottom: '1px solid #eee',
    },
    row: {
        backgroundColor: '#fff',
    },
};

const VisitorTable = () => {
    const [visitors, setVisitors] = useState([]);

    useEffect(() => {
        // Simulate fetching data
        const sampleVisitors = [
            {
                name: 'Tinashe Dube',
                email: 'tinashe@example.com',
                phone_number: '0712345678',
                address: '29 Chiremba Road',
                date_visited: '2025-06-19',
            },
            {
                name: 'Linda Nyathi',
                email: 'linda@example.com',
                phone_number: '0787654321',
                address: '15 Borrowdale Drive',
                date_visited: '2025-06-18',
            },
        ];
        setVisitors(sampleVisitors);
    }, []);

    return (
        <div style={tableStyles.container}>
            <h2>Visitor Log</h2>
            <table style={tableStyles.table}>
                <thead style={tableStyles.header}>
                    <tr>
                        <th style={tableStyles.th}>Name</th>
                        <th style={tableStyles.th}>Email</th>
                        <th style={tableStyles.th}>Phone</th>
                        <th style={tableStyles.th}>Address</th>
                        <th style={tableStyles.th}>Date Visited</th>
                    </tr>
                </thead>
                <tbody>
                    {visitors.map((visitor, index) => (
                        <tr key={index} style={tableStyles.row}>
                            <td style={tableStyles.td}>{visitor.name}</td>
                            <td style={tableStyles.td}>{visitor.email}</td>
                            <td style={tableStyles.td}>{visitor.phone_number || '—'}</td>
                            <td style={tableStyles.td}>{visitor.address || '—'}</td>
                            <td style={tableStyles.td}>{visitor.date_visited}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VisitorTable;