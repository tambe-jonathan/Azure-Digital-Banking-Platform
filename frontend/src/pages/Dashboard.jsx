import { useEffect, useState } from "react";
import AccountCard from "../components/AccountCard.jsx";
import Navbar from "../components/Navbar.jsx";
import TransactionTable from "../components/TransactionTable.jsx";
import api from "../services/api.js";

export default function Dashboard() {
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [accountResponse, transactionResponse] = await Promise.all([
          api.get("/accounts"),
          api.get("/transactions"),
        ]);

        setAccount(accountResponse.data);
        setTransactions(transactionResponse.data);
      } catch (err) {
        setError(err.response?.data?.message ?? "Unable to load dashboard.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <>
      <Navbar />
      <main className="app-shell">
        <div className="page-heading">
          <p className="eyebrow">Dashboard</p>
          <h1>Accounts and activity</h1>
        </div>

        {error ? <p className="error">{error}</p> : null}
        {loading ? <p className="loading">Loading banking data...</p> : null}

        {!loading && account ? <AccountCard account={account} /> : null}
        {!loading ? <TransactionTable transactions={transactions} /> : null}
      </main>
    </>
  );
}
