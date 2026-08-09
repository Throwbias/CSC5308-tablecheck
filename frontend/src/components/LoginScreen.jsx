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
      style={{
        width: "360px",
        padding: "30px",
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
          fontSize: "2rem",
          lineHeight: "1.2",
          textAlign: "center",
        }}
      >
        TableLogic Staff Login
      </h1>

      <label htmlFor="staffId">Staff ID</label>
      <input
        id="staffId"
        type="text"
        value={staffId}
        onChange={onStaffIdChange}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "6px",
          marginBottom: "16px",
          boxSizing: "border-box",
        }}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={onPasswordChange}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "6px",
          marginBottom: "16px",
          boxSizing: "border-box",
        }}
      />

      {error && (
        <p style={{ color: "#dc2626", fontWeight: "bold" }}>{error}</p>
      )}

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#1f2937",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Login
      </button>

      <p style={{ marginTop: "16px", fontSize: "0.9rem", color: "#6b7280" }}>
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
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        backgroundColor: "#f3f4f6",
      }}
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