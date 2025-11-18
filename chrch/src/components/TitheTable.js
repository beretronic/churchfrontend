import React, { useEffect, useState } from 'react';

const TitheTable = () => {
    const [tithes, setTithes] = useState([]);

    useEffect(() => {
        fetch('/api/tithes/')
            .then((res) => res.json())
            .then((data) => setTithes(data));
    }, []);

    const styles = {
        container: { maxWidth: '600px', margin: '2rem auto' },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#fff',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        },
        th: {
            backgroundColor: '#007bff',
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
            <h2>Tithes</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Tither</th>
                        <th style={styles.th}>Amount</th>
                        <th style={styles.th}>Month</th>
                        <th style={styles.th}>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tithes.map((tithe, idx) => (
                        <tr key={idx}>
                            <td style={styles.td}>{tithe.tither}</td>
                            <td style={styles.td}>{tithe.amount}</td>
                            <td style={styles.td}>{tithe.month}</td>
                            <td style={styles.td}>{tithe.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TitheTable;