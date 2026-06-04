INSERT INTO users (username, password)
VALUES ('john', 'password123');

INSERT INTO accounts (user_id, account_number, balance)
VALUES (
    (SELECT id FROM users WHERE username = 'john'),
    '123456789',
    5000.00
);

INSERT INTO transactions (account_id, amount, transaction_type)
VALUES
    ((SELECT id FROM accounts WHERE account_number = '123456789'), 2500.00, 'credit'),
    ((SELECT id FROM accounts WHERE account_number = '123456789'), 100.00, 'debit'),
    ((SELECT id FROM accounts WHERE account_number = '123456789'), 750.00, 'credit');
