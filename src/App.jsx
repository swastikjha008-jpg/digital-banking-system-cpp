
import { useMemo, useState } from "react";

const correctPin = "8896";

function App() {
  const [pin, setPin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [balance, setBalance] = useState(1000.07);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [message, setMessage] = useState("Use PIN 8896 to enter the banking demo.");
  const [transactions, setTransactions] = useState([]);

  const latestTransactions = useMemo(
    () => [...transactions].reverse().slice(0, 5),
    [transactions]
  );

  function formatMoney(amount) {
    return `$${amount.toFixed(2)}`;
  }

  function handleLogin(event) {
    event.preventDefault();

    if (pin === correctPin) {
      setLoggedIn(true);
      setPin("");
      setMessage("Login successful.");
      return;
    }

    setMessage("Wrong PIN. Try 8896.");
  }

  function addTransaction(type, amount, nextBalance) {
    setTransactions((currentTransactions) => [
      ...currentTransactions,
      {
        id: Date.now(),
        type,
        amount,
        balanceAfter: nextBalance,
      },
    ]);
  }

  function handleDeposit(event) {
    event.preventDefault();

    const amount = Number(depositAmount);

    if (amount <= 0) {
      setMessage("Enter a valid deposit amount.");
      return;
    }

    const nextBalance = balance + amount;
    setBalance(nextBalance);
    setDepositAmount("");
    addTransaction("Deposit", amount, nextBalance);
    setMessage(`Deposited ${formatMoney(amount)} successfully.`);
  }

  function handleWithdraw(event) {
    event.preventDefault();

    const amount = Number(withdrawAmount);

    if (amount <= 0) {
      setMessage("Enter a valid withdrawal amount.");
      return;
    }

    if (amount > balance) {
      setMessage("Insufficient balance.");
      return;
    }

    const nextBalance = balance - amount;
    setBalance(nextBalance);
    setWithdrawAmount("");
    addTransaction("Withdraw", amount, nextBalance);
    setMessage(`Withdrew ${formatMoney(amount)} successfully.`);
  }

  function handleLogout() {
    setLoggedIn(false);
    setMessage("Logged out successfully.");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "24px",
        background: "linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)",
        fontFamily: "Segoe UI, sans-serif",
        color: "#0f172a",
      }}
    >
      <section
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "24px",
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#2563eb",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          React V2
        </p>
        <h1 style={{ margin: "10px 0 8px", fontSize: "2.4rem" }}>
          Digital Banking System
        </h1>
        <p style={{ margin: 0, color: "#475569", lineHeight: 1.6 }}>
          A simple React version of your original C++ banking project with PIN
          login, balance, deposit, withdrawal, and transaction history.
        </p>

        <div
          style={{
            marginTop: "18px",
            marginBottom: "18px",
            padding: "14px 16px",
            borderRadius: "14px",
            background: "#eff6ff",
            color: "#1d4ed8",
          }}
        >
          {message}
        </div>

        {!loggedIn ? (
          <form
            onSubmit={handleLogin}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "12px",
            }}
          >
            <input
              type="password"
              maxLength="4"
              placeholder="Enter PIN"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              style={{
                padding: "12px 14px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                font: "inherit",
              }}
            />
            <button
              type="submit"
              style={{
                border: 0,
                borderRadius: "12px",
                padding: "12px 18px",
                background: "#2563eb",
                color: "#ffffff",
                font: "inherit",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </form>
        ) : (
          <>
            <div
              style={{
                padding: "18px",
                borderRadius: "18px",
                background: "#f8fafc",
                marginBottom: "18px",
              }}
            >
              <p style={{ margin: 0, color: "#64748b" }}>Current Balance</p>
              <strong style={{ fontSize: "2.2rem" }}>{formatMoney(balance)}</strong>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
                marginBottom: "18px",
              }}
            >
              <form
                onSubmit={handleDeposit}
                style={{
                  padding: "18px",
                  borderRadius: "18px",
                  background: "#f8fafc",
                  display: "grid",
                  gap: "10px",
                }}
              >
                <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Deposit</h2>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Enter amount"
                  value={depositAmount}
                  onChange={(event) => setDepositAmount(event.target.value)}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    font: "inherit",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    border: 0,
                    borderRadius: "12px",
                    padding: "12px 14px",
                    background: "#16a34a",
                    color: "#ffffff",
                    font: "inherit",
                    cursor: "pointer",
                  }}
                >
                  Deposit Money
                </button>
              </form>

              <form
                onSubmit={handleWithdraw}
                style={{
                  padding: "18px",
                  borderRadius: "18px",
                  background: "#f8fafc",
                  display: "grid",
                  gap: "10px",
                }}
              >
                <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Withdraw</h2>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(event) => setWithdrawAmount(event.target.value)}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    font: "inherit",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    border: 0,
                    borderRadius: "12px",
                    padding: "12px 14px",
                    background: "#dc2626",
                    color: "#ffffff",
                    font: "inherit",
                    cursor: "pointer",
                  }}
                >
                  Withdraw Money
                </button>
              </form>
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "18px",
                background: "#f8fafc",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                  gap: "12px",
                }}
              >
                <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Recent Transactions</h2>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    border: 0,
                    borderRadius: "12px",
                    padding: "10px 14px",
                    background: "#dbeafe",
                    color: "#1d4ed8",
                    font: "inherit",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>

              {latestTransactions.length === 0 ? (
                <p style={{ margin: 0, color: "#64748b" }}>
                  No transactions yet.
                </p>
              ) : (
                <div style={{ display: "grid", gap: "10px" }}>
                  {latestTransactions.map((transaction) => (
                    <article
                      key={transaction.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "12px",
                        padding: "12px 14px",
                        borderRadius: "12px",
                        background: "#ffffff",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <span>{transaction.type}</span>
                      <strong>
                        {formatMoney(transaction.amount)} | Balance:{" "}
                        {formatMoney(transaction.balanceAfter)}
                      </strong>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
