import React, { useState } from 'react';

const AddEventForm = () => {
    const [event, setEvent] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: ''
    });

    const styles = {
        form: {
            maxWidth: '500px',
            margin: '2rem auto',
            padding: '2rem',
            backgroundColor: '#fdfdfd',
            borderRadius: '8px',
            boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)'
        },
        heading: {
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: '#444'
        },
        input: {
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '1rem'
        },
        textarea: {
            width: '100%',
            padding: '0.75rem',
            height: '80px',
            marginBottom: '1rem',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '1rem'
        },
        button: {
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#0078d4',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer'
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/api/events/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        });
        alert('Event added!');
        setEvent({ title: '', description: '', date: '', time: '', location: '' });
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.heading}>Add Event</h2>
            <input style={styles.input} name="title" placeholder="Title" value={event.title} onChange={handleChange} />
            <textarea style={styles.textarea} name="description" placeholder="Description" value={event.description} onChange={handleChange} />
            <input style={styles.input} name="date" type="date" value={event.date} onChange={handleChange} />
            <input style={styles.input} name="time" type="time" value={event.time} onChange={handleChange} />
            <input style={styles.input} name="location" placeholder="Location" value={event.location} onChange={handleChange} />
            <button type="submit" style={styles.button}>Submit</button>
        </form>
    );
};

export default AddEventForm;