import { ArrowLeft, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAccountsQuery } from "../../hooks/useAccountsQuery";
import { useTransactionsQuery } from "../../hooks/useTransactionsQuery";
import { useCustomersQuery } from "../../../customers/hooks/useCustomersQuery";

import { getLoggedInEmail } from "../../../../shared/utils/currentUser";
import { getSelectedAccountNumber } from "../../../../shared/utils/accountStorage";

import "./TransactionsPage.css";

export function TransactionsPage() {
  const navigate = useNavigate();

  // -----------------------------------------
  // API QUERIES
  // -----------------------------------------

  const accountsQuery = useAccountsQuery();
  const customersQuery = useCustomersQuery();

  // -----------------------------------------
  // LOGGED-IN USER
  // -----------------------------------------

  const loggedInEmail = getLoggedInEmail();

  // -----------------------------------------
  // FIND LOGGED-IN CUSTOMER
  // -----------------------------------------

  const customer = customersQuery.data?.find(
    (item) => item.email.toLowerCase() === loggedInEmail?.toLowerCase(),
  );

  // -----------------------------------------
  // GET CUSTOMER'S ACCOUNTS
  // -----------------------------------------

  const customerAccounts =
    accountsQuery.data?.filter(
      (account) => account.customerId === customer?.customerId,
    ) ?? [];

  // -----------------------------------------
  // GET SAVED ACCOUNT
  // -----------------------------------------

  const savedAccountNumber = customer
    ? getSelectedAccountNumber(customer.customerId)
    : null;

  // -----------------------------------------
  // SELECT ACCOUNT
  // -----------------------------------------
  //
  // Priority:
  //
  // 1. Account selected on Dashboard
  // 2. First account belonging to customer
  //
  // This works for both:
  // - customers with one account
  // - customers with multiple accounts
  // -----------------------------------------

  const account =
    customerAccounts.find(
      (item) => item.accountNumber === savedAccountNumber,
    ) ?? customerAccounts[0];

  // -----------------------------------------
  // TRANSACTIONS
  // -----------------------------------------

  const transactionsQuery = useTransactionsQuery(account?.accountNumber);

  // -----------------------------------------
  // LOADING
  // -----------------------------------------

  if (accountsQuery.isLoading || customersQuery.isLoading) {
    return (
      <main className="transactions-page">
        <section className="transactions-card">
          <p>Loading your account...</p>
        </section>
      </main>
    );
  }

  // -----------------------------------------
  // API ERROR
  // -----------------------------------------

  if (accountsQuery.isError || customersQuery.isError) {
    return (
      <main className="transactions-page">
        <section className="transactions-card">
          <button
            type="button"
            className="transactions-back"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={18} />
            Back to dashboard
          </button>

          <div className="transactions-header">
            <span className="transactions-eyebrow">ACCOUNT ACTIVITY</span>

            <h1>Transactions</h1>

            <p>View all transactions made from your bank account.</p>
          </div>

          <div className="transactions-error" role="alert">
            Unable to load your account details. Please try again.
          </div>
        </section>
      </main>
    );
  }

  // -----------------------------------------
  // CUSTOMER NOT FOUND
  // -----------------------------------------

  if (!customer) {
    return (
      <main className="transactions-page">
        <section className="transactions-card">
          <button
            type="button"
            className="transactions-back"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={18} />
            Back to dashboard
          </button>

          <div className="transactions-header">
            <span className="transactions-eyebrow">ACCOUNT ACTIVITY</span>

            <h1>Transactions</h1>
          </div>

          <div className="transactions-error" role="alert">
            Unable to identify the logged-in customer.
          </div>
        </section>
      </main>
    );
  }

  // -----------------------------------------
  // ACCOUNT NOT FOUND
  // -----------------------------------------

  if (!account) {
    return (
      <main className="transactions-page">
        <section className="transactions-card">
          <button
            type="button"
            className="transactions-back"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={18} />
            Back to dashboard
          </button>

          <div className="transactions-header">
            <span className="transactions-eyebrow">ACCOUNT ACTIVITY</span>

            <h1>Transactions</h1>
          </div>

          <div className="transactions-error" role="alert">
            No bank account is available for this customer.
          </div>
        </section>
      </main>
    );
  }

  // -----------------------------------------
  // RENDER
  // -----------------------------------------

  return (
    <main className="transactions-page">
      <section className="transactions-card">
        {/* BACK */}

        <button
          type="button"
          className="transactions-back"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} />
          Back to dashboard
        </button>

        {/* HEADER */}

        <div className="transactions-header">
          <span className="transactions-eyebrow">ACCOUNT ACTIVITY</span>

          <h1>Transactions</h1>

          <p>View all transactions made from your bank account.</p>
        </div>

        {/* ACCOUNT INFORMATION */}

        <div className="transactions-account">
          <div>
            <span>Account</span>

            <strong>{account.accountType}</strong>
          </div>

          <div>
            <span>Account number</span>

            <strong>•••• {account.accountNumber.slice(-4)}</strong>
          </div>

          <div>
            <span>Current balance</span>

            <strong>₹{account.balance.toLocaleString("en-IN")}</strong>
          </div>
        </div>

        {/* TRANSACTION HISTORY */}

        <div className="transactions-section">
          <h2>Transaction history</h2>

          {/* LOADING */}

          {transactionsQuery.isLoading && (
            <div className="transactions-message">Loading transactions...</div>
          )}

          {/* ERROR */}

          {transactionsQuery.isError && (
            <div className="transactions-error" role="alert">
              Unable to load transactions. Please try again.
            </div>
          )}

          {/* EMPTY */}

          {!transactionsQuery.isLoading &&
            !transactionsQuery.isError &&
            transactionsQuery.data?.length === 0 && (
              <div className="transactions-message">No transactions found.</div>
            )}

          {/* TRANSACTIONS */}

          {!transactionsQuery.isLoading &&
            !transactionsQuery.isError &&
            transactionsQuery.data &&
            transactionsQuery.data.length > 0 && (
              <div className="transaction-list">
                {transactionsQuery.data.map((transaction) => {
                  const isDeposit =
                    transaction.transactionType.toUpperCase() === "DEPOSIT";

                  return (
                    <div
                      className="transaction-row"
                      key={transaction.transactionReference}
                    >
                      {/* ICON */}

                      <div
                        className={`transaction-icon ${
                          isDeposit
                            ? "transaction-icon--deposit"
                            : "transaction-icon--withdraw"
                        }`}
                      >
                        {isDeposit ? (
                          <ArrowDownLeft size={20} />
                        ) : (
                          <ArrowUpRight size={20} />
                        )}
                      </div>

                      {/* DETAILS */}

                      <div className="transaction-info">
                        <strong>
                          {transaction.remarks || transaction.transactionType}
                        </strong>

                        <span>
                          {new Date(
                            transaction.transactionTime,
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      {/* AMOUNT */}

                      <div
                        className={`transaction-amount ${
                          isDeposit
                            ? "transaction-amount--positive"
                            : "transaction-amount--negative"
                        }`}
                      >
                        {isDeposit ? "+" : "-"}₹
                        {transaction.amount.toLocaleString("en-IN")}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
        </div>
      </section>
    </main>
  );
}
