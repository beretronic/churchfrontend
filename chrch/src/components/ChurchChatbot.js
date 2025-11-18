import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroBackground from '../images/hero-background.jpg'; // Ensure this path is correct for your local image

const ChurchChatbot = () => {
    // Initial messages with a more specific welcome
    const [messages, setMessages] = useState([
        { sender: 'bot', text: '👋 Welcome to Spirit Life Church International! I\'m here to help you find information about our services, ministries, giving, and more. What can I help you with today?' }
    ]);
    const [input, setInput] = useState('');
    const [sendButtonHovered, setSendButtonHovered] = useState(false);
    const [backButtonHovered, setBackButtonHovered] = useState(false);

    // Ref for auto-scrolling messages to the bottom
    const messagesEndRef = useRef(null);

    // Auto-scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input.trim() };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages); // Optimistically update UI with user's message

        const lowerInput = input.toLowerCase();
        let botReply = '';

        // --- Improved Reply Logic (More nuanced and contextual) ---
        if (
            lowerInput.includes('service') ||
            lowerInput.includes('time') ||
            lowerInput.includes('worship') ||
            lowerInput.includes('gatherings') ||
            lowerInput.includes('when do you meet')
        ) {
            botReply = `⛪ Our Service Times:\n\n` +
                `*Sunday Service:* 09:00 AM - 12:00 PM (Main Worship)\n` +
                `*Midweek Fellowship:* Every Thursday, 06:00 PM - 07:00 PM (Bible Study & Prayer)\n` +
                `*El Shaddai Prayers:* Every Saturday, 04:00 PM - 05:00 PM (Intercessory Prayer)\n\n` +
                `We look forward to welcoming you!`;
        } else if (
            lowerInput.includes('location') ||
            lowerInput.includes('address') ||
            lowerInput.includes('direction') ||
            lowerInput.includes('where is') ||
            lowerInput.includes('find you') ||
            lowerInput.includes('from cbd')
        ) {
            botReply = `📍 Spirit Life Church International is located at: *1 Petersham Rd, Marlborough, Harare, Zimbabwe*.\n\n` +
                `*Directions from Harare CBD:* Head west on Samora Machel Avenue, turn right onto Harare Drive, then left onto Petersham Road. The church will be on your right.\n\n` +
                `You can also find us easily on Google Maps!`;
            // Potentially add a link to Google Maps if available for your church.
            // botReply += ` [View on Google Maps](your_Maps_link_here)`;
        } else if (lowerInput.includes('prayer') || lowerInput.includes('pray for me') || lowerInput.includes('prayer request')) {
            botReply = `🙏 We believe in the power of prayer! Please share your prayer request directly here, and our dedicated prayer team will uplift you in prayer.\n\n` +
                `Alternatively, you can email your request to prayer@spiritlifechurch.org.`;
            // This is a simple text collection. For a more robust solution, you'd integrate with a form or backend.
        } else if (
            lowerInput.includes('ecocash') ||
            lowerInput.includes('banking') ||
            lowerInput.includes('giving') ||
            lowerInput.includes('donate') ||
            lowerInput.includes('tithe') ||
            lowerInput.includes('offering')
        ) {
            botReply = `💳 Thank you for your heart to give! Your generosity helps us spread the Gospel.\n\n` +
                `*Giving Options:*\n` +
                `*1. EcoCash Number:* 0777 123 456 (For Spirit Life Ministry)\n` +
                `*2. Bank Transfer:*\n` +
                `   Bank Name: Kingdom Church Bank\n` +
                `   Account Name: Spirit Life Ministry\n` +
                `   Account Number: 876543210\n\n` +
                `For online giving or specific projects, please visit our giving page on the website.`;
            // Add a link to your church's giving page if it exists.
            // botReply += ` [Give Online Here](your_giving_page_link_here)`;
        } else if (lowerInput.includes('project') || lowerInput.includes('funds') || lowerInput.includes('support')) {
            botReply = `🛠️ Yes, we have several impactful projects you can partner with us on!\n\n` +
                `We're currently raising funds for:\n` +
                `* **Youth Center:** To provide a safe and engaging space for our youth to grow spiritually and socially.\n` +
                `* **Community Borehole:** To provide clean, accessible water for our local community.\n` +
                `* **Music Equipment:** To enhance our worship experience and support our talented worship team.\n\n` +
                `Every contribution makes a difference! Would you like more details on how to get involved or give to a specific project?`;
        } else if (lowerInput.includes('pastor') || lowerInput.includes('leader') || lowerInput.includes('apostle')) {
            botReply = `Our beloved senior pastors are *Apostle Olsen Mhako* and *Pastor Rumbi Mhako*.\n\n` +
                `They lead Spirit Life Church International with wisdom and grace.`;
        } else if (lowerInput.includes('ministries') || lowerInput.includes('groups') || lowerInput.includes('departments')) {
            botReply = `We have a vibrant range of ministries to help you connect and grow:\n` +
                `* **Youth Ministry:** Engaging programs for our young people.\n` +
                `* **Women's Fellowship:** A community for women to connect and be empowered.\n` +
                `* **Men's Brotherhood:** Building strong men of faith.\n` +
                `* **Community Outreach:** Serving and impacting our local community.\n` +
                `* **Worship Team:** Leading us into God's presence.\n\n` +
                `Is there a specific ministry you'd like to know more about?`;
        } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('phone') || lowerInput.includes('talk to someone')) {
            botReply = `You can reach us through various channels:\n` +
                `* **Email:** info@spiritlifechurch.org (for general inquiries)\n` +
                `* **Phone/WhatsApp:** +263 77 123 4567\n` +
                `* **Office Hours:** Monday - Friday, 09:00 AM - 04:00 PM\n\n` +
                `Feel free to reach out, we're here to help!`;
        } else if (lowerInput.includes('events') || lowerInput.includes("what's happening") || lowerInput.includes('calendar')) { // <-- FIX IS HERE
            // This is a new, crucial addition for church chatbots
            botReply = `🗓️ Stay updated with our upcoming events!\n\n` +
                `Currently, we have:\n` +
                `* **Annual Revival Crusade:** 5th - 7th July, 6 PM daily.\n` +
                `* **Youth Explosion Conference:** 12th August, 9 AM - 3 PM.\n` +
                `* **Marriage Seminar:** Last Saturday of every month.\n\n` +
                `Check our website's events page for more details and to register!`;
            // Add a link to the events page if available.
            // botReply += ` [View Full Calendar](your_events_page_link_here)`;
        } else if (lowerInput.includes('about us') || lowerInput.includes('history') || lowerInput.includes('mission') || lowerInput.includes('vision')) {
            botReply = `Spirit Life Church International is a vibrant and growing community founded on the principles of faith, love, and community. Our mission is to transform lives through the power of the Holy Spirit and raise a generation passionately devoted to Christ.`;
        }
        // --- Fallback & Guidance ---
        else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
            botReply = `Hello there! How can I assist you further about Spirit Life Church International?`;
        }
        else {
            botReply = `I'm here to help with common questions about Spirit Life Church International like *service times*, *location*, *giving*, *pastors*, *ministries*, or *upcoming events*. Please try rephrasing your question, or choose from these topics!`;
        }

        // Add a slight delay for bot's response to simulate thinking
        setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botReply }]);
        }, 500); // 0.5 second delay

        setInput('');
    };

    const styles = {
        chatContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100vw',
            fontFamily: 'Segoe UI, sans-serif',
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            padding: '20px',
            boxSizing: 'border-box',
            position: 'relative',
        },
        wallpaperOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slightly darker overlay for better text contrast
            zIndex: 0,
        },
        chatbox: {
            flexGrow: 1,
            maxWidth: '700px',
            width: '100%',
            height: 'calc(100vh - 180px)',
            backgroundColor: 'rgba(255, 255, 255, 0.98)', // Less transparent for better readability
            borderRadius: '18px', // Slightly more rounded
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.25)', // Stronger, softer shadow
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            marginBottom: '20px',
            zIndex: 1,
            position: 'relative',
        },
        messagesDisplay: {
            flexGrow: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px', // More space between messages
            // Custom scrollbar for better aesthetics
            '::-webkit-scrollbar': {
                width: '8px',
            },
            '::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '10px',
            },
            '::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '10px',
            },
            '::-webkit-scrollbar-thumb:hover': {
                background: '#555',
            }
        },
        message: {
            padding: '12px 18px', // Slightly larger padding
            borderRadius: '20px', // More rounded bubbles
            maxWidth: '85%', // Allow messages to take up more width
            wordBreak: 'break-word',
            lineHeight: '1.6', // Improved line height for readability
            fontSize: '1rem', // Slightly larger font size
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        },
        user: {
            backgroundColor: '#004080', // Dark blue
            color: '#fff',
            alignSelf: 'flex-end',
            borderBottomRightRadius: '8px', // Smoother "tail"
        },
        bot: {
            backgroundColor: '#e0f7fa', // Lighter, more vibrant blue-grey
            color: '#263238', // Darker text for better contrast
            alignSelf: 'flex-start',
            borderBottomLeftRadius: '8px', // Smoother "tail"
        },
        inputArea: {
            display: 'flex',
            padding: '15px 20px', // Adjusted padding
            borderTop: '1px solid #e0e0e0', // Lighter border
            backgroundColor: '#ffffff', // Pure white for input area
            alignItems: 'center',
            boxShadow: '0 -2px 10px rgba(0,0,0,0.05)', // Subtle shadow at the top
        },
        textInput: {
            flexGrow: 1,
            padding: '14px 20px', // Larger input field
            border: '1px solid #c0c0c0', // Slightly softer border
            borderRadius: '28px', // More rounded
            fontSize: '1rem',
            marginRight: '12px', // More space
            outline: 'none',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            // Note: Inline styles do not support pseudo-classes like :focus directly.
            // For :focus, you would typically use a CSS module, styled-components, or a CSS-in-JS library.
            // Keeping the comment as a reminder.
        },
        sendButton: {
            padding: '14px 28px', // Larger button
            backgroundColor: '#004080',
            color: '#fff',
            border: 'none',
            borderRadius: '28px', // Rounded
            cursor: 'pointer',
            fontSize: '1.05rem', // Slightly larger font
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0 4px 10px rgba(0, 64, 128, 0.3)', // Button shadow
        },
        sendButtonHover: {
            backgroundColor: '#0056b3',
            transform: 'translateY(-2px)', // More pronounced lift
            boxShadow: '0 6px 15px rgba(0, 64, 128, 0.4)', // Enhanced shadow on hover
        },
        backButton: {
            position: 'fixed',
            top: '25px', // Slightly more from top
            left: '25px', // Slightly more from left
            padding: '12px 22px', // Slightly larger
            backgroundColor: 'rgba(108, 117, 125, 0.85)', // Slightly more opaque
            color: '#fff',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
            zIndex: 100,
            boxShadow: '0 3px 10px rgba(0,0,0,0.25)', // More noticeable shadow
        },
        backButtonHover: {
            backgroundColor: '#495057', // Even darker grey on hover
            transform: 'translateY(-3px)', // More pronounced lift
            boxShadow: '0 6px 15px rgba(0,0,0,0.35)', // More enhanced shadow
        },
    };

    return (
        <div style={styles.chatContainer}>
            <div style={styles.wallpaperOverlay}></div>

            <Link
                to="/"
                style={{ ...styles.backButton, ...(backButtonHovered ? styles.backButtonHover : {}) }}
                onMouseEnter={() => setBackButtonHovered(true)}
                onMouseLeave={() => setBackButtonHovered(false)}
            >
                ← Back to Home
            </Link>

            <div style={styles.chatbox}>
                <div style={styles.messagesDisplay}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.message,
                                ...(msg.sender === 'user' ? styles.user : styles.bot)
                            }}
                        >
                            {msg.text.split('\n').map((line, i) => (
                                // Render new lines correctly and apply basic markdown for '*'
                                <span key={i}>
                                    {line.split('*').map((part, j) => j % 2 === 1 ? <b key={j}>{part}</b> : part)}
                                    {i < line.length - 1 && <br />}
                                </span>
                            ))}
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* For auto-scrolling */}
                </div>
                <div style={styles.inputArea}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message here..."
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        style={styles.textInput}
                    />
                    <button
                        onClick={handleSend}
                        style={{ ...styles.sendButton, ...(sendButtonHovered ? styles.sendButtonHover : {}) }}
                        onMouseEnter={() => setSendButtonHovered(true)}
                        onMouseLeave={() => setSendButtonHovered(false)}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChurchChatbot;