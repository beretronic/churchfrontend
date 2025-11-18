// src/components/AboutUs.js
import React, { useState } from 'react'; // Import useState for hover effect
import { Link } from 'react-router-dom'; // Import Link for navigation
import heroBackground from './images/hero-background.jpg'; // Corrected import path

const AboutUs = () => {
    // State for button hover effect
    const [isHovered, setIsHovered] = useState(false);

    const styles = {
        container: {
            padding: '4rem 1rem',
            fontFamily: 'Segoe UI, sans-serif',
            lineHeight: '1.7',
            color: '#333',
            minHeight: '100vh',
            width: '100vw',
            position: 'relative',
            zIndex: 1,

            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            display: 'flex', // Use flex to center contentWrapper if it's smaller
            justifyContent: 'center', // Center horizontally
            alignItems: 'flex-start', // Align to start vertically, or 'center' if you want it mid-page
            paddingTop: '6rem', // Add padding to account for a fixed header if you have one
            paddingBottom: '4rem', // Ensure space at the bottom
        },
        contentWrapper: { // A new wrapper for your actual text content to constrain its width
            maxWidth: '900px',
            width: '100%', // Take full width up to maxWidth
            margin: 'auto', // Center the content within the full-width background
            position: 'relative',
            zIndex: 2, // Ensure content is above the background and any overlays
            padding: '1rem', // Add some internal padding
        },
        overlay: { // For better text readability over the image
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)', // Slightly more opaque white overlay for better readability
            zIndex: 0, // Place behind content but above the background image
        },
        heading: {
            fontSize: '2.8rem', // Slightly larger heading
            marginBottom: '1.5rem', // More space below heading
            textAlign: 'center',
            color: '#004080',
            backgroundColor: 'rgba(255, 255, 255, 0.95)', // More opaque for headings
            padding: '12px 25px',
            borderRadius: '10px', // More rounded
            display: 'block', // Changed to block to take full width and center
            margin: '0 auto 2rem auto', // Center and add more bottom margin
            boxShadow: '0 3px 8px rgba(0,0,0,0.15)', // Softer, more pronounced shadow
            width: 'fit-content', // Adjust width to content
            boxSizing: 'border-box',
            fontWeight: 'bold',
        },
        subheading: {
            fontSize: '1.6rem', // Slightly larger subheading
            marginTop: '2.5rem', // More space above
            marginBottom: '1rem', // More space below
            color: '#004080',
            backgroundColor: 'rgba(255, 255, 255, 0.95)', // More opaque for subheadings
            padding: '10px 20px',
            borderRadius: '8px',
            display: 'inline-block',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            width: 'fit-content',
            boxSizing: 'border-box',
            fontWeight: '600',
        },
        paragraph: {
            marginTop: '0.8rem', // More space above paragraphs
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // More opaque for paragraphs
            padding: '18px', // More padding
            borderRadius: '10px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            marginBottom: '1.2rem', // More space below
            lineHeight: '1.8',
            fontSize: '1.05rem', // Slightly larger text
        },
        mission: {
            backgroundColor: 'rgba(235, 240, 245, 0.98)', // Slightly darker, almost opaque for mission box
            padding: '2rem', // More padding
            borderRadius: '15px', // More rounded
            marginTop: '3rem', // More space above
            boxShadow: '0 5px 15px rgba(0,0,0,0.12)',
            border: '1px solid #e0e6ec', // Subtle border
        },
        listItem: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // More opaque for list items
            padding: '10px 18px',
            borderRadius: '8px',
            marginBottom: '0.8rem', // More space between list items
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            fontSize: '1.05rem',
        },
        // --- New styles for the back button ---
        backButton: {
            display: 'inline-block', // Or 'block' if you want it centered
            padding: '0.8rem 2rem',
            fontSize: '1.1rem',
            backgroundColor: '#004080', // Primary blue color
            color: '#fff',
            border: 'none',
            borderRadius: '30px', // Pill shape
            fontWeight: 'bold',
            cursor: 'pointer',
            textDecoration: 'none', // Important for Link component
            transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            marginTop: '3rem', // Space above the button
            marginBottom: '1rem', // Space below if more content follows
            width: 'fit-content', // Only as wide as content
        },
        backButtonHover: {
            backgroundColor: '#0056b3', // Darker blue on hover
            transform: 'translateY(-2px)', // Lift effect
            boxShadow: '0 6px 15px rgba(0,0,0,0.3)', // Enhanced shadow
        },
        // --- End new styles ---
    };

    return (
        <div style={styles.container}>
            <div style={styles.overlay}></div> {/* The overlay for the background */}
            <div style={styles.contentWrapper}> {/* New wrapper for your content */}
                <h1 style={styles.heading}>About Us</h1>

                <p style={styles.paragraph}>
                    MyChurch is a Christ-centered community dedicated to spiritual growth, service, and love.
                    We're more than a building—we're a family committed to walking in faith and lifting one another up.
                </p>

                <div style={styles.mission}>
                    <h2 style={styles.subheading}>Our Mission</h2>
                    <p style={styles.paragraph}>
                        To be a light in the world by sharing the Gospel, nurturing relationships, and building a supportive space for worship, learning, and outreach.
                    </p>
                </div>

                <h2 style={styles.subheading}>What We Value</h2>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '0.5rem' }}>
                    <li style={styles.listItem}>**Community:** We grow stronger together.</li>
                    <li style={styles.listItem}>**Discipleship:** We live and learn through the Word.</li>
                    <li style={styles.listItem}>**Compassion:** We serve with purpose and care.</li>
                    <li style={styles.listItem}>**Worship:** We gather to glorify God and rejoice in His presence.</li>
                </ul>

                <h2 style={styles.subheading}>Get Involved</h2>
                <p style={styles.paragraph}>
                    Whether you're new to faith or a lifelong believer, there's a place for you here. Join us in Sunday services, small groups, youth ministry, or community outreach events. We can’t wait to meet you!
                </p>

                {/* --- Back to Home Button --- */}
                <Link
                    to="/" // Navigates to your root path (LandingPage)
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

export default AboutUs;