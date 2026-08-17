import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, IndianRupee } from "lucide-react";

import { useDepositMutation } from "../../hooks/useDepositMutation";
import { useAccountsQuery } from "../../hooks/useAccountsQuery";
import { useCustomersQuery } from "../../../customers/hooks/useCustomersQuery";

import { getLoggedInEmail } from "../../../../shared/utils/currentUser";
import {
  getSelectedAccountNumber,
  saveSelectedAccountNumber,
} from "../../../../shared/utils/accountStorage";

import "./DepositPage.css";

export function DepositPage() {
  const navigate = useNavigate();

  // -----------------------------------------
  // API
  // -----------------------------------------

  const accountsQuery = useAccountsQuery();
  const customersQuery = useCustomersQuery();
  const depositMutation = useDepositMutation();

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
  // GET SAVED ACCOUNT
  // -----------------------------------------

  const savedAccountNumber = customer
    ? getSelectedAccountNumber(customer.customerId)
    : null;

  // -----------------------------------------
  // GET CUSTOMER'S ACCOUNTS
  // -----------------------------------------

  const customerAccounts =
    accountsQuery.data?.filter(
      (item) => item.customerId === customer?.customerId,
    ) ?? [];

  // -----------------------------------------
  // SELECT ACCOUNT
  // -----------------------------------------
  //
  // Priority:
  //
  // 1. Account selected on Dashboard
  // 2. First account if customer has only one
  //    or no saved selection
  //
  // This keeps existing one-account users
  // working normally.
  // -----------------------------------------

  const selectedAccount =
    customerAccounts.find(
      (account) => account.accountNumber === savedAccountNumber,
    ) ?? customerAccounts[0];

  // -----------------------------------------
  // SUBMIT
  // -----------------------------------------

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedAccount) {
      return;
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return;
    }

    depositMutation.mutate(
      {
        accountNumber: selectedAccount.accountNumber,

        amount: numericAmount,

        remarks: remarks.trim(),
      },
      {
        onSuccess: () => {
          /*
           * Make sure the account used for this
           * transaction remains the selected
           * account when returning to Dashboard.
           */

          if (customer) {
            saveSelectedAccountNumber(
              customer.customerId,
              selectedAccount.accountNumber,
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
      <main className="deposit-page">
        <div className="deposit-card">
          <p>Loading your account...</p>
        </div>
      </main>
    );
  }

  // -----------------------------------------
  // ERROR
  // -----------------------------------------

  if (accountsQuery.isError || customersQuery.isError) {
    return (
      <main className="deposit-page">
        <div className="deposit-card">
          <h1>Deposit</h1>

          <p>Unable to load your account details.</p>

          <button type="button" onClick={() => navigate("/dashboard")}>
            Back to dashboard
          </button>
        </div>
      </main>
    );
  }

  // -----------------------------------------
  // USER NOT FOUND
  // -----------------------------------------

  if (!customer) {
    return (
      <main className="deposit-page">
        <div className="deposit-card">
          <h1>Deposit</h1>

          <p>Unable to identify the logged-in customer.</p>

          <button type="button" onClick={() => navigate("/dashboard")}>
            Back to dashboard
          </button>
        </div>
      </main>
    );
  }

  // -----------------------------------------
  // ACCOUNT NOT FOUND
  // -----------------------------------------

  if (!selectedAccount) {
    return (
      <main className="deposit-page">
        <div className="deposit-card">
          <h1>Deposit</h1>

          <p>No bank account is available for this customer.</p>

          <button type="button" onClick={() => navigate("/dashboard")}>
            Back to dashboard
          </button>
        </div>
      </main>
    );
  }

  // -----------------------------------------
  // UI
  // -----------------------------------------

  return (
    <main className="deposit-page">
      <section className="deposit-card">
        {/* BACK */}

        <button
          type="button"
          className="deposit-back"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} />
          Back to dashboard
        </button>

        {/* HEADER */}

        <div className="deposit-header">
          <div className="deposit-icon">
            <IndianRupee size={24} />
          </div>

          <span className="deposit-eyebrow">ACCOUNT TRANSACTION</span>

          <h1>Deposit money</h1>

          <p>Add money to your bank account securely.</p>
        </div>

        {/* SELECTED ACCOUNT */}

        <div className="deposit-account">
          <div>
            <span>Account</span>

            <strong>{selectedAccount.accountType}</strong>
          </div>

          <div>
            <span>Account number</span>

            <strong>•••• {selectedAccount.accountNumber.slice(-4)}</strong>
          </div>
        </div>

        {/* FORM */}

        <form className="deposit-form" onSubmit={handleSubmit}>
          {/* AMOUNT */}

          <div className="deposit-field">
            <label htmlFor="amount">Amount</label>

            <div className="amount-input">
              <span>₹</span>

              <input
                id="amount"
                type="number"
                min="1"
                step="0.01"
                placeholder="Enter amount"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
              />
            </div>
          </div>

          {/* REMARKS */}

          <div className="deposit-field">
            <label htmlFor="remarks">Remarks</label>

            <input
              id="remarks"
              type="text"
              placeholder="e.g. Salary credit"
              value={remarks}
              onChange={(event) => setRemarks(event.target.value)}
              required
            />
          </div>

          {/* ERROR */}

          {depositMutation.isError && (
            <div className="deposit-error" role="alert">
              Unable to process the deposit. Please try again.
            </div>
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            className="deposit-submit"
            disabled={depositMutation.isPending}
          >
            {depositMutation.isPending ? "Processing..." : "Deposit money"}
          </button>
        </form>
      </section>
    </main>
  );
}
