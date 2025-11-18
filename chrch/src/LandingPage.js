import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import heroBackgroundImage from './images/hero-background.jpg';

// Import your social media PNG icons
import facebookIcon from './images/facebook_icon.png';
import twitterIcon from './images/twitter_icon.png';
import youtubeIcon from './images/youtube_icon.png';
import whatsappIcon from './images/whatsapp_icon.png';

const LandingPage = () => {
    const navigate = useNavigate();

    // State for hover effects, managed inline for now
    const [loginBtnHover, setLoginBtnHover] = useState(false);
    const [signupBtnHover, setSignupBtnHover] = useState(false);
    const [socialIconHovers, setSocialIconHovers] = useState({});

    // All styles are defined here. For larger projects, consider CSS Modules or Styled Components.
    const inlineStyles = {
        pageContainer: {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            // Ensure font smoothing for better text rendering
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 3rem',
            backgroundColor: 'rgba(0, 64, 128, 0.7)', // Dark blue with transparency
            color: '#fff',
            position: 'fixed', // Stays at the top
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000, // Above other content
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            backdropFilter: 'blur(5px)', // Blurs content behind the header
            WebkitBackdropFilter: 'blur(5px)', // For Safari support
        },
        logo: {
            fontSize: '1.8rem',
            fontWeight: '700',
            letterSpacing: '1px',
            textDecoration: 'none', // Ensure logo is not underlined if it's a link
            color: '#fff',
        },
        nav: {
            display: 'flex',
            gap: '2.2rem',
        },
        navItem: {
            fontWeight: '500',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1.1rem',
            transition: 'color 0.3s ease-in-out',
            // Adding hover effect for general nav items
            '&:hover': {
                color: '#ffcc00', // Yellow on hover
            },
        },
        activeNavItem: {
            color: '#ffcc00', // Active item is yellow
            textDecoration: 'underline',
            fontWeight: '700',
        },
        hero: {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: '#fff',
            textShadow: '2px 2px 5px rgba(0,0,0,0.7)',
            paddingTop: '80px', // Offset for fixed header
            backgroundImage: `url(${heroBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative', // Needed for the overlay to position correctly
        },
        heroOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)', // Darker overlay for better text readability
            zIndex: 1, // Below content, above background
        },
        heroContent: {
            zIndex: 2, // Content on top of overlay
            position: 'relative', // To respect z-index
            maxWidth: '900px', // Constrain width for better readability
            padding: '0 1.5rem', // Horizontal padding
            // *** KEY CHANGE FOR CENTERING: Ensure flex centering is strong ***
            display: 'flex', // Make heroContent itself a flex container
            flexDirection: 'column', // Stack children vertically
            alignItems: 'center', // Center children horizontally within heroContent
            justifyContent: 'center', // Center children vertically within heroContent
            height: '100%', // Take full height available within hero to help centering
        },
        heroHeading: {
            fontSize: '4rem', // Larger, more impactful
            marginBottom: '1rem',
            fontWeight: 'bold',
            letterSpacing: '1px',
            lineHeight: '1.2',
        },
        heroSubheading: {
            fontSize: '1.8rem',
            marginBottom: '1.5rem',
            fontWeight: 'lighter', // Slightly less bold than main heading
            lineHeight: '1.4',
        },
        heroParagraph: { // Specific style for the paragraph within hero
            fontSize: '1.2rem',
            maxWidth: '700px',
            lineHeight: '1.6',
            marginBottom: '2rem', // Increased margin to give buttons more breathing room after text
        },
        buttonContainer: {
            display: 'flex',
            gap: '2rem',
            marginTop: '0', // No extra top margin here, let paragraph's margin control spacing
        },
        button: {
            padding: '1rem 3rem',
            fontSize: '1.2rem', // Slightly larger buttons
            backgroundColor: '#ffcc00', // Yellow primary button
            color: '#003366', // Dark blue text
            border: 'none',
            borderRadius: '30px', // Pill shape
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            whiteSpace: 'nowrap', // Prevents button text from wrapping
        },
        buttonHover: {
            backgroundColor: '#e6b800', // Darker yellow on hover
            transform: 'translateY(-2px)', // Lift effect on hover
        },
        socials: {
            position: 'fixed', // Fixed position for social icons
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)', // Center horizontally
            display: 'flex',
            gap: '1.5rem',
            zIndex: 1001, // Above all other content
        },
        icon: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '3.5rem',
            height: '3.5rem',
            color: '#fff',
            backgroundColor: 'rgba(0, 64, 128, 0.8)', // Semi-transparent dark blue circle
            borderRadius: '50%', // Make it a circle
            textDecoration: 'none',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            boxSizing: 'border-box',
        },
        iconImage: {
            width: '1.7rem', // Size of the PNG icon inside the circle
            height: '1.7rem',
            objectFit: 'contain',
        },
        iconHover: {
            backgroundColor: '#ffcc00', // Yellow on hover
            transform: 'scale(1.1)', // Slight enlarge on hover
        },
        // --- NEW SECTION STYLES ---
        section: {
            padding: '4rem 2rem',
            textAlign: 'center',
            backgroundColor: '#f8f8f8', // Light grey background for contrast
            borderBottom: '1px solid #eee', // Subtle separator
        },
        sectionHeading: {
            fontSize: '2.5rem',
            color: '#004080', // Dark blue heading
            marginBottom: '1.5rem',
            fontWeight: 'bold',
        },
        sectionContent: {
            maxWidth: '800px',
            margin: '0 auto', // Center content block
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#333',
        },
        cardsContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // Responsive grid for cards
            gap: '2rem',
            marginTop: '2.5rem',
            maxWidth: '1000px',
            margin: '2.5rem auto 0 auto', // Center the card grid
        },
        card: {
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)', // Soft shadow
            textAlign: 'left',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition
            cursor: 'default', // Indicate it's not clickable by default
            '&:hover': {
                transform: 'translateY(-5px)', // Lift effect on hover
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)', // Enhanced shadow
            },
        },
        cardTitle: {
            fontSize: '1.5rem',
            color: '#004080',
            marginBottom: '0.8rem',
            fontWeight: '600',
        },
        cardText: {
            fontSize: '1rem',
            color: '#555',
            lineHeight: '1.6',
        },
        footer: {
            backgroundColor: '#003366', // Dark blue footer
            color: '#fff',
            padding: '2rem 1rem',
            textAlign: 'center',
            fontSize: '0.9rem',
            marginTop: 'auto', // Pushes footer to the bottom of the page container
        },
        footerLinks: {
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
        },
        footerLink: {
            color: '#fff',
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline',
            },
        }
    };

    return (
        <div style={inlineStyles.pageContainer}>
            <header style={inlineStyles.header}>
                <NavLink to="/" style={inlineStyles.logo}>KingQuip</NavLink>
                <nav style={inlineStyles.nav}>
                    <NavLink to="/" style={({ isActive }) => ({ ...inlineStyles.navItem, ...(isActive ? inlineStyles.activeNavItem : {}) })} end>Home</NavLink>
                    <NavLink to="/about" style={({ isActive }) => ({ ...inlineStyles.navItem, ...(isActive ? inlineStyles.activeNavItem : {}) })}>About Us</NavLink>
                    <NavLink to="/chatbot" style={({ isActive }) => ({ ...inlineStyles.navItem, ...(isActive ? inlineStyles.activeNavItem : {}) })}>Chat</NavLink>
                    <NavLink to="/address" style={({ isActive }) => ({ ...inlineStyles.navItem, ...(isActive ? inlineStyles.activeNavItem : {}) })}>Address</NavLink>
                    <NavLink to="/calendar" style={({ isActive }) => ({ ...inlineStyles.navItem, ...(isActive ? inlineStyles.activeNavItem : {}) })}>Calendar</NavLink>
                </nav>
            </header>

            {/* --- Hero Section: The main visual impact --- */}
            <section style={inlineStyles.hero}>
                <div style={inlineStyles.heroOverlay}></div> {/* Overlay for better text contrast */}
                <div style={inlineStyles.heroContent}> {/* This div now has flex properties to center its own content */}
                    <h1 style={inlineStyles.heroHeading}>Find Your Spiritual Home</h1>
                    <h2 style={inlineStyles.heroSubheading}>
                        A welcoming community where faith grows and lives are transformed.
                    </h2>
                    <p style={inlineStyles.heroParagraph}>
                        Join us in faith, fellowship, and service. Discover a place where you belong and can grow spiritually.
                    </p>
                    <div style={inlineStyles.buttonContainer}>
                        <button
                            style={{ ...inlineStyles.button, ...(loginBtnHover ? inlineStyles.buttonHover : {}) }}
                            onClick={() => navigate('/login')}
                            onMouseEnter={() => setLoginBtnHover(true)}
                            onMouseLeave={() => setLoginBtnHover(false)}
                        >
                            Login
                        </button>
                        <button
                            style={{ ...inlineStyles.button, ...(signupBtnHover ? inlineStyles.buttonHover : {}) }}
                            onClick={() => navigate('/signup')}
                            onMouseEnter={() => setSignupBtnHover(true)}
                            onMouseLeave={() => setSignupBtnHover(false)}
                        >
                            Signup
                        </button>
                    </div>
                </div>
            </section>

            {/* --- New Section: Mission & Vision / What We Offer --- */}
            <section style={inlineStyles.section}>
                <h2 style={inlineStyles.sectionHeading}>Our Mission & Vision</h2>
                <p style={inlineStyles.sectionContent}>
                    We are dedicated to building a vibrant, faith-filled community that empowers individuals
                    to live out their purpose, serve others, and deepen their relationship with God.
                    Our vision is to impact lives positively within our local community and beyond.
                </p>
                <div style={inlineStyles.cardsContainer}>
                    <div style={inlineStyles.card}>
                        <h3 style={inlineStyles.cardTitle}>Welcoming Community</h3>
                        <p style={inlineStyles.cardText}>Discover a place where everyone is valued and accepted, fostering genuine connections and lasting friendships.</p>
                    </div>
                    <div style={inlineStyles.card}>
                        <h3 style={inlineStyles.cardTitle}>Spiritual Growth</h3>
                        <p style={inlineStyles.cardText}>Engage with inspiring teachings, meaningful worship, and opportunities to deepen your faith journey.</p>
                    </div>
                    <div style={inlineStyles.card}>
                        <h3 style={inlineStyles.cardTitle}>Community Impact</h3>
                        <p style={inlineStyles.cardText}>Participate in outreach programs and initiatives that make a tangible difference in the lives of others.</p>
                    </div>
                </div>
            </section>

            {/* --- New Section: Services and Events --- */}
            <section style={{ ...inlineStyles.section, backgroundColor: '#fff' }}> {/* Example of a white background section */}
                <h2 style={inlineStyles.sectionHeading}>Join Us For Our Services</h2>
                <p style={inlineStyles.sectionContent}>
                    Experience powerful worship and a relevant message designed to inspire and uplift you.
                </p>
                <div style={inlineStyles.cardsContainer}> {/* Reusing card styling for service times */}
                    <div style={inlineStyles.card}>
                        <h3 style={inlineStyles.cardTitle}>Sunday Service</h3>
                        <p style={inlineStyles.cardText}>Time: 09:00 AM - 12:00 PM</p>
                        <p style={inlineStyles.cardText}>Location: Cathedral Of Grace</p>
                        <p style={inlineStyles.cardText}> Join us for worship, fellowship, and a timely message.</p>
                    </div>
                    <div style={inlineStyles.card}>
                        <h3 style={inlineStyles.cardTitle}>Thursday Midweek Service</h3>
                        <p style={inlineStyles.cardText}>Time: 6:00 to 7:00 PM</p>
                        <p style={inlineStyles.cardText}>Location: Cathedral Of Grace</p>
                        <p style={inlineStyles.cardText}>Deepen your understanding of the scriptures.</p>
                    </div>
                </div>
                <button
                    style={{ ...inlineStyles.button, marginTop: '3rem', fontSize: '1.1rem' }}
                    onClick={() => navigate('/calendar')} // Navigates to your Calendar page
                >
                    View All Events
                </button>
            </section>

            {/* --- Social Media Icons --- */}
            <div style={inlineStyles.socials}>
                {[
                    // IMPORTANT: Update these hrefs with your actual social media links!
                    { id: 'facebook', href: 'https://facebook.com/yourcommunitypage', iconSrc: facebookIcon, alt: 'Facebook' },
                    { id: 'twitter', href: 'https://twitter.com/yourcommunity', iconSrc: twitterIcon, alt: 'Twitter' },
                    { id: 'youtube', href: 'https://www.youtube.com/yourcommunitychannel', iconSrc: youtubeIcon, alt: 'YouTube' },
                    { id: 'whatsapp', href: 'https://wa.me/263771234567', iconSrc: whatsappIcon, alt: 'WhatsApp' }, // Example with Zimbabwe country code. Replace with your number.
                ].map((social) => (
                    <a
                        key={social.id}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer" // Security best practice for target="_blank"
                        style={{ ...inlineStyles.icon, ...(socialIconHovers[social.id] ? inlineStyles.iconHover : {}) }}
                        onMouseEnter={() => setSocialIconHovers((prev) => ({ ...prev, [social.id]: true }))}
                        onMouseLeave={() => setSocialIconHovers((prev) => ({ ...prev, [social.id]: false }))}
                    >
                        <img src={social.iconSrc} alt={social.alt} style={inlineStyles.iconImage} />
                    </a>
                ))}
            </div>

            {/* --- Footer --- */}
            <footer style={inlineStyles.footer}>
                <p>© {new Date().getFullYear()} KingQuip. All rights reserved.</p>
                <div style={inlineStyles.footerLinks}>
                    {/* Placeholder links, create these routes/components if they don't exist */}
                    <NavLink to="/privacy-policy" style={inlineStyles.footerLink}>Privacy Policy</NavLink>
                    <NavLink to="/terms-of-service" style={inlineStyles.footerLink}>Terms of Service</NavLink>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;