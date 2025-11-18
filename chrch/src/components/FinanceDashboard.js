import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Function to decode JWT token payload (can be moved to a separate utility file)
const decodeJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Error decoding JWT:", e);
        return null;
    }
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '2rem',
        fontFamily: 'Segoe UI, sans-serif',
        backgroundColor: '#f8f9fa',
        borderRadius: '15px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    },
    heading: {
        textAlign: 'center',
        fontSize: '2.5rem',
        color: '#004080',
        marginBottom: '2.5rem',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '1rem',
    },
    metricsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem',
    },
    metricCard: {
        backgroundColor: '#ffffff',
        padding: '1.5rem',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        textAlign: 'center',
        borderLeft: '5px solid',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    metricTitle: {
        fontSize: '1.1rem',
        color: '#555',
        marginBottom: '0.5rem',
        fontWeight: 'normal',
    },
    metricValue: {
        fontSize: '2.2rem',
        fontWeight: 'bold',
        color: '#004080',
    },
    chartSection: {
        marginBottom: '3rem',
    },
    chartHeading: {
        fontSize: '1.8rem',
        color: '#2c3e50',
        marginBottom: '1.5rem',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '0.8rem',
        textAlign: 'center',
    },
    reportSection: {
        textAlign: 'center',
        marginTop: '3rem',
    },
    reportButton: {
        padding: '1rem 2.5rem',
        fontSize: '1.1rem',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
    },
    backButton: {
        backgroundColor: '#6c757d',
        color: '#fff',
        padding: '8px 15px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        marginBottom: '20px',
        marginRight: 'auto', // Push to the left if in a flex container
        display: 'block',
    },
    loadingMessage: {
        textAlign: 'center',
        fontSize: '1.2rem',
        color: '#666',
        padding: '3rem',
    },
    errorMessage: {
        textAlign: 'center',
        fontSize: '1.2rem',
        color: '#dc3545',
        padding: '3rem',
        backgroundColor: 'rgba(255, 230, 230, 0.8)',
        borderRadius: '10px',
        marginTop: '50px',
    },
    // Adding a general button style for consistent hover effects
    generalButtonHover: {
        '&:hover': {
            backgroundColor: '#218838', // Darker green for report button
            transform: 'translateY(-2px)',
        }
    },
    backButtonHover: {
        '&:hover': {
            backgroundColor: '#5a6268', // Darker grey for back button
            transform: 'translateY(-2px)',
        }
    }
};

// Helper to get month name from number
const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('en-US', { month: 'short' });
};

// Helper to convert month string to number (for tithes)
const getMonthNumber = (monthName) => {
    const monthIndex = new Date(Date.parse(monthName + " 1, 2000")).getMonth();
    return monthIndex + 1; // Return 1-indexed month
};

