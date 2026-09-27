import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useComplaints();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdminPath = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isPortalSelection = location.pathname === '/' || location.pathname === '/role';

  if (isAdminPath || isLoginPage || isRegisterPage || isPortalSelection) {
    return null;
  }

  return (
    <header style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E2EBE6',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <Link to="/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            letterSpacing: '0.3px'
          }}>
            <span style={{ color: '#087A55' }}>AWAAZ </span>
            <span style={{ color: '#102333' }}>SARPANCH</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="header-nav" aria-label="Main navigation">
          <Link to="/home" style={{ fontSize: '0.92rem', fontWeight: location.pathname === '/home' ? 700 : 500, color: location.pathname === '/home' ? '#087A55' : '#102333', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/about" style={{ fontSize: '0.92rem', fontWeight: location.pathname === '/about' ? 700 : 500, color: location.pathname === '/about' ? '#087A55' : '#102333', textDecoration: 'none' }}>
            About
          </Link>
          <Link to="/founder" style={{ fontSize: '0.92rem', fontWeight: location.pathname === '/founder' ? 700 : 500, color: location.pathname === '/founder' ? '#087A55' : '#102333', textDecoration: 'none' }}>
            Founder
          </Link>
          <Link to="/complaints" style={{ fontSize: '0.92rem', fontWeight: location.pathname.startsWith('/complaint') ? 700 : 500, color: location.pathname.startsWith('/complaint') ? '#087A55' : '#102333', textDecoration: 'none' }}>
            My Complaints
          </Link>
          <Link to="/how-it-works" style={{ fontSize: '0.92rem', fontWeight: location.pathname === '/how-it-works' ? 700 : 500, color: location.pathname === '/how-it-works' ? '#087A55' : '#102333', textDecoration: 'none' }}>
            How It Works
          </Link>
          <button 
            onClick={() => {
              setCurrentUser(null);
              localStorage.removeItem('awaaz_user');
              navigate('/');
            }}
            style={{ fontSize: '0.92rem', fontWeight: 600, color: '#D93025', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            Logout
          </button>
        </nav>

        {/* Mobile menu toggle button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#102333'
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2EBE6',
          padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem'
        }}>
          <Link to="/home" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600, color: '#102333', textDecoration: 'none' }}>Home</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600, color: '#102333', textDecoration: 'none' }}>About</Link>
          <Link to="/founder" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600, color: '#087A55', textDecoration: 'none' }}>Founder</Link>
          <Link to="/complaints" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 500, color: '#102333', textDecoration: 'none' }}>My Complaints</Link>
          <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 500, color: '#102333', textDecoration: 'none' }}>How It Works</Link>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              setCurrentUser(null);
              localStorage.removeItem('awaaz_user');
              navigate('/');
            }} 
            style={{ fontWeight: 600, color: '#D93025', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', fontSize: '1rem' }}
          >
            Logout
          </button>
          <Link to="/admin" onClick={() => setMobileMenuOpen(false)} style={{ color: '#2366B1', fontWeight: 600, textDecoration: 'none' }}>Admin Portal</Link>
        </div>
      )}
    </header>
  );
}
