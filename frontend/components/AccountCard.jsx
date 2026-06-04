import { CreditCard } from "lucide-react";

export default function AccountCard({ account }) {
  const balance = Number(account?.balance ?? 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <section className="account-card" aria-label="Account summary">
      <div className="account-card-header">
        <div>
          <p className="eyebrow">Account Summary</p>
          <h1>{balance}</h1>
        </div>
        <CreditCard size={34} aria-hidden="true" />
      </div>
      <div className="account-meta">
        <span>Account number</span>
        <strong>{account?.accountNumber ?? "Unavailable"}</strong>
      </div>
    </section>
  );
}
