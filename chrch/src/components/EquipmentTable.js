import React, { useEffect, useState } from 'react';

const EquipmentTable = () => {
    const [equipmentList, setEquipmentList] = useState([]);

    useEffect(() => {
        fetch('/api/equipment/')
            .then((res) => res.json())
            .then((data) => setEquipmentList(data));
    }, []);

    const styles = {
        container: { maxWidth: '700px', margin: '2rem auto' },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#fff',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            overflow: 'hidden'
        },
        th: {
            backgroundColor: '#4a90e2',
            color: '#fff',
            padding: '0.75rem',
            textAlign: 'left'
        },
        td: {
            padding: '0.75rem',
            borderTop: '1px solid #eee'
        },
        heading: {
            textAlign: 'center',
            marginBottom: '1rem',
            color: '#333'
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Equipment Inventory</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Code</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {equipmentList.map((item, idx) => (
                        <tr key={idx}>
                            <td style={styles.td}>{item.name}</td>
                            <td style={styles.td}>{item.code}</td>
                            <td style={styles.td}>{item.description}</td>
                            <td style={styles.td}>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EquipmentTable;