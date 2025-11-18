import React, { useEffect, useState } from 'react';

const PledgeTable = () => {
    const [pledges, setPledges] = useState([]);

    useEffect(() => {
        fetch('/api/pledges/')
            .then((res) => res.json())
            .then((data) => setPledges(data));
    }, []);

    const styles = {
        container: { maxWidth: '700px', margin: '2rem auto' },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#fff',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        },
        th: {
            backgroundColor: '#6c63ff',
            color: 'white',
            padding: '0.75rem',
            textAlign: 'left'
        },
        td: {
            padding: '0.75rem',
            borderTop: '1px solid #ddd'
        }
    };

    return (
        <div style={styles.container}>
            <h2>Pledges</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Purpose</th>
                        <th style={styles.th}>Amount</th>
                        <th style={styles.th}>Installment 1</th>
                        <th style={styles.th}>Installment 2</th>
                        <th style={styles.th}>Installment 3</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {pledges.map((pledge, idx) => (
                        <tr key={idx}>
                            <td style={styles.td}>{pledge.name}</td>
                            <td style={styles.td}>{pledge.purpose}</td>
                            <td style={styles.td}>{pledge.amount}</td>
                            <td style={styles.td}>{pledge.installment1}</td>
                            <td style={styles.td}>{pledge.installment2}</td>
                            <td style={styles.td}>{pledge.installment3}</td>
                            <td style={styles.td}>{pledge.status}</td>
                            <td style={styles.td}>{pledge.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PledgeTable;