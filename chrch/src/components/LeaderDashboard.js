// src/components/LeaderDashboard.js
import React from 'react';

const LeaderDashboard = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f0f2f5',
            padding: '20px',
            fontFamily: 'Segoe UI, sans-serif',
            color: '#333',
            textAlign: 'center'
        },
        card: {
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            padding: '40px',
            maxWidth: '600px',
            width: '100%',
        },
        heading: {
            fontSize: '2.5rem',
            color: '#004080',
            marginBottom: '1rem',
        },
        paragraph: {
            fontSize: '1.1rem',
            lineHeight: '1.6',
            color: '#555',
            marginBottom: '1rem',
        },
        highlight: {
            color: '#007bff',
            fontWeight: 'bold',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.heading}>Welcome, Leader!</h1>
                <p style={styles.paragraph}>
                    This is your <span style={styles.highlight}>Leader Dashboard</span>. Here you can manage events, track youth group activities, and oversee various church programs.
                </p>
                <p style={styles.paragraph}>
                    As a leader, you have access to specific tools and insights to guide your team effectively.
                </p>
                <p style={styles.paragraph}>
                    Stay tuned for more features and updates!
                </p>
            </div>
        </div>
    );
};

export default LeaderDashboard;
