import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import JudgeDemoBanner from './components/JudgeDemoBanner';
import LanguageSelection from './pages/LanguageSelection';
import RoleSelection from './pages/RoleSelection';
import Landing from './pages/Landing';
import ChooseInput from './pages/ChooseInput';
import AIPreview from './pages/AIPreview';
import ComplaintSubmitted from './pages/ComplaintSubmitted';
import MyComplaints from './pages/MyComplaints';
import ComplaintDetail from './pages/ComplaintDetail';
import VerifyResolution from './pages/VerifyResolution';
import AdminDashboard from './pages/AdminDashboard';
import AdminComplaints from './pages/AdminComplaints';
import RecurringIssues from './pages/RecurringIssues';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminAuthority from './pages/AdminAuthority';
import AdminReports from './pages/AdminReports';
import AdminUsers from './pages/AdminUsers';
import AdminSettings from './pages/AdminSettings';
import Login from './pages/Login';
import IdentityVerification from './pages/IdentityVerification';
import { useComplaints } from './context/ComplaintContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useComplaints();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
import HowItWorks from './pages/HowItWorks';
import Features from './pages/Features';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Founder from './pages/Founder';

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      {!isAdmin && <Header />}

      <main className="main-content" id="main-content">
        <Routes>
          {/* Public / Entry Routes (No protection) */}
          <Route path="/" element={<LanguageSelection />} />
          <Route path="/role" element={<RoleSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<IdentityVerification />} />

          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
          <Route path="/how-it-works" element={<ProtectedRoute><HowItWorks /></ProtectedRoute>} />
          <Route path="/features" element={<ProtectedRoute><Features /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
          <Route path="/founder" element={<ProtectedRoute><Founder /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />

          {/* Grievance Submission Flow */}
          <Route path="/report" element={<ProtectedRoute><ChooseInput /></ProtectedRoute>} />
          <Route path="/report/preview" element={<ProtectedRoute><AIPreview /></ProtectedRoute>} />
          <Route path="/complaint/submitted" element={<ProtectedRoute><ComplaintSubmitted /></ProtectedRoute>} />

          {/* Citizen Tracking & Details */}
          <Route path="/complaints" element={<ProtectedRoute><MyComplaints /></ProtectedRoute>} />
          <Route path="/complaints/:id" element={<ProtectedRoute><ComplaintDetail /></ProtectedRoute>} />
          <Route path="/complaints/:id/verify" element={<ProtectedRoute><VerifyResolution /></ProtectedRoute>} />

          {/* Admin / Authority Portal */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/complaints" element={<ProtectedRoute><AdminComplaints /></ProtectedRoute>} />
          <Route path="/admin/recurring" element={<ProtectedRoute><RecurringIssues /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute><AdminAnalytics /></ProtectedRoute>} />
          <Route path="/admin/authority" element={<ProtectedRoute><AdminAuthority /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute><AdminReports /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer — visible on all public pages */}
      {!isAdmin && <Footer />}

      {/* Floating Judge Quick Demo & Scenario Switcher */}
      <JudgeDemoBanner />
    </div>
  );
}
