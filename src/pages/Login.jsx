import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useComplaints } from '../context/ComplaintContext';
import { ArrowLeft, User, Lock } from 'lucide-react';
import { t } from '../utils/translations';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentUser, showToast, selectedLanguage } = useComplaints();

  const searchParams = new URLSearchParams(location.search);
  const initialRole = searchParams.get('role') === 'admin' ? 'admin' : 'citizen';

  const [loginRole, setLoginRole] = useState(initialRole);
  const [email, setEmail] = useState('citizen@example.com');
  const [password, setPassword] = useState('••••••••');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    const isDemo = !e;
    e?.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      
      if (!isDemo) {
        // Real login logic using localStorage
        const users = JSON.parse(localStorage.getItem('awaaz_users')) || {};
        const user = users[email];

        if (!user || user.password !== password) {
          alert("Invalid email or password. Please register if you haven't already.");
          return;
        }

        if (user.role !== loginRole) {
          alert(`This account is registered as a ${user.role}. Please switch to the correct portal.`);
          return;
        }

        setCurrentUser({
          name: user.name,
          phone: user.email,
          citizenId: user.role === 'admin' ? "ADM-PAN-NEW" : "CIT-IND-NEW",
          ward: "Ward 5",
          village: "Kalyanpur Gram Panchayat",
          role: user.role
        });
        showToast(user.role === 'admin' ? "🏛️ Welcome Admin" : "👤 Welcome Citizen", `Logged in as ${user.name}`);
        navigate(user.role === 'admin' ? '/admin' : '/complaints');
      } else {
        // Fast Demo Login
        if (loginRole === 'admin') {
          setCurrentUser({
            name: "Panchayat Admin",
            phone: "+91 98765 00001",
            citizenId: "ADM-PAN-001",
            ward: "All Wards",
            village: "Kalyanpur Gram Panchayat",
            role: "admin"
          });
          showToast("🏛️ Welcome Admin", "Logged into Panchayat Administrative Portal");
          navigate('/admin');
        } else {
          setCurrentUser({
            name: "Ramesh Kumar",
            phone: email,
            citizenId: "CIT-IND-000124",
            ward: "Ward 5",
            village: "Kalyanpur Gram Panchayat",
            role: "citizen"
          });
          showToast("👤 Welcome Citizen", "Logged in as Ramesh Kumar (Ward 5)");
          navigate('/complaints');
        }
      }
    }, 400);
  };

  const handleFastDemoLogin = () => {
    handleLogin();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0B192C 0%, #1A3636 100%)',
      padding: '2rem',
      fontFamily: '"Inter", sans-serif'
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '3rem',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        position: 'relative'
      }}>
        {/* Back Link */}
        <Link to="/" style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          color: '#5A6D7C',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.9rem',
          fontWeight: 600,
          transition: 'color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#1A3636'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#5A6D7C'}
        >
          <ArrowLeft size={16} /> {t(selectedLanguage, 'backToHome')}
        </Link>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', marginTop: '1rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0B192C', margin: '0 0 0.5rem 0' }}>
            {t(selectedLanguage, 'loginTitle')}
          </h2>
          <p style={{ color: '#5A6D7C', margin: 0, fontSize: '0.95rem', textTransform: 'capitalize' }}>
            {t(selectedLanguage, 'loginSub', { role: loginRole })}
          </p>
        </div>

        {/* Auth Toggle */}
        <div style={{
          display: 'flex',
          background: '#F0F4F8',
          borderRadius: '12px',
          padding: '0.35rem',
          marginBottom: '2rem'
        }}>
          <button
            type="button"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              borderRadius: '8px',
              border: 'none',
              background: '#FFFFFF',
              color: '#1A3636',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'default',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            {t(selectedLanguage, 'loginTab')}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/register?role=${loginRole}`)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              borderRadius: '8px',
              border: 'none',
              background: 'transparent',
              color: '#5A6D7C',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: 'none'
            }}
          >
            {t(selectedLanguage, 'registerTab')}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1A3636', marginBottom: '0.5rem' }}>
              {t(selectedLanguage, 'email')}
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="#5A6D7C" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.75rem',
                  borderRadius: '12px',
                  border: '1.5px solid #E2EBE6',
                  fontSize: '0.95rem',
                  color: '#0B192C',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: '#FAFCFB'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1A3636'}
                onBlur={(e) => e.target.style.borderColor = '#E2EBE6'}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1A3636', marginBottom: '0.5rem' }}>
              {t(selectedLanguage, 'password')}
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#5A6D7C" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.75rem',
                  borderRadius: '12px',
                  border: '1.5px solid #E2EBE6',
                  fontSize: '0.95rem',
                  color: '#0B192C',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: '#FAFCFB'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1A3636'}
                onBlur={(e) => e.target.style.borderColor = '#E2EBE6'}
              />
            </div>
          </div>

          {/* LOGIN Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.9rem',
              background: 'linear-gradient(to right, #1A3636, #0B192C)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.5px',
              cursor: 'pointer',
              marginTop: '0.5rem',
              boxShadow: '0 8px 20px rgba(26, 54, 54, 0.3)',
              transition: 'transform 0.1s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(1px)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          >
            {loading ? "..." : t(selectedLanguage, 'signInBtn')}
          </button>
        </form>

        {/* Fast Demo Login */}
        <button
          type="button"
          onClick={handleFastDemoLogin}
          style={{
            width: '100%',
            padding: '0.9rem',
            backgroundColor: '#FFFFFF',
            color: '#1A3636',
            border: '1.5px solid #E2EBE6',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            marginTop: '1rem',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0F4F8'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
        >
          {t(selectedLanguage, 'fastDemoBtn')}
        </button>

      </div>
    </div>
  );
}
