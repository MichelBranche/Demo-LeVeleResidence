import { useState } from 'react';
import { ADMIN_PROFILE_OPTIONS } from '../adminProfiles';

/**
 * @param {{ onSuccess: (payload: { profiles: string[] }) => void }} props
 */
export function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [profileSet, setProfileSet] = useState(() => new Set());
  const [error, setError] = useState(null);

  const toggleProfile = (id) => {
    setProfileSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const expected = import.meta.env.VITE_ADMIN_PASSWORD ?? '';
    if (password !== expected) {
      setError('Password non valida.');
      return;
    }
    if (profileSet.size === 0) {
      setError('Seleziona almeno un profilo.');
      return;
    }
    onSuccess({ profiles: [...profileSet] });
  };

  return (
    <form className="admin-login" onSubmit={handleSubmit} noValidate>
      <fieldset className="admin-login__fieldset">
        <legend className="admin-login__legend">Profili</legend>
        <p className="admin-login__hint" id="admin-login-profiles-hint">
          Scegli uno o più ruoli per questa sessione (Manager, Dipendente, Developer).
        </p>
        <div className="admin-login__profiles" aria-describedby="admin-login-profiles-hint">
          {ADMIN_PROFILE_OPTIONS.map((opt) => (
            <label key={opt.id} className="admin-login__check">
              <input
                type="checkbox"
                name="profiles"
                value={opt.id}
                checked={profileSet.has(opt.id)}
                onChange={() => toggleProfile(opt.id)}
                className="admin-login__check-input"
              />
              <span className="admin-login__check-label">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="admin-login__label" htmlFor="admin-password">
        Password
      </label>
      <input
        id="admin-password"
        name="password"
        type="password"
        className="admin-login__input"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />
      {error ? (
        <p className="admin-login__error" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" className="admin-login__submit">
        Accedi
      </button>
    </form>
  );
}
