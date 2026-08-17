import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, IndianRupee } from "lucide-react";

import { useWithdrawMutation } from "../../hooks/useWithdrawMutation";
import { useAccountsQuery } from "../../hooks/useAccountsQuery";
import { useCustomersQuery } from "../../../customers/hooks/useCustomersQuery";

import { getLoggedInEmail } from "../../../../shared/utils/currentUser";

import {
  getSelectedAccountNumber,
  saveSelectedAccountNumber,
} from "../../../../shared/utils/accountStorage";

import "./WithdrawPage.css";

export function WithdrawPage() {
  const navigate = useNavigate();

  // -----------------------------------------
  // API
  // -----------------------------------------

  const accountsQuery = useAccountsQuery();
  const customersQuery = useCustomersQuery();
  const withdrawMutation = useWithdrawMutation();

  // -----------------------------------------
  // FORM STATE
  // -----------------------------------------

  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");

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
      (item) => item.customerId === customer?.customerId,
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
  // This means customers with one account
  // continue to work normally.
  // -----------------------------------------

  const account =
    customerAccounts.find(
      (item) => item.accountNumber === savedAccountNumber,
    ) ?? customerAccounts[0];

  // -----------------------------------------
  // SUBMIT WITHDRAWAL
  // -----------------------------------------

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!account) {
      return;
    }

    const withdrawalAmount = Number(amount);

    // Invalid amount
    if (!Number.isFinite(withdrawalAmount) || withdrawalAmount <= 0) {
      return;
    }

    // Amount greater than balance
    if (withdrawalAmount > account.balance) {
      return;
    }

    withdrawMutation.mutate(
      {
        accountNumber: account.accountNumber,

        amount: withdrawalAmount,

        remarks: remarks.trim(),
      },
      {
        onSuccess: () => {
          /*
           * Keep this account selected when
           * returning to the Dashboard.
           */

          if (customer) {
            saveSelectedAccountNumber(
              customer.customerId,
              account.accountNumber,
            );
          }

          navigate("/dashboard");
        },
      },
    );
  };

  // -----------------------------------------
  // LOADING
  // -----------------------------------------

  if (accountsQuery.isLoading || customersQuery.isLoading) {
    return (
      <main className="withdraw-page">
        <section className="withdraw-card">
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
      <main className="withdraw-page">
        <section className="withdraw-card">
          <button
            type="button"
            className="withdraw-back"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={18} />
            Back to dashboard
          </button>

          <div className="withdraw-header">
            <div className="withdraw-icon">
              <IndianRupee size={24} />
            </div>

            <span className="withdraw-eyebrow">ACCOUNT TRANSACTION</span>

            <h1>Withdraw money</h1>

            <p>Withdraw money from your bank account securely.</p>
          </div>

          <div className="withdraw-error" role="alert">
            Unable to load your account details.
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
      <main className="withdraw-page">
        <section className="withdraw-card">
          <button
            type="button"
            className="withdraw-back"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={18} />
            Back to dashboard
          </button>

          <div className="withdraw-header">
            <div className="withdraw-icon">
              <IndianRupee size={24} />
            </div>

            <span className="withdraw-eyebrow">ACCOUNT TRANSACTION</span>

            <h1>Withdraw money</h1>
          </div>

          <div className="withdraw-error" role="alert">
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
      <main className="withdraw-page">
        <section className="withdraw-card">
          <button
            type="button"
            className="withdraw-back"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={18} />
            Back to dashboard
          </button>

          <div className="withdraw-header">
            <div className="withdraw-icon">
              <IndianRupee size={24} />
            </div>

            <span className="withdraw-eyebrow">ACCOUNT TRANSACTION</span>

            <h1>Withdraw money</h1>
          </div>

          <div className="withdraw-error" role="alert">
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
    <main className="withdraw-page">
      <section className="withdraw-card">
        {/* BACK */}

        <button
          type="button"
          className="withdraw-back"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} />
          Back to dashboard
        </button>

        {/* HEADER */}

        <div className="withdraw-header">
          <div className="withdraw-icon">
            <IndianRupee size={24} />
          </div>

          <span className="withdraw-eyebrow">ACCOUNT TRANSACTION</span>

          <h1>Withdraw money</h1>

          <p>Withdraw money from your bank account securely.</p>
        </div>

        {/* ACCOUNT INFORMATION */}

        <div className="withdraw-account">
          <div className="withdraw-account-row">
            <span>Account</span>

            <strong>{account.accountType}</strong>
          </div>

          <div className="withdraw-account-row">
            <span>Account number</span>

            <strong>•••• {account.accountNumber.slice(-4)}</strong>
          </div>

          <div className="withdraw-account-row">
            <span>Available balance</span>

            <strong>₹{account.balance.toLocaleString("en-IN")}</strong>
          </div>
        </div>

        {/* FORM */}

        <form className="withdraw-form" onSubmit={handleSubmit}>
          {/* AMOUNT */}

          <div className="withdraw-field">
            <label htmlFor="amount">Amount</label>

            <div className="withdraw-amount-input">
              <span>₹</span>

              <input
                id="amount"
                type="number"
                min="1"
                max={account.balance}
                step="0.01"
                placeholder="Enter amount"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
              />
            </div>

            {amount && Number(amount) > account.balance && (
              <span className="withdraw-field-error">
                Amount cannot exceed your available balance.
              </span>
            )}
          </div>

          {/* REMARKS */}

          <div className="withdraw-field">
            <label htmlFor="remarks">Remarks</label>

            <input
              id="remarks"
              type="text"
              placeholder="e.g. Cash withdrawal"
              value={remarks}
              onChange={(event) => setRemarks(event.target.value)}
              required
            />
          </div>

          {/* API ERROR */}

          {withdrawMutation.isError && (
            <div className="withdraw-error" role="alert">
              Unable to process the withdrawal. Please check your balance and
              try again.
            </div>
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            className="withdraw-submit"
            disabled={
              withdrawMutation.isPending ||
              !amount ||
              Number(amount) <= 0 ||
              Number(amount) > account.balance ||
              !remarks.trim()
            }
          >
            {withdrawMutation.isPending ? "Processing..." : "Withdraw money"}
          </button>
        </form>
      </section>
    </main>
  );
}
