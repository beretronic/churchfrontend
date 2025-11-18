import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dashboardContainerStyle = {
    display: 'flex',
    fontFamily: 'Segoe UI, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f4f7f6',
};

const sidebarStyle = {
    width: '250px',
    backgroundColor: '#004080',
    color: '#fff',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
};

const logoStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '24px',
    fontWeight: 'bold',
};

const navListStyle = {
    listStyle: 'none',
    padding: '0',
    flexGrow: 1, // Allows nav list to take available space
};

const navItemStyle = {
    marginBottom: '15px',
};

const navLinkStyle = {
    display: 'block',
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.2s',
};

const activeNavLinkStyle = {
    ...navLinkStyle,
    backgroundColor: '#0056b3',
};

const mainContentStyle = {
    flexGrow: 1,
    padding: '30px',
    overflowY: 'auto', // Enable vertical scrolling for content
};

const sectionStyle = {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    marginBottom: '30px',
};

const sectionTitleStyle = {
    color: '#004080',
    marginBottom: '20px',
    fontSize: '22px',
    borderBottom: '2px solid #e0e0e0',
    paddingBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const addButton = {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
};

const thStyle = {
    backgroundColor: '#0056b3',
    color: '#fff',
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
};

const tdStyle = {
    padding: '10px 15px',
    borderBottom: '1px solid #eee',
    color: '#333',
};

const actionButtonStyle = {
    padding: '6px 12px',
    marginRight: '8px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    transition: 'background-color 0.2s',
};

const editButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#007bff',
    color: '#fff',
};

const deleteButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#dc3545',
    color: '#fff',
};

const logoutButtonStyle = {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '20px',
    width: '100%',
    transition: 'background-color 0.2s',
};

const searchInputStyle = {
    width: 'calc(100% - 20px)', // Adjust width for padding
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    boxSizing: 'border-box', // Include padding in width
};


const AdminDashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('access');
    const [activeSection, setActiveSection] = useState('members'); // State to control which section is visible

    // State for fetched data (original data)
    const [allMembers, setAllMembers] = useState([]);
    const [allYouths, setAllYouths] = useState([]);
    const [allEquipment, setAllEquipment] = useState([]);
    const [allPledges, setAllPledges] = useState([]);
    const [allTithes, setAllTithes] = useState([]);
    const [allOfferings, setAllOfferings] = useState([]);
    const [allVisitors, setAllVisitors] = useState([]);

    // State for filtered data (what's actually displayed)
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [filteredYouths, setFilteredYouths] = useState([]);
    const [filteredEquipment, setFilteredEquipment] = useState([]);
    const [filteredPledges, setFilteredPledges] = useState([]);
    const [filteredTithes, setFilteredTithes] = useState([]);
    const [filteredOfferings, setFilteredOfferings] = useState([]);
    const [filteredVisitors, setFilteredVisitors] = useState([]);


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // New state for search term

    const getBaseUrl = () => 'http://127.0.0.1:8000/api/';

    // Function to handle search input changes
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Helper function to safely get a string value, handling null/undefined AND numbers
    const getStringValue = (value) => {
        // Convert to string first, then handle null/undefined, then toLowerCase
        return String(value || '').toLowerCase();
    };

    // Function to filter data based on search term and active section
    const filterData = () => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        // Members
        setFilteredMembers(
            allMembers.filter(member =>
                getStringValue(member.name).includes(lowerCaseSearchTerm) ||
                getStringValue(member.surname).includes(lowerCaseSearchTerm) ||
                getStringValue(member.phone_number).includes(lowerCaseSearchTerm) ||
                getStringValue(member.email).includes(lowerCaseSearchTerm) ||
                getStringValue(member.gender).includes(lowerCaseSearchTerm)
            )
        );

        // Youths
        setFilteredYouths(
            allYouths.filter(youth =>
                getStringValue(youth.first_name).includes(lowerCaseSearchTerm) ||
                getStringValue(youth.last_name).includes(lowerCaseSearchTerm) ||
                getStringValue(youth.date_of_birth).includes(lowerCaseSearchTerm) || // Date of birth
                getStringValue(youth.gender).includes(lowerCaseSearchTerm) ||
                getStringValue(youth.parent_guardian).includes(lowerCaseSearchTerm)
            )
        );

        // Equipment
        setFilteredEquipment(
            allEquipment.filter(item =>
                getStringValue(item.name).includes(lowerCaseSearchTerm) ||
                getStringValue(item.code).includes(lowerCaseSearchTerm) ||
                getStringValue(item.quantity).includes(lowerCaseSearchTerm) || // Quantity is a number
                getStringValue(item.condition).includes(lowerCaseSearchTerm)
            )
        );

        // Pledges
        setFilteredPledges(
            allPledges.filter(pledge =>
                getStringValue(pledge.name).includes(lowerCaseSearchTerm) ||
                getStringValue(pledge.purpose).includes(lowerCaseSearchTerm) ||
                getStringValue(pledge.amount).includes(lowerCaseSearchTerm) || // Amount is a number
                getStringValue(pledge.installment1).includes(lowerCaseSearchTerm) || // Number
                getStringValue(pledge.installment2).includes(lowerCaseSearchTerm) || // Number
                getStringValue(pledge.installment3).includes(lowerCaseSearchTerm) || // Number
                getStringValue(pledge.status).includes(lowerCaseSearchTerm)
            )
        );

        // Tithes
        setFilteredTithes(
            allTithes.filter(tithe =>
                getStringValue(tithe.tither).includes(lowerCaseSearchTerm) ||
                getStringValue(tithe.month).includes(lowerCaseSearchTerm) ||
                getStringValue(tithe.amount).includes(lowerCaseSearchTerm) || // Amount is a number
                getStringValue(tithe.date).includes(lowerCaseSearchTerm) // Date given
            )
        );

        // Offerings
        setFilteredOfferings(
            allOfferings.filter(offering =>
                getStringValue(offering.receipter).includes(lowerCaseSearchTerm) ||
                getStringValue(offering.purpose).includes(lowerCaseSearchTerm) ||
                getStringValue(offering.amount).includes(lowerCaseSearchTerm) || // Amount is a number
                getStringValue(offering.date_given).includes(lowerCaseSearchTerm)
            )
        );

        // Visitors - UPDATED TO MATCH YOUR DJANGO MODEL
        setFilteredVisitors(
            allVisitors.filter(visitor =>
                getStringValue(visitor.name).includes(lowerCaseSearchTerm) || // Use just 'name'
                getStringValue(visitor.email).includes(lowerCaseSearchTerm) || // Add email to search
                getStringValue(visitor.phone_number).includes(lowerCaseSearchTerm) ||
                getStringValue(visitor.address).includes(lowerCaseSearchTerm) || // Add address to search
                getStringValue(visitor.date_visited).includes(lowerCaseSearchTerm) // Corrected field name
            )
        );
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        // Refactored fetch functions to use `setAll<Data>`
        const fetchData = async (url, setDataFunction, parseNumbers = []) => {
            try {
                const response = await fetch(`${getBaseUrl()}${url}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json();

                // Parse numerical fields if specified
                if (parseNumbers.length > 0) {
                    data = data.map(item => {
                        const newItem = { ...item };
                        parseNumbers.forEach(field => {
                            if (newItem[field] !== undefined && newItem[field] !== null) {
                                newItem[field] = parseFloat(newItem[field]) || 0;
                            }
                        });
                        return newItem;
                    });
                }
                setDataFunction(data);
            } catch (err) {
                setError(`Failed to fetch data from ${url}: ` + err.message);
                console.error(`Fetch error for ${url}:`, err);
            }
        };

        const fetchAllData = async () => {
            setLoading(true);
            setError(null);
            await fetchData('members/members/', setAllMembers);
            await fetchData('youth/youths/', setAllYouths);
            await fetchData('equipment/equipment/', setAllEquipment);
            await fetchData('finances/pledges/', setAllPledges, ['amount', 'installment1', 'installment2', 'installment3']);
            await fetchData('finances/tithes/', setAllTithes, ['amount']);
            await fetchData('finances/offerings/', setAllOfferings, ['amount']);
            await fetchData('visitors/visitor/', setAllVisitors);
            setLoading(false);
        };

        fetchAllData();

    }, [token, navigate]);

    // This useEffect will run whenever all<Data> or searchTerm changes
    useEffect(() => {
        filterData();
    }, [allMembers, allYouths, allEquipment, allPledges, allTithes, allOfferings, allVisitors, searchTerm]);


    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/login');
    };

    const handleDelete = async (type, id) => {
        if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
            return;
        }

        let endpoint = '';
        let setDataFunction = null; // Function to update the `all` data state
        let setFilteredDataFunction = null; // Function to update the `filtered` data state

        switch (type) {
            case 'member':
                endpoint = `members/members/${id}/`;
                setDataFunction = setAllMembers;
                setFilteredDataFunction = setFilteredMembers;
                break;
            case 'youth':
                endpoint = `youth/youths/${id}/`;
                setDataFunction = setAllYouths;
                setFilteredDataFunction = setFilteredYouths;
                break;
            case 'equipment':
                endpoint = `equipment/equipment/${id}/`;
                setDataFunction = setAllEquipment;
                setFilteredDataFunction = setFilteredEquipment;
                break;
            case 'pledge':
                endpoint = `finances/pledges/${id}/`;
                setDataFunction = setAllPledges;
                setFilteredDataFunction = setFilteredPledges;
                break;
            case 'tithe':
                endpoint = `finances/tithes/${id}/`;
                setDataFunction = setAllTithes;
                setFilteredDataFunction = setFilteredTithes;
                break;
            case 'offering':
                endpoint = `finances/offerings/${id}/`;
                setDataFunction = setAllOfferings;
                setFilteredDataFunction = setFilteredOfferings;
                break;
            case 'visitor':
                endpoint = `visitors/visitor/${id}/`;
                setDataFunction = setAllVisitors;
                setFilteredDataFunction = setFilteredVisitors;
                break;
            default:
                console.error('Unknown type for deletion:', type);
                return;
        }

        try {
            const response = await fetch(`${getBaseUrl()}${endpoint}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Remove the deleted item from BOTH the original and filtered states
            setDataFunction(prevData => prevData.filter(item => item.id !== id));
            if (setFilteredDataFunction) {
                setFilteredDataFunction(prevData => prevData.filter(item => item.id !== id));
            }
            alert(`${type} deleted successfully!`);
        } catch (err) {
            setError(`Failed to delete ${type}: ` + err.message);
            console.error(`Delete ${type} error:`, err);
            alert(`Failed to delete ${type}. Check console for details.`);
        }
    };


    if (loading) {
        return <div style={dashboardContainerStyle}>Loading dashboard data...</div>;
    }

    if (error) {
        return <div style={{ ...dashboardContainerStyle, color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div style={dashboardContainerStyle}>
            <aside style={sidebarStyle}>
                <div style={logoStyle}> KingQuip </div>
                <nav>
                    <ul style={navListStyle}>
                        <li style={navItemStyle}>
                            <a
                                href="#"
                                onClick={() => { setActiveSection('members'); setSearchTerm(''); }} // Clear search on section change
                                style={activeSection === 'members' ? activeNavLinkStyle : navLinkStyle}
                            >
                                Members
                            </a>
                        </li>
                        <li style={navItemStyle}>
                            <a
                                href="#"
                                onClick={() => { setActiveSection('youths'); setSearchTerm(''); }}
                                style={activeSection === 'youths' ? activeNavLinkStyle : navLinkStyle}
                            >
                                Youths
                            </a>
                        </li>
                        <li style={navItemStyle}>
                            <a
                                href="#"
                                onClick={() => { setActiveSection('equipment'); setSearchTerm(''); }}
                                style={activeSection === 'equipment' ? activeNavLinkStyle : navLinkStyle}
                            >
                                Equipment
                            </a>
                        </li>
                        <li style={navItemStyle}>
                            <a
                                href="#"
                                onClick={() => { setActiveSection('pledges'); setSearchTerm(''); }}
                                style={activeSection === 'pledges' ? activeNavLinkStyle : navLinkStyle}
                            >
                                Pledges
                            </a>
                        </li>
                        <li style={navItemStyle}>
                            <a
                                href="#"
                                onClick={() => { setActiveSection('tithes'); setSearchTerm(''); }}
                                style={activeSection === 'tithes' ? activeNavLinkStyle : navLinkStyle}
                            >
                                Tithes
                            </a>
                        </li>
                        <li style={navItemStyle}>
                            <a
                                href="#"
                                onClick={() => { setActiveSection('offerings'); setSearchTerm(''); }}
                                style={activeSection === 'offerings' ? activeNavLinkStyle : navLinkStyle}
                            >
                                Offerings
                            </a>
                        </li>
                        <li style={navItemStyle}>
                            <a
                                href="#"
                                onClick={() => { setActiveSection('visitors'); setSearchTerm(''); }}
                                style={activeSection === 'visitors' ? activeNavLinkStyle : navLinkStyle}
                            >
                                Visitors
                            </a>
                        </li>
                        {/* Add more navigation links here as needed */}
                    </ul>
                </nav>
                <button onClick={handleLogout} style={logoutButtonStyle}>
                    Logout
                </button>
            </aside>

            <main style={mainContentStyle}>
                {/* Search Input for all sections */}
                <input
                    type="text"
                    placeholder={`Search ${activeSection}...`}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={searchInputStyle}
                />

                {activeSection === 'members' && (
                    <section style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>
                            Members
                            <button onClick={() => navigate('/add-member')} style={addButton}>Add New Member</button>
                        </h2>
                        {filteredMembers.length === 0 && searchTerm === '' ? (
                            <p>No members found. Add a new member to get started!</p>
                        ) : filteredMembers.length === 0 && searchTerm !== '' ? (
                            <p>No members found matching "{searchTerm}".</p>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={tableStyle}>
                                    <thead>
                                        <tr>
                                            <th style={thStyle}>ID</th>
                                            <th style={thStyle}>Name</th>
                                            <th style={thStyle}>Surname</th>
                                            <th style={thStyle}>Phone</th>
                                            <th style={thStyle}>Email</th>
                                            <th style={thStyle}>Gender</th>
                                            <th style={thStyle}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMembers.map((member) => (
                                            <tr key={member.id}>
                                                <td style={tdStyle}>{member.id}</td>
                                                <td style={tdStyle}>{member.name}</td>
                                                <td style={tdStyle}>{member.surname}</td>
                                                <td style={tdStyle}>{member.phone_number}</td>
                                                <td style={tdStyle}>{member.email}</td>
                                                <td style={tdStyle}>{member.gender}</td>
                                                <td style={tdStyle}>
                                                    <button
                                                        onClick={() => navigate(`/edit-member/${member.id}`)}
                                                        style={editButtonStyle}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete('member', member.id)}
                                                        style={deleteButtonStyle}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                )}

                {activeSection === 'youths' && (
                    <section style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>
                            Youths
                            <button onClick={() => navigate('/add-youth')} style={addButton}>Add New Youth</button>
                        </h2>
                        {filteredYouths.length === 0 && searchTerm === '' ? (
                            <p>No youth records found. Add a new youth to get started!</p>
                        ) : filteredYouths.length === 0 && searchTerm !== '' ? (
                            <p>No youth records found matching "{searchTerm}".</p>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={tableStyle}>
                                    <thead>
                                        <tr>
                                            <th style={thStyle}>ID</th>
                                            <th style={thStyle}>First Name</th>
                                            <th style={thStyle}>Last Name</th>
                                            <th style={thStyle}>Date of Birth</th>
                                            <th style={thStyle}>Email</th>
                                            <th style={thStyle}>Contact</th>
                                            <th style={thStyle}>Address</th>
                                            <th style={thStyle}>Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredYouths.map((youth) => (
                                            <tr key={youth.id}>
                                                <td style={tdStyle}>{youth.id}</td>
                                                <td style={tdStyle}>{youth.first_name}</td>
                                                <td style={tdStyle}>{youth.last_name}</td>
                                                <td style={tdStyle}>{youth.date_of_birth}</td>
                                                <td style={tdStyle}>{youth.email}</td>
                                                <td style={tdStyle}>{youth.phone_number}</td>
                                                <td style={tdStyle}>{youth.address}</td>
                                                <td style={tdStyle}>
                                                    <button
                                                        onClick={() => navigate(`/edit-youth/${youth.id}`)}
                                                        style={editButtonStyle}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete('youth', youth.id)}
                                                        style={deleteButtonStyle}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                )}

                {activeSection === 'equipment' && (
                    <section style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>
                            Equipment
                            <button onClick={() => navigate('/add-equipment')} style={addButton}>Add New Equipment</button>
                        </h2>
                        {filteredEquipment.length === 0 && searchTerm === '' ? (
                            <p>No equipment records found. Add new equipment to get started!</p>
                        ) : filteredEquipment.length === 0 && searchTerm !== '' ? (
                            <p>No equipment records found matching "{searchTerm}".</p>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={tableStyle}>
                                    <thead>
                                        <tr>
                                            <th style={thStyle}>ID</th>
                                            <th style={thStyle}>Name</th>
                                            <th style={thStyle}>Code</th>
                                            <th style={thStyle}>Description</th>
                                            <th style={thStyle}>Quantity</th>
                                            <th style={thStyle}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredEquipment.map((item) => (
                                            <tr key={item.id}>
                                                <td style={tdStyle}>{item.id}</td>
                                                <td style={tdStyle}>{item.name}</td>
                                                <td style={tdStyle}>{item.code}</td>
                                                <td style={tdStyle}>{item.description}</td>
                                                <td style={tdStyle}>{item.quantity}</td>
                                                <td style={tdStyle}>
                                                    <button
                                                        onClick={() => navigate(`/edit-equipment/${item.id}`)}
                                                        style={editButtonStyle}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete('equipment', item.id)}
                                                        style={deleteButtonStyle}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                )}

                {activeSection === 'pledges' && (
                    <section style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>
                            Pledges
                            <button onClick={() => navigate('/add-pledge')} style={addButton}>Add New Pledge</button>
                        </h2>
                        {filteredPledges.length === 0 && searchTerm === '' ? (
                            <p>No pledges found. Add a new pledge to get started!</p>
                        ) : filteredPledges.length === 0 && searchTerm !== '' ? (
                            <p>No pledges found matching "{searchTerm}".</p>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={tableStyle}>
                                    <thead>
                                        <tr>
                                            <th style={thStyle}>ID</th>
                                            <th style={thStyle}>Pledger</th>
                                            <th style={thStyle}>Purpose</th>
                                            <th style={thStyle}>Amount</th>
                                            <th style={thStyle}>Installment 1</th>
                                            <th style={thStyle}>Installment 2</th>
                                            <th style={thStyle}>Installment 3</th>
                                            <th style={thStyle}>Status</th>
                                            <th style={thStyle}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredPledges.map((pledge) => (
                                            <tr key={pledge.id}>
                                                <td style={tdStyle}>{pledge.id}</td>
                                                <td style={tdStyle}>{pledge.name}</td>
                                                <td style={tdStyle}>{pledge.purpose}</td>
                                                <td style={tdStyle}>${pledge.amount.toFixed(2)}</td>
                                                <td style={tdStyle}>${pledge.installment1.toFixed(2)}</td>
                                                <td style={tdStyle}>${pledge.installment2.toFixed(2)}</td>
                                                <td style={tdStyle}>${pledge.installment3.toFixed(2)}</td>
                                                <td style={tdStyle}>{pledge.status}</td>
                                                <td style={tdStyle}>
                                                    <button
                                                        onClick={() => navigate(`/edit-pledge/${pledge.id}`)}
                                                        style={editButtonStyle}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete('pledge', pledge.id)}
                                                        style={deleteButtonStyle}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                )}

                {activeSection === 'tithes' && (
                    <section style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>
                            Tithes
                            <button onClick={() => navigate('/add-tithe')} style={addButton}>Add New Tithe</button>
                        </h2>
                        {filteredTithes.length === 0 && searchTerm === '' ? (
                            <p>No tithe records found. Add a new tithe to get started!</p>
                        ) : filteredTithes.length === 0 && searchTerm !== '' ? (
                            <p>No tithe records found matching "{searchTerm}".</p>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={tableStyle}>
                                    <thead>
                                        <tr>
                                            <th style={thStyle}>ID</th>
                                            <th style={thStyle}>Tither</th>
                                            <th style={thStyle}>Month</th>
                                            <th style={thStyle}>Amount</th>
                                            <th style={thStyle}>Date</th>
                                            <th style={thStyle}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTithes.map((tithe) => (
                                            <tr key={tithe.id}>
                                                <td style={tdStyle}>{tithe.id}</td>
                                                <td style={tdStyle}>{tithe.tither}</td>
                                                <td style={tdStyle}>{tithe.month}</td>
                                                <td style={tdStyle}>${tithe.amount.toFixed(2)}</td>
                                                <td style={tdStyle}>{tithe.date}</td>
                                                <td style={tdStyle}>
                                                    <button
                                                        onClick={() => navigate(`/edit-tithe/${tithe.id}`)}
                                                        style={editButtonStyle}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete('tithe', tithe.id)}
                                                        style={deleteButtonStyle}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                )}

                {activeSection === 'offerings' && (
                    <section style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>
                            Offerings
                            <button onClick={() => navigate('/add-offering')} style={addButton}>Add New Offering</button>
                        </h2>
                        {filteredOfferings.length === 0 && searchTerm === '' ? (
                            <p>No offering records found. Add a new offering to get started!</p>
                        ) : filteredOfferings.length === 0 && searchTerm !== '' ? (
                            <p>No offering records found matching "{searchTerm}".</p>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={tableStyle}>
                                    <thead>
                                        <tr>
                                            <th style={thStyle}>ID</th>
                                            <th style={thStyle}>Receipter</th>
                                            <th style={thStyle}>Purpose</th>
                                            <th style={thStyle}>Amount</th>
                                            <th style={thStyle}>Date Given</th>
                                            <th style={thStyle}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredOfferings.map((offering) => (
                                            <tr key={offering.id}>
                                                <td style={tdStyle}>{offering.id}</td>
                                                <td style={tdStyle}>{offering.receipter}</td>
                                                <td style={tdStyle}>{offering.purpose}</td>
                                                <td style={tdStyle}>${offering.amount.toFixed(2)}</td>
                                                <td style={tdStyle}>{offering.date_given}</td>
                                                <td style={tdStyle}>
                                                    <button
                                                        onClick={() => navigate(`/edit-offering/${offering.id}`)}
                                                        style={editButtonStyle}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete('offering', offering.id)}
                                                        style={deleteButtonStyle}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                )}

                {/* Visitors Section - UPDATED */}
                {activeSection === 'visitors' && (
                    <section style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>
                            Visitors
                            <button onClick={() => navigate('/add-visitor')} style={addButton}>Add New Visitor</button>
                        </h2>
                        {filteredVisitors.length === 0 && searchTerm === '' ? (
                            <p>No visitor records found. Add a new visitor to get started!</p>
                        ) : filteredVisitors.length === 0 && searchTerm !== '' ? (
                            <p>No visitor records found matching "{searchTerm}".</p>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={tableStyle}>
                                    <thead>
                                        <tr>
                                            <th style={thStyle}>ID</th>
                                            <th style={thStyle}>Name</th> {/* Displaying 'name' from your model */}
                                            <th style={thStyle}>Email</th>    {/* Added Email Header */}
                                            <th style={thStyle}>Phone Number</th>
                                            <th style={thStyle}>Address</th>  {/* Added Address Header */}
                                            <th style={thStyle}>Date Visited</th> {/* Corrected field name to 'Date Visited' */}
                                            <th style={thStyle}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredVisitors.map((visitor) => (
                                            <tr key={visitor.id}>
                                                <td style={tdStyle}>{visitor.id}</td>
                                                <td style={tdStyle}>{visitor.name}</td> {/* Directly using visitor.name */}
                                                <td style={tdStyle}>{visitor.email}</td> {/* Display Email */}
                                                <td style={tdStyle}>{visitor.phone_number}</td>
                                                <td style={tdStyle}>{visitor.address}</td> {/* Display Address */}
                                                <td style={tdStyle}>{visitor.date_visited}</td> {/* Display Date Visited */}
                                                <td style={tdStyle}>
                                                    <button
                                                        onClick={() => navigate(`/edit-visitor/${visitor.id}`)}
                                                        style={editButtonStyle}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete('visitor', visitor.id)}
                                                        style={deleteButtonStyle}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                )}

            </main>
        </div>
    );
};

export default AdminDashboard;