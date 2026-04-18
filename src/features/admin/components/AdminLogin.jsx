import { useState } from 'react';

export function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const expected = import.meta.env.VITE_ADMIN_PASSWORD ?? '';
    if (password !== expected) {
      setError('Password non valida.');
      return;
    }
    onSuccess();
  };

  return (
    <form className="admin-login" onSubmit={handleSubmit} noValidate>
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
