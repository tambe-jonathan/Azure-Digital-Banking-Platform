import { useState } from "react";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "john", password: "password123" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", form);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message ?? "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-screen">
      <section className="login-panel">
        <p className="eyebrow">Secure access</p>
        <h1>Enterprise Banking</h1>
        <form onSubmit={submitLogin}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={updateField}
            autoComplete="username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={updateField}
            autoComplete="current-password"
            required
          />

          {error ? <p className="error">{error}</p> : null}

          <button type="submit" disabled={loading}>
            <LogIn size={18} aria-hidden="true" />
            <span>{loading ? "Signing in" : "Login"}</span>
          </button>
        </form>
      </section>
    </main>
  );
}
