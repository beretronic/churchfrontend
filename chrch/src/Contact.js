import React, { useState } from 'react'; // Import useState for hover effect
import { Link } from 'react-router-dom'; // Import Link for navigation
import heroBackground from './images/hero-background.jpg'; // Ensure the path is correct

const Contact = () => {
    // State for button hover effect
    const [isHovered, setIsHovered] = useState(false);

    const styles = {
        container: {
            minHeight: '100vh',
            width: '100vw',
            position: 'relative',
            fontFamily: 'Segoe UI, sans-serif',
            color: '#333',
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4rem 1rem',
            boxSizing: 'border-box',
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.6)', // Semi-transparent white overlay for the background
            zIndex: 0,
        },
        formContainer: {
            maxWidth: '600px',
            padding: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white for the form
            borderRadius: '8px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            zIndex: 1, // Ensure the form is above the overlay
            display: 'flex', // Use flexbox for internal layout
            flexDirection: 'column', // Stack children vertically
            alignItems: 'center', // Center items horizontally within the container
        },
        heading: {
            textAlign: 'center',
            color: '#004080',
            marginBottom: '1.5rem',
        },
        input: {
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '1rem',
            boxSizing: 'border-box',
        },
        textarea: {
            width: '100%',
            padding: '0.75rem',
            height: '150px', // Increased height for better message writing
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '1rem',
            marginBottom: '1rem',
            boxSizing: 'border-box',
            resize: 'vertical', // Allow vertical resizing
        },
        button: {
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#004080',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            // No '&:hover' here for inline styles, use a separate hover style
        },
        buttonHover: { // Style for the main submit button on hover
            backgroundColor: '#003366',
        },
        // --- New styles for the back button ---
        backButton: {
            display: 'block', // Make it a block element to take full width if needed, or 'inline-block'
            padding: '0.6rem 1.5rem', // Slightly smaller padding for the back button
            fontSize: '0.9rem', // Slightly smaller font size
            backgroundColor: 'transparent', // Transparent background
            color: '#004080', // Theme color for the text
            border: '1px solid #004080', // Border matching the text color
            borderRadius: '30px', // Pill shape
            fontWeight: 'normal',
            cursor: 'pointer',
            textDecoration: 'none', // Important for Link component
            transition: 'all 0.3s ease',
            marginTop: '1.5rem', // Space above the back button
            boxSizing: 'border-box',
            textAlign: 'center', // Center text within the button
            width: 'fit-content', // Adjust width to content
        },
        backButtonHover: {
            backgroundColor: '#004080', // Background becomes theme color on hover
            color: '#fff', // Text becomes white on hover
            transform: 'translateY(-1px)', // Slight lift effect
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)', // Subtle shadow
        },
        // --- End new styles ---
    };

    return (
        <div style={styles.container}>
            <div style={styles.overlay}></div>
            <div style={styles.formContainer}>
                <h2 style={styles.heading}>Contact Us</h2>
                <input type="text" placeholder="Full Name" style={styles.input} />
                <input type="email" placeholder="Email Address" style={styles.input} />
                <textarea placeholder="Your Message..." style={styles.textarea} />
                {/* Apply hover styles to the main button */}
                <button
                    style={{ ...styles.button, ...(isHovered ? styles.buttonHover : {}) }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Send Message
                </button>

                {/* --- Back to Home Button --- */}
                <Link
                    to="/" // This 'to' prop points to your root path (LandingPage)
                    style={{ ...styles.backButton, ...(isHovered ? styles.backButtonHover : {}) }} // Reusing isHovered for simplicity, or create a new state like linkHover
                    onMouseEnter={() => setIsHovered(true)} // Reusing the same hover state
                    onMouseLeave={() => setIsHovered(false)} // Reusing the same hover state
                >
                    ? Back to Home
                </Link>
                {/* --------------------------- */}
            </div>
        </div>
    );
};

export default Contact;