import pool from "../config/db.js";

export async function getAccount(req, res, next) {
  try {
    const result = await pool.query(
      `SELECT account_number AS "accountNumber", balance
       FROM accounts
       WHERE user_id = $1
       ORDER BY id
       LIMIT 1`,
      [req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Account not found" });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
}