const FinanceDashboard = () => {
    const navigate = useNavigate();
    const [finances, setFinances] = useState({
        pledges: [],
        tithes: [],
        offerings: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(false); // New state for authorization

    const token = localStorage.getItem('access');
    const getBaseUrl = () => 'http://localhost:8000/api/';

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const checkAuthorizationAndFetchData = async () => {
            const decodedToken = decodeJwt(token);

            // ?????? IMPORTANT: REPLACE 'finance_admin' with the actual role name from your JWT payload ??????
            // Example: If your JWT has "user_role": "finance_admin", use 'finance_admin'
            // Example: If your JWT has "is_finance_admin": true, you'd check decodedToken.is_finance_admin === true
            const REQUIRED_ROLE = 'finance_admin'; // <--- ADJUST THIS TO YOUR ACTUAL ROLE NAME IN JWT

            if (decodedToken && decodedToken.role === REQUIRED_ROLE) {
                setIsAuthorized(true);
                // Proceed to fetch data if authorized
                try {
                    const headers = {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    };

                    const [pledgesRes, tithesRes, offeringsRes] = await Promise.all([
                        fetch(`${getBaseUrl()}finances/pledges/`, { headers }),
                        fetch(`${getBaseUrl()}finances/tithes/`, { headers }),
                        fetch(`${getBaseUrl()}finances/offerings/`, { headers }),
                    ]);

                    if (!pledgesRes.ok || !tithesRes.ok || !offeringsRes.ok) {
                        throw new Error('Failed to fetch one or more finance data types.');
                    }

                    const [pledgesData, tithesData, offeringsData] = await Promise.all([
                        pledgesRes.json(),
                        tithesRes.json(),
                        offeringsRes.json(),
                    ]);

                    setFinances({
                        pledges: Array.isArray(pledgesData) ? pledgesData : [],
                        tithes: Array.isArray(tithesData) ? tithesData : [],
                        offerings: Array.isArray(offeringsData) ? offeringsData : [],
                    });
                } catch (err) {
                    console.error('Finance Dashboard fetch error:', err);
                    setError('Failed to load financial data. Please ensure the server is running and you are logged in.');
                } finally {
                    setLoading(false);
                }
            } else {
                // Not authorized
                setIsAuthorized(false);
                setLoading(false);
                setError('You do not have permission to access this page.');
                // Optionally, redirect non-authorized users immediately
                // navigate('/admin-dashboard'); // or '/login'
            }
        };

        checkAuthorizationAndFetchData();
    }, [token, navigate]);

    // --- Data Aggregation Logic ---

    // Calculate current month's totals
    const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-indexed
    const currentYear = new Date().getFullYear();

    const totalOfferingsThisMonth = finances.offerings
        .filter(o => {
            // Assuming date_given is in a parsable format like "YYYY-MM-DD"
            const date = new Date(o.date_given);
            return date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear;
        })
        .reduce((sum, o) => sum + parseFloat(o.amount || 0), 0);

    const totalTithesThisMonth = finances.tithes
        .filter(t => {
            // Assuming t.month is a month name string (e.g., "January")
            const monthNum = getMonthNumber(t.month);
            // We use the current year as the tithe data might not explicitly include a year
            return monthNum === currentMonth; //&& t.year === currentYear; // If your tithe model includes a year, filter by it too.
        })
        .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

    const totalPledgesCompleted = finances.pledges
        .filter(p => p.status === 'Completed') // Filter by 'Completed' status
        .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

    // Aggregate data for charts by month
    const aggregateByMonth = (data, dateField, amountField, filterFunction = () => true) => {
        const monthlyData = {};
        const yearMonths = []; // To maintain order of months

        // Generate keys for all 12 months for the current year
        for (let i = 0; i < 12; i++) {
            const date = new Date(currentYear, i, 1);
            const monthKey = `${currentYear}-${String(i + 1).padStart(2, '0')}`;
            monthlyData[monthKey] = { name: getMonthName(i + 1), total: 0 };
            yearMonths.push(monthKey);
        }

        data.filter(filterFunction).forEach(item => {
            let date;
            if (dateField === 'month' && item.month) {
                // For tithes where 'month' is a string
                date = new Date(currentYear, getMonthNumber(item.month) - 1, 1); // Use current year for tithes
            } else if (item[dateField]) {
                // For offerings and pledges with a date field
                date = new Date(item[dateField]);
            } else {
                return; // Skip items without a valid date/month field
            }

            // Ensure the item is from the current year for charting
            if (date.getFullYear() !== currentYear) {
                return;
            }

            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            if (monthlyData[monthKey]) { // Check if the month key exists (should for current year)
                monthlyData[monthKey].total += parseFloat(item[amountField] || 0);
            }
        });

        // Convert to array in chronological order
        return yearMonths.map(key => monthlyData[key]);
    };

    const monthlyOfferingsData = aggregateByMonth(finances.offerings, 'date_given', 'amount');
    const monthlyTithesData = aggregateByMonth(finances.tithes, 'month', 'amount');
    const monthlyPledgesData = aggregateByMonth(
        finances.pledges,
        'date_created', // Assuming pledges have a 'date_created' or similar field
        'amount',
        (p) => p.status === 'Completed' // Only include completed pledges for this chart
    );

    const handleBack = () => {
        navigate(-1); // Go back one step in history (to Admin Dashboard)
    };

    const handleGenerateReports = () => {
        alert('Generating detailed financial reports... (Functionality to be implemented)');
        // In a real app, this would navigate to a detailed reports page or trigger a PDF/CSV download
    };

    if (loading) {
        return <div style={styles.loadingMessage}>Loading financial dashboard...</div>;
    }

    // Display authorization error if not authorized
    if (!isAuthorized) {
        return (
            <div style={styles.errorMessage}>
                {error || 'Access Denied. You are not authorized to view this page.'}
                <button onClick={() => navigate('/admin-dashboard')} style={{ ...styles.reportButton, ...styles.generalButtonHover }}>Go to Admin Dashboard</button>
            </div>
        );
    }

    // Render dashboard content only if authorized and loaded
    return (
        <div style={styles.container}>
            <button type="button" onClick={handleBack} style={{ ...styles.backButton, ...styles.backButtonHover }}>
                &larr; Back to Admin Dashboard
            </button>
            <h1 style={styles.heading}>Financial Overview</h1>

            <div style={styles.metricsGrid}>
                <div style={{ ...styles.metricCard, borderLeftColor: '#007bff' }}>
                    <h3 style={styles.metricTitle}>Offerings This Month</h3>
                    <p style={styles.metricValue}>${totalOfferingsThisMonth.toFixed(2)}</p>
                </div>
                <div style={{ ...styles.metricCard, borderLeftColor: '#28a745' }}>
                    <h3 style={styles.metricTitle}>Tithes This Month</h3>
                    <p style={styles.metricValue}>${totalTithesThisMonth.toFixed(2)}</p>
                </div>
                <div style={{ ...styles.metricCard, borderLeftColor: '#ffc107' }}>
                    <h3 style={styles.metricTitle}>Pledges Completed (Total)</h3>
                    <p style={styles.metricValue}>${totalPledgesCompleted.toFixed(2)}</p>
                </div>
            </div>

            <div style={styles.chartSection}>
                <h2 style={styles.chartHeading}>Monthly Offerings (Current Year)</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyOfferingsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                        <Legend />
                        <Bar dataKey="total" fill="#007bff" name="Total Offering" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div style={styles.chartSection}>
                <h2 style={styles.chartHeading}>Monthly Tithes (Current Year)</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyTithesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                        <Legend />
                        <Bar dataKey="total" fill="#28a745" name="Total Tithe" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div style={styles.chartSection}>
                <h2 style={styles.chartHeading}>Monthly Completed Pledges (Current Year)</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyPledgesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                        <Legend />
                        <Bar dataKey="total" fill="#ffc107" name="Total Completed Pledge" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div style={styles.reportSection}>
                <button onClick={handleGenerateReports} style={{ ...styles.reportButton, ...styles.generalButtonHover }}>
                    Generate Detailed Reports
                </button>
            </div>
        </div>
    );
};

export default FinanceDashboard;