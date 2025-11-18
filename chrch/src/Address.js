import React, { useState } from 'react'; // Import useState for hover effect
import { Link } from 'react-router-dom'; // Import Link for navigation
import heroBackground from './images/hero-background.jpg'; // Ensure the path is correct

const Address = () => {
    // State for button hover effect
    const [isHovered, setIsHovered] = useState(false);

    const styles = {
        container: {
            minHeight: '100vh',
            width: '100vw',
            position: 'relative',
            fontFamily: 'Segoe UI, sans-serif',
            color: '#333', // Adjusted default text color for better contrast with overlay
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed', // Makes the background fixed when scrolling
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4rem 1rem', // Add padding to ensure content isn't flush with edges
            boxSizing: 'border-box', // Include padding in element's total width and height
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white overlay
            zIndex: 0,
        },
        addressBox: { // Renamed from container to addressBox for clarity, as it's the inner box
            maxWidth: '600px',
            margin: 'auto', // Centers the box horizontally within the flex container
            padding: '2.5rem', // Slightly more padding
            backgroundColor: 'rgba(238, 244, 249, 0.95)', // Slightly more opaque version of original color
            borderRadius: '12px', // Slightly larger border-radius
            boxShadow: '0 4px 15px rgba(0,0,0,0.15)', // Stronger shadow for depth
            zIndex: 1, // Ensure it's above the overlay
            textAlign: 'center', // Center text within the address box
            display: 'flex', // Use flexbox for internal layout
            flexDirection: 'column', // Stack children vertically
            alignItems: 'center', // Center items horizontally within the box
        },
        heading: {
            textAlign: 'center',
            color: '#004080',
            marginBottom: '1.5rem', // Increased margin-bottom
            fontSize: '2.2rem', // Slightly larger font size
        },
        paragraph: { // Apply a consistent style for paragraphs
            marginBottom: '0.75rem', // Space between lines
            fontSize: '1.1rem', // Slightly larger font size for readability
            color: '#003366', // Keep the dark blue color for text
        },
        strong: {
            fontWeight: 'bold',
            color: '#002244', // Make bold text slightly darker
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
            marginTop: '2rem', // Space above the back button
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
            <div style={styles.overlay}></div> {/* Background overlay */}
            <div style={styles.addressBox}> {/* Inner box for address content */}
                <h2 style={styles.heading}>Visit Us</h2>
                <p style={styles.paragraph}><strong style={styles.strong}>MyChurch Ministries</strong></p>
                <p style={styles.paragraph}>1 Petersham Rd </p>
                <p style={styles.paragraph}>Harare, Zimbabwe</p>
                <p style={styles.paragraph}>Phone: +263 77 123 4567</p>
                <p style={styles.paragraph}>Email: contact@slc.org</p>
                <p style={styles.paragraph}>Service Times: Sundays at 10:00 AM and Thursdays at 6:00 PM</p>

                {/* --- Back to Home Button --- */}
                <Link
                    to="/" // This 'to' prop points to your root path (LandingPage)
                    style={{ ...styles.backButton, ...(isHovered ? styles.backButtonHover : {}) }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    ? Back to Home
                </Link>
                {/* --------------------------- */}
            </div>
        </div>
    );
};

export default Address;