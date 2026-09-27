import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, User, Lock, Mail, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useComplaints } from '../context/ComplaintContext';
import { t } from '../utils/translations';

export default function IdentityVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentUser, selectedLanguage } = useComplaints();

  const searchParams = new URLSearchParams(location.search);
  const initialRole = searchParams.get('role') === 'admin' ? 'admin' : 'citizen';

  const [registerRole, setRegisterRole] = useState(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (name.length < 2 || email.length < 5 || password.length < 4) return;
    
    const users = JSON.parse(localStorage.getItem('awaaz_users')) || {};
    users[email] = { name, email, password, role: registerRole };
    localStorage.setItem('awaaz_users', JSON.stringify(users));

    setIsVerified(true);
    setCurrentUser({
      name: name,
      phone: email,
      citizenId: registerRole === 'admin' ? "ADM-PAN-NEW" : "CIT-IND-NEW",
      ward: "Ward 5",
      village: "Kalyanpur Gram Panchayat",
      role: registerRole
    });

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleProceed = () => {
    if (registerRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/complaints');
    }
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
        {!isVerified ? (
          <>
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
                {t(selectedLanguage, 'registerTitle')}
              </h2>
              <p style={{ color: '#5A6D7C', margin: 0, fontSize: '0.95rem', textTransform: 'capitalize' }}>
                {t(selectedLanguage, 'registerSub', { role: registerRole })}
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
                onClick={() => navigate(`/login?role=${registerRole}`)}
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
                {t(selectedLanguage, 'loginTab')}
              </button>
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
                {t(selectedLanguage, 'registerTab')}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Full Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1A3636', marginBottom: '0.5rem' }}>
                  {t(selectedLanguage, 'fullName')}
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} color="#5A6D7C" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1A3636', marginBottom: '0.5rem' }}>
                  {t(selectedLanguage, 'email')}
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} color="#5A6D7C" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email"
                    required
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
                    required
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

              {/* REGISTER Button */}
              <button
                type="submit"
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
                {t(selectedLanguage, 'createAccountBtn')}
              </button>
            </form>

          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#E8F6EF',
              color: '#1A3636',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              boxShadow: '0 8px 24px rgba(26, 54, 54, 0.15)'
            }}>
              <CheckCircle2 size={48} strokeWidth={2.5} />
            </div>

            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0B192C', marginBottom: '0.5rem' }}>
              {t(selectedLanguage, 'registeredSuccess')}
            </h2>
            <p style={{ fontSize: '1rem', color: '#5A6D7C', marginBottom: '2rem' }}>
              Welcome, {name}
            </p>

            <button
              type="button"
              onClick={handleProceed}
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
                boxShadow: '0 8px 20px rgba(26, 54, 54, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'transform 0.1s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {t(selectedLanguage, 'proceedDashboard')}
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
