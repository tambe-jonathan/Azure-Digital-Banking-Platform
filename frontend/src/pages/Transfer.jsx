import { useState } from "react";
import { Send } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import api from "../services/api.js";

export default function Transfer() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitTransfer = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/transactions/transfer", {
        amount: Number(amount),
      });

      setMessage(response.data.message);
      setAmount("");
    } catch (err) {
      setError(err.response?.data?.message ?? "Transfer failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="app-shell">
        <div className="page-heading">
          <p className="eyebrow">Transfer Funds</p>
          <h1>Move money securely</h1>
        </div>

        <section className="panel transfer-panel">
          <form onSubmit={submitTransfer}>
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              required
            />

            {message ? <p className="success">{message}</p> : null}
            {error ? <p className="error">{error}</p> : null}

            <button type="submit" disabled={loading}>
              <Send size={18} aria-hidden="true" />
              <span>{loading ? "Sending" : "Transfer"}</span>
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
