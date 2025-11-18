// src/components/MemberRegistrationForm.jsx

import React, { useState } from 'react'; // Removed useEffect as it was unused
import { Link } from 'react-router-dom'; // Import Link for back button

const styles = {
    formContainer: { // New container for wallpaper and form
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        fontFamily: 'Segoe UI, sans-serif',
        color: '#333',
        backgroundImage: `linear-gradient(to bottom right, #f0f4f8, #d9e2ec)`, // Light gradient background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 1rem', // Padding around the form container
        boxSizing: 'border-box',
    },
    form: {
        maxWidth: '500px',
        width: '100%', // Ensure form takes full width up to maxWidth
        margin: '0 auto', // Center the form
        padding: '2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.95)', // Slightly transparent white
        borderRadius: '12px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        position: 'relative', // Ensure form is above any potential background overlays
        zIndex: 1,
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        fontSize: '1rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
        boxSizing: 'border-box', // Crucial for padding to be inside width
    },
    select: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        fontSize: '1rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    button: {
        padding: '12px',
        width: '100%',
        backgroundColor: '#004080', // Dark blue
        color: 'white',
        border: 'none',
        fontWeight: 'bold',
        borderRadius: '6px',
        cursor: 'pointer',
        marginTop: '10px',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3', // Darker blue on hover
    },
    buttonDisabled: {
        opacity: 0.7,
        cursor: 'not-allowed',
        backgroundColor: '#88a6cc',
    },
    successMessage: {
        color: '#28a745',
        textAlign: 'center',
        marginTop: '1rem',
        fontWeight: 'bold',
    },
    errorMessage: {
        color: '#dc3545',
        textAlign: 'center',
        marginTop: '1rem',
        fontWeight: 'bold',
        whiteSpace: 'pre-wrap', // Allows new lines for multi-line error messages
    },
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
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        marginTop: '1.5rem',
        boxSizing: 'border-box',
        textAlign: 'center',
        width: 'fit-content',
        alignSelf: 'center', // Center the button if form is flex column
    },
    backButtonHover: {
        backgroundColor: '#004080',
        color: '#fff',
        transform: 'translateY(-1px)',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    },
};

const MemberRegistrationForm = () => {
    const [member, setMember] = useState({
        name: '',
        surname: '',
        address: '',
        phone_number: '',
        email: '',
        gender: '',
    });
    const [message, setMessage] = useState(''); // State for success/error messages
    const [isError, setIsError] = useState(false); // State to differentiate success/error messages
    const [isSubmitting, setIsSubmitting] = useState(false); // State to disable button during submission
    const [buttonHovered, setButtonHovered] = useState(false); // For button hover
    const [backButtonHovered, setBackButtonHovered] = useState(false); // For back button hover

    // Get the authentication token from localStorage
    const token = localStorage.getItem('access');

    // Regex for Zimbabwean phone numbers:
    // Allows optional +263 prefix, or starts with 0
    // Followed by 7 (for most mobile networks), then 8 digits.
    // Example: 0771234567, +263771234567
    const ZIM_PHONE_REGEX = /^(?:(?:\+263)|0)7[1378][0-9]{7}$/;


    const handleChange = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value });
        // Clear messages when user starts typing again
        setMessage('');
        setIsError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Basic validation
        let currentErrors = [];
        if (!member.name || !member.surname || !member.phone_number || !member.email || !member.gender) {
            currentErrors.push('Please fill in all required fields.');
        }

        // Phone number validation
        if (member.phone_number && !ZIM_PHONE_REGEX.test(member.phone_number)) {
            currentErrors.push('Invalid Zimbabwean phone number format. Must start with 07 or +2637, e.g., 0771234567 or +263771234567.');
        }

        if (currentErrors.length > 0) {
            setMessage(currentErrors.join('\n')); // Join errors with newline
            setIsError(true);
            return;
        }

        setIsSubmitting(true); // Disable button
        setMessage(''); // Clear previous messages
        setIsError(false);

        try {
            const response = await fetch('http://localhost:8000/api/members/members/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the authentication token
                },
                body: JSON.stringify(member), // Send the member object as JSON
            });

            if (response.ok) {
                // If response is successful (status 200-299)
                setMessage('Member registered successfully!');
                setIsError(false);
                // Optionally clear the form after successful submission
                setMember({
                    name: '',
                    surname: '',
                    address: '',
                    phone_number: '',
                    email: '',
                    gender: '',
                });
            } else {
                // If response is not successful, parse the error message
                const errorData = await response.json();
                console.error('Registration failed:', response.status, errorData);

                let displayMessage = 'Registration failed. ';
                if (errorData) {
                    const fieldErrors = Object.keys(errorData)
                        .map(key => {
                            if (Array.isArray(errorData[key])) {
                                return `${key.replace(/_/g, ' ')}: ${errorData[key].join(', ')}`;
                            }
                            return `${key.replace(/_/g, ' ')}: ${errorData[key]}`;
                        })
                        .join('\n');
                    displayMessage += fieldErrors;
                } else {
                    displayMessage += 'An unknown error occurred.';
                }
                setMessage(displayMessage);
                setIsError(true);
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Network error during registration:', error);
            setMessage('Network error. Please check your connection and try again.');
            setIsError(true);
        } finally {
            setIsSubmitting(false); // Re-enable button
        }
    };

    return (
        <div style={styles.formContainer}> {/* Use formContainer for full page styling */}
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2 style={{ textAlign: 'center', color: '#004080', marginBottom: '1.5rem' }}>Register New Member</h2>
                <input
                    style={styles.input}
                    type="text"
                    name="name"
                    placeholder="First Name"
                    value={member.name}
                    onChange={handleChange}
                    required
                />
                <input
                    style={styles.input}
                    type="text"
                    name="surname"
                    placeholder="Surname"
                    value={member.surname}
                    onChange={handleChange}
                    required
                />
                <textarea
                    style={styles.input} // Reusing input style for textarea
                    name="address"
                    placeholder="Address (optional)"
                    value={member.address}
                    onChange={handleChange}
                />
                <input
                    style={styles.input}
                    type="tel" // Use type="tel" for phone numbers
                    name="phone_number"
                    placeholder="Phone Number (e.g., 0771234567 or +263771234567)"
                    value={member.phone_number}
                    onChange={handleChange}
                    required
                />
                <input
                    style={styles.input}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={member.email}
                    onChange={handleChange}
                    required
                />
                <select
                    style={styles.select}
                    name="gender"
                    value={member.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                {message && (
                    <p style={isError ? styles.errorMessage : styles.successMessage}>
                        {message}
                    </p>
                )}

                <button
                    style={{ ...styles.button, ...(isSubmitting ? styles.buttonDisabled : {}), ...(buttonHovered && !isSubmitting ? styles.buttonHover : {}) }}
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => setButtonHovered(true)}
                    onMouseLeave={() => setButtonHovered(false)}
                >
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>

                {/* Back to Home Button */}
                <Link
                    to="/admin-dashboard" // Assuming this form is accessed from admin dashboard
                    style={{ ...styles.backButton, ...(backButtonHovered ? styles.backButtonHover : {}) }}
                    onMouseEnter={() => setBackButtonHovered(true)}
                    onMouseLeave={() => setBackButtonHovered(false)}
                >
                    ? Back to Admin Dashboard
                </Link>
            </form>
        </div>
    );
};

export default MemberRegistrationForm;