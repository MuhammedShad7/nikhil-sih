import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';
import { t } from '../utils/translations';

export default function RoleSelection() {
  const navigate = useNavigate();
  const { selectedLanguage } = useComplaints();

  const handleSelectRole = (role) => {
    navigate(`/register?role=${role}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #0B192C 0%, #1A3636 100%)', // Premium dark gradient
      color: 'white',
      fontFamily: '"Inter", sans-serif',
      position: 'relative'
    }}>
      {/* Back to Language Link */}
      <Link to="/" style={{
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        color: '#A0B2C0',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.95rem',
        fontWeight: 600,
        transition: 'color 0.2s'
      }}
      onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
      onMouseLeave={(e) => e.currentTarget.style.color = '#A0B2C0'}
      >
        <ArrowLeft size={18} /> {t(selectedLanguage, 'backToLanguage')}
      </Link>

      <h1 style={{ 
        fontSize: '3.5rem', 
        fontWeight: 800, 
        marginBottom: '1rem', 
        textAlign: 'center', 
        animation: 'fadeInDown 1s ease',
        letterSpacing: '-1px'
      }}>
        {t(selectedLanguage, 'welcome')}
      </h1>
      <p style={{ 
        fontSize: '1.25rem', 
        opacity: 0.8, 
        marginBottom: '4rem', 
        textAlign: 'center', 
        animation: 'fadeInUp 1.2s ease',
        fontWeight: 400
      }}>
        {t(selectedLanguage, 'selectPortal')}
      </p>

      <div style={{
        display: 'flex',
        gap: '3rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '0 2rem'
      }}>
        {/* Citizen Button */}
        <button
          onClick={() => handleSelectRole('citizen')}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '28px',
            padding: '3.5rem 2.5rem',
            width: '320px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-12px) scale(1.03)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.boxShadow = '0 20px 50px rgba(53, 101, 75, 0.5)';
            e.currentTarget.style.borderColor = '#35654B';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #43C6AC 0%, #191654 100%)',
            borderRadius: '50%',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
          }}>
            <Users size={48} color="#FFFFFF" />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 0.75rem 0', color: 'white' }}>{t(selectedLanguage, 'citizen')}</h2>
          <p style={{ margin: 0, fontSize: '1.05rem', color: '#A0B4B0', textAlign: 'center', lineHeight: '1.5' }}>
            {t(selectedLanguage, 'citizenDesc')}
          </p>
        </button>

        {/* Admin Button */}
        <button
          onClick={() => handleSelectRole('admin')}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '28px',
            padding: '3.5rem 2.5rem',
            width: '320px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-12px) scale(1.03)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.boxShadow = '0 20px 50px rgba(8, 122, 85, 0.5)';
            e.currentTarget.style.borderColor = '#087A55';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #1D976C 0%, #93F9B9 100%)',
            borderRadius: '50%',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
          }}>
            <ShieldCheck size={48} color="#102333" />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 0.75rem 0', color: 'white' }}>{t(selectedLanguage, 'admin')}</h2>
          <p style={{ margin: 0, fontSize: '1.05rem', color: '#A0B4B0', textAlign: 'center', lineHeight: '1.5' }}>
            {t(selectedLanguage, 'adminDesc')}
          </p>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
