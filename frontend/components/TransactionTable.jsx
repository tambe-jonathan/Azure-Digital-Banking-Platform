export default function TransactionTable({ transactions }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Transactions</p>
          <h2>Recent activity</h2>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="3" className="empty-state">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id ?? `${transaction.type}-${transaction.amount}`}>
                  <td>
                    <span className={`status ${transaction.type}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td>
                    {Number(transaction.amount).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                  <td>{transaction.createdAt ? new Date(transaction.createdAt).toLocaleString() : "Pending"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
