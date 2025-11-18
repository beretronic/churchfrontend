import React, { useEffect, useState } from 'react';

const EventDisplay = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('/api/events/')
            .then((res) => res.json())
            .then((data) => setEvents(data));
    }, []);

    const styles = {
        container: {
            maxWidth: '800px',
            margin: '2rem auto'
        },
        card: {
            backgroundColor: '#ffffff',
            padding: '1.5rem',
            marginBottom: '1rem',
            borderLeft: '5px solid #0078d4',
            borderRadius: '6px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
        },
        title: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#333'
        },
        details: {
            fontSize: '0.95rem',
            marginTop: '0.5rem',
            color: '#555'
        },
        timePlace: {
            marginTop: '0.75rem',
            fontStyle: 'italic',
            color: '#777'
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Upcoming Events</h2>
            {events.length === 0 ? (
                <p style={{ textAlign: 'center' }}>No upcoming events</p>
            ) : (
                events.map((event, idx) => (
                    <div key={idx} style={styles.card}>
                        <div style={styles.title}>{event.title}</div>
                        <div style={styles.details}>{event.description}</div>
                        <div style={styles.timePlace}>
                            {event.date} at {event.time} | {event.location}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default EventDisplay;