import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import heroBackground from './images/hero-background.jpg'; // Ensure the path is correct

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null); // State to handle API fetch errors

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
            padding: '4rem 1rem',
            boxSizing: 'border-box',
            flexDirection: 'column',
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            zIndex: 0,
        },
        contentWrapper: {
            maxWidth: '800px',
            margin: 'auto',
            position: 'relative',
            zIndex: 1,
            padding: '2rem',
            boxSizing: 'border-box', // Corrected typo here from 'border-sizing'
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            display: 'flex', // Added to properly center the button later
            flexDirection: 'column', // Stack children vertically
            alignItems: 'center', // Center content horizontally
        },
        heading: {
            textAlign: 'center',
            fontSize: '2.8rem',
            color: '#004080',
            marginBottom: '2.5rem',
            paddingBottom: '15px',
            borderBottom: '3px solid #004080',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: 'bold',
            width: 'fit-content', // Make heading fit its content
            margin: '0 auto 2.5rem auto', // Center the heading
        },
        card: {
            padding: '1.8rem',
            marginBottom: '1.8rem',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            borderLeft: '8px solid #0078d4',
            boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            width: '100%', // Ensure cards take full width of contentWrapper
            boxSizing: 'border-box',
        },
        // For inline styles in React, you apply hover effects using useState, not '&:hover'.
        // You'll need to manage a separate state for hover for each card if you want
        // individual hover effects. The below comment indicates the original (non-functional) approach.
        // '&:hover': {
        //     transform: 'translateY(-7px)',
        //     boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
        // },
        title: {
            fontSize: '1.6rem',
            fontWeight: 'bold',
            marginBottom: '0.8rem',
            color: '#004080',
        },
        date: {
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#555',
            marginBottom: '0.6rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        description: {
            marginTop: '1rem',
            color: '#333',
            lineHeight: '1.6',
            fontSize: '1rem',
        },
        location: {
            marginTop: '1rem',
            fontStyle: 'italic',
            color: '#777',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        noEventsMessage: {
            textAlign: 'center',
            color: '#666',
            fontSize: '1.2rem',
            padding: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            width: '100%',
            boxSizing: 'border-box',
        },
        errorMessage: {
            textAlign: 'center',
            color: '#c0392b',
            fontSize: '1.2rem',
            padding: '2rem',
            backgroundColor: 'rgba(255, 230, 230, 0.95)',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            width: '100%',
            boxSizing: 'border-box',
        },
        // --- New styles for the back button ---
        backButton: {
            display: 'block',
            padding: '0.6rem 1.5rem',
            fontSize: '0.9rem',
            backgroundColor: 'transparent',
            color: '#004080',
            border: '1px solid #004080',
            borderRadius: '30px',
            fontWeight: 'normal',
            cursor: 'pointer',
            textDecoration: 'none', // Essential for Link components
            transition: 'all 0.3s ease',
            marginTop: '2.5rem', // Space above the back button
            boxSizing: 'border-box',
            textAlign: 'center',
            width: 'fit-content', // Make button fit its content
            alignSelf: 'center', // Center the button horizontally within the flex container (contentWrapper)
        },
        backButtonHover: {
            backgroundColor: '#004080',
            color: '#fff',
            transform: 'translateY(-1px)',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        },
        // --- End new styles ---
    };

    useEffect(() => {
        // This is where you would fetch your event data from your backend API.
        // For example:
        fetch('http://127.0.0.1:8000/api/calendar/events/') // Or 'http://localhost:8000/api/calendar/events/' if you're running locally
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                // Sort events by date before setting them
                setEvents(
                    data.sort((a, b) => new Date(a.date) - new Date(b.date))
                );
                setError(null); // Clear any previous errors on successful fetch
            })
            .catch((err) => {
                console.error("Error fetching events:", err);
                setError("Failed to load events. Please try again later.");
                setEvents([]); // Clear events on error
            });
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <div style={styles.container}>
            <div style={styles.overlay}></div>
            <div style={styles.contentWrapper}>
                <h2 style={styles.heading}>Upcoming Events</h2>
                {error ? (
                    <p style={styles.errorMessage}>{error}</p>
                ) : events.length === 0 ? (
                    <p style={styles.noEventsMessage}>No events scheduled yet. Please check back later!</p>
                ) : (
                    events.map((event, idx) => (
                        <div key={idx} style={styles.card}>
                            <div style={styles.title}>{event.title}</div>
                            <div style={styles.date}>
                                <span role="img" aria-label="calendar-emoji">???</span>
                                {new Date(event.date).toLocaleDateString('en-GB', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })} at <span role="img" aria-label="time-emoji">?</span> {event.time}
                            </div>
                            <div style={styles.description}>{event.description}</div>
                            <div style={styles.location}>
                                <span role="img" aria-label="location-emoji">??</span> {event.location}
                            </div>
                        </div>
                    ))
                )}

                {/* --- Back to Home Button --- */}
                <Link
                    to="/" // Directs to the home page (root path)
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

export default Calendar;