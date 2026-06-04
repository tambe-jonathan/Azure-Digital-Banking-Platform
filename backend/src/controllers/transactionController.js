import pool from "../config/db.js";

export async function getTransactions(req, res, next) {
  try {
    const result = await pool.query(
      `SELECT t.id, t.amount, t.transaction_type AS type, t.created_at AS "createdAt"
       FROM transactions t
       JOIN accounts a ON a.id = t.account_id
       WHERE a.user_id = $1
       ORDER BY t.created_at DESC`,
      [req.user.id],
    );

    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
}

export async function transferFunds(req, res, next) {
  const amount = Number(req.body.amount);

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: "A positive transfer amount is required" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const accountResult = await client.query(
      `SELECT id, balance
       FROM accounts
       WHERE user_id = $1
       ORDER BY id
       LIMIT 1
       FOR UPDATE`,
      [req.user.id],
    );

    const account = accountResult.rows[0];

    if (!account) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Account not found" });
    }

    const currentBalance = Number(account.balance);

    if (currentBalance < amount) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "Insufficient funds" });
    }

    const newBalance = currentBalance - amount;

    await client.query("UPDATE accounts SET balance = $1 WHERE id = $2", [
      newBalance,
      account.id,
    ]);

    const transactionResult = await client.query(
      `INSERT INTO transactions (account_id, amount, transaction_type)
       VALUES ($1, $2, $3)
       RETURNING id, amount, transaction_type AS type, created_at AS "createdAt"`,
      [account.id, amount, "debit"],
    );

    await client.query("COMMIT");

    return res.json({
      message: "Transfer completed successfully",
      balance: newBalance,
      transaction: transactionResult.rows[0],
    });
  } catch (err) {
    await client.query("ROLLBACK");
    return next(err);
  } finally {
    client.release();
  }
}
