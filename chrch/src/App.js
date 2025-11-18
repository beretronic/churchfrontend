// src/App.js
import React from 'react';
// REMOVE: BrowserRouter as Router
import { Routes, Route, Navigate } from 'react-router-dom'; // Keep Routes, Route, Navigate
import { AuthProvider, useAuth } from './components/AuthContext';

// Public components
import LandingPage from './LandingPage';
import AboutUs from './AboutUs';
import Address from './Address';
import Calendar from './Calendar';
import Login from './Login';
import Signup from './components/Signup';
import ChurchChatbot from './components/ChurchChatbot';

// Protected components
import AdminDashboard from './components/AdminDashboard';
import FinanceDashboard from './components/FinanceDashboard';
import LeaderDashboard from './components/LeaderDashboard';
import Unauthorized from './components/Unauthorized';

import MemberRegistrationForm from './components/MemberRegistrationForm';
import YouthForm from './components/YouthForm';
import VisitorForm from './components/VisitorForm';
import TitheForm from './components/TitheForm';
import PledgeForm from './components/PledgeForm';
import OfferingForm from './components/OfferingForm';
import AddEquipmentForm from './components/AddEquipmentForm';
import AddEventForm from './components/AddEventForm';


// --- ProtectedRoute Component ---
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading authentication...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};


const App = () => {
    return (
        // REMOVED <Router> wrapper here
        <AuthProvider>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/chatbot" element={<ChurchChatbot />} />
                <Route path="/address" element={<Address />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Protected Routes */}
                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/finance-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['finance']}>
                            <FinanceDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/leader-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['leader', 'admin']}>
                            <LeaderDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-member"
                    element={
                        <ProtectedRoute allowedRoles={['admin', 'finance']}>
                            <MemberRegistrationForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-youth"
                    element={
                        <ProtectedRoute allowedRoles={['admin', 'leader']}>
                            <YouthForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-visitor"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <VisitorForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-tithe"
                    element={
                        <ProtectedRoute allowedRoles={['finance', 'admin']}>
                            <TitheForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-pledge"
                    element={
                        <ProtectedRoute allowedRoles={['finance', 'admin']}>
                            <PledgeForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-offering"
                    element={
                        <ProtectedRoute allowedRoles={['finance', 'admin']}>
                            <OfferingForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-equipment"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AddEquipmentForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-event"
                    element={
                        <ProtectedRoute allowedRoles={['admin', 'leader']}>
                            <AddEventForm />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
        </AuthProvider>
    );
};

export default App;





