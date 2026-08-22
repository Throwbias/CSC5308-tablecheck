import { useState } from 'react';

function getCredentialError(staffId, password) {
  if (!staffId || !password) {
    return "Staff ID and password are required.";
  }

  return "";
}

function LoginForm({
  staffId,
  password,
  error,
  onStaffIdChange,
  onPasswordChange,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="login-card"
    >
      <div className="login-brand"><span className="brand-mark" aria-hidden="true">TL</span><span>TableLogic</span></div>
      <p className="eyebrow">Staff portal</p>
      <h1 className="login-title">Welcome back</h1>
      <p className="login-intro">Sign in to manage the dining room.</p>

      <label htmlFor="staffId">Staff ID</label>
      <input
        id="staffId"
        type="text"
        value={staffId}
        onChange={onStaffIdChange}
        className="text-input"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={onPasswordChange}
        className="text-input"
      />

      {error && (
        <p className="form-error" role="alert">{error}</p>
      )}

      <button
        type="submit"
        className="primary-button"
      >
        Login
      </button>

      <p className="login-note">
        Demo login only. Backend authentication will be added in a later
        sprint.
      </p>
    </form>
  );
}

export default function LoginScreen({ onLogin }) {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const validationError = getCredentialError(staffId, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onLogin();
  }

  return (
    <main
      className="login-shell"
    >
      <LoginForm
        staffId={staffId}
        password={password}
        error={error}
        onStaffIdChange={(event) => setStaffId(event.target.value)}
        onPasswordChange={(event) => setPassword(event.target.value)}
        onSubmit={handleSubmit}
      />
    </main>
  );
}