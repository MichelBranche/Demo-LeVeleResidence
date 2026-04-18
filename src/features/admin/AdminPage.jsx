import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { useAdminMobileLayout } from './hooks/useAdminMobileLayout';
import { AdminMobileApp } from './mobile/AdminMobileApp';
import {
  clearAdminSession,
  getAdminSession,
  isAdminPasswordConfigured,
  setAdminSession,
} from './adminSession';
import './admin.css';

export function AdminPage() {
  const navigate = useNavigate();
  const isMobileGestionale = useAdminMobileLayout();
  const passwordConfigured = isAdminPasswordConfigured();
  /** Senza password in .env l’area è aperta per lavorare in sviluppo. */
  const openAccess = !passwordConfigured;

  const [authed, setAuthed] = useState(() => (passwordConfigured ? !!getAdminSession() : true));

  const showDashboard = openAccess || authed;

  /* Home può lasciare body overflow:hidden (intro/menu); qui serve scroll sul contenuto. */
  useEffect(() => {
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    document.title = showDashboard ? 'Admin · Le Vele' : 'Accesso admin · Le Vele';
    return () => {
      document.title = 'Residence Le Vele — Stintino, Sardegna';
    };
  }, [showDashboard]);

  const handleLoginSuccess = useCallback(() => {
    setAdminSession();
    setAuthed(true);
  }, []);

  const handleLogout = useCallback(() => {
    if (openAccess) {
      navigate('/');
      return;
    }
    clearAdminSession();
    setAuthed(false);
  }, [openAccess, navigate]);

  return (
    <div
      className={`admin-page${showDashboard ? ' admin-page--dashboard' : ''}${
        showDashboard && isMobileGestionale ? ' admin-page--mobile-gestionale' : ''
      }`}
    >
      <div className="admin-page__inner">
        {!showDashboard ? (
          <>
            <div className="admin-page__brand">
              <span className="admin-page__brand-name">Le Vele Residence</span>
              <span className="admin-page__brand-tag">Stintino</span>
            </div>
            <h1 className="admin-page__h1">Accesso riservato</h1>
            <AdminLogin onSuccess={handleLoginSuccess} />
          </>
        ) : isMobileGestionale ? (
          <AdminMobileApp openAccess={openAccess} onLogout={handleLogout} />
        ) : (
          <AdminDashboard openAccess={openAccess} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}
