import React, { useEffect, useState } from 'react';

const OfferingTable = () => {
    const [offerings, setOfferings] = useState([]);

    useEffect(() => {
        fetch('/api/offerings/')
            .then((res) => res.json())
            .then((data) => setOfferings(data));
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
            backgroundColor: '#28a745',
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
            <h2>Offerings</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Receipter</th>
                        <th style={styles.th}>Purpose</th>
                        <th style={styles.th}>Amount</th>
                        <th style={styles.th}>Date Given</th>
                    </tr>
                </thead>
                <tbody>
                    {offerings.map((offering, idx) => (
                        <tr key={idx}>
                            <td style={styles.td}>{offering.receipter}</td>
                            <td style={styles.td}>{offering.purpose}</td>
                            <td style={styles.td}>{offering.amount}</td>
                            <td style={styles.td}>{offering.date_given}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OfferingTable;