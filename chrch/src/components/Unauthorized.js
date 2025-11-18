// src/components/Unauthorized.js
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f8f9fa',
            fontFamily: 'Segoe UI, sans-serif',
            color: '#333',
            textAlign: 'center',
            padding: '20px'
        },
        card: {
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            padding: '40px',
            maxWidth: '500px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        icon: {
            fontSize: '4rem',
            color: '#dc3545', /* Red color for error/unauthorized */
            marginBottom: '1rem',
        },
        heading: {
            fontSize: '2.2rem',
            color: '#dc3545',
            marginBottom: '0.8rem',
        },
        paragraph: {
            fontSize: '1.1rem',
            lineHeight: '1.6',
            color: '#555',
            marginBottom: '1.5rem',
        },
        link: {
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#004080',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            cursor: 'pointer',
        },
        linkHover: {
            backgroundColor: '#0056b3',
            transform: 'scale(1.02)',
        }
    };

    const [linkHovered, setLinkHovered] = React.useState(false);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <span style={styles.icon}>&#10060;</span> {/* Red X icon */}
                <h1 style={styles.heading}>Unauthorized Access</h1>
                <p style={styles.paragraph}>
                    You do not have the necessary permissions to view this page.
                    Please log in with an account that has the required access rights.
                </p>
                <Link
                    to="/login"
                    style={{ ...styles.link, ...(linkHovered ? styles.linkHover : {}) }}
                    onMouseEnter={() => setLinkHovered(true)}
                    onMouseLeave={() => setLinkHovered(false)}
                >
                    Go to Login Page
                </Link>
            </div>
        </div>
    );
};

export default Unauthorized;
