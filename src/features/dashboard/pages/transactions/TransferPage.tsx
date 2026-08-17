import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRightLeft } from "lucide-react";

import { useTransferMutation } from "../../hooks/useTransferMutation";
import { useAccountsQuery } from "../../hooks/useAccountsQuery";
import { useCustomersQuery } from "../../../customers/hooks/useCustomersQuery";

import { getLoggedInEmail } from "../../../../shared/utils/currentUser";

import {
  getSelectedAccountNumber,
  saveSelectedAccountNumber,
} from "../../../../shared/utils/accountStorage";

import "./TransferPage.css";

export function TransferPage() {
  const navigate = useNavigate();

  // -----------------------------------------
  // API
  // -----------------------------------------

  const accountsQuery = useAccountsQuery();
  const customersQuery = useCustomersQuery();
  const transferMutation = useTransferMutation();

  // -----------------------------------------
  // FORM STATE
  // -----------------------------------------

  const [toAccountNumber, setToAccountNumber] = useState("");

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
  // FIND SOURCE ACCOUNT
  // -----------------------------------------
  //
  // Priority:
  //
  // 1. Account selected on Dashboard
  // 2. First account belonging to customer
  //
  // This ensures customers with one account
  // continue to work normally.
  // -----------------------------------------

  const account =
    customerAccounts.find(
      (item) => item.accountNumber === savedAccountNumber,
    ) ?? customerAccounts[0];

  // -----------------------------------------
  // SUBMIT TRANSFER
  // -----------------------------------------

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!account) {
      return;
    }

    const transferAmount = Number(amount);

    const destinationAccount = toAccountNumber.trim();

    const transferRemarks = remarks.trim();

    // ---------------------------------------
    // VALIDATE AMOUNT
    // ---------------------------------------

    if (!Number.isFinite(transferAmount) || transferAmount <= 0) {
      return;
    }

    // ---------------------------------------
    // VALIDATE BALANCE
    // ---------------------------------------

    if (transferAmount > account.balance) {
      return;
    }

    // ---------------------------------------
    // VALIDATE DESTINATION
    // ---------------------------------------

    if (!destinationAccount) {
      return;
    }

    // ---------------------------------------
    // PREVENT SAME ACCOUNT TRANSFER
    // ---------------------------------------

    if (destinationAccount === account.accountNumber) {
      return;
    }

    // ---------------------------------------
    // VALIDATE REMARKS
    // ---------------------------------------

    if (!transferRemarks) {
      return;
    }

    // ---------------------------------------
    // CALL BACKEND
    // ---------------------------------------

    transferMutation.mutate(
      {
        fromAccountNumber: account.accountNumber,

        toAccountNumber: destinationAccount,

        amount: transferAmount,

        remarks: transferRemarks,
      },
      {
        onSuccess: () => {
          /*
           * Keep the FROM account selected
           * when returning to Dashboard.
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
      <main className="transfer-page">
        <section className="transfer-card">
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
      <main className="transfer-page">
        <section className="transfer-card">
          <button
            type="button"
            className="transfer-back"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={18} />
            Back to dashboard
          </button>

          <div className="transfer-header">
            <div className="transfer-icon">
              <ArrowRightLeft size={24} />
            </div>

            <span className="transfer-eyebrow">ACCOUNT TRANSACTION</span>

            <h1>Transfer money</h1>

            <p>Transfer money securely to another bank account.</p>
          </div>

          <div className="transfer-error" role="alert">
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
      <main className="transfer-page">
        <section className="transfer-card">
          <button
            type="button"
            className="transfer-back"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={18} />
            Back to dashboard
          </button>

          <div className="transfer-header">
            <div className="transfer-icon">
              <ArrowRightLeft size={24} />
            </div>

            <span className="transfer-eyebrow">ACCOUNT TRANSACTION</span>

            <h1>Transfer money</h1>
          </div>

          <div className="transfer-error" role="alert">
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
      <main className="transfer-page">
        <section className="transfer-card">
          <button
            type="button"
            className="transfer-back"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={18} />
            Back to dashboard
          </button>

          <div className="transfer-header">
            <div className="transfer-icon">
              <ArrowRightLeft size={24} />
            </div>

            <span className="transfer-eyebrow">ACCOUNT TRANSACTION</span>

            <h1>Transfer money</h1>
          </div>

          <div className="transfer-error" role="alert">
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
    <main className="transfer-page">
      <section className="transfer-card">
        {/* BACK */}

        <button
          type="button"
          className="transfer-back"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} />
          Back to dashboard
        </button>

        {/* HEADER */}

        <div className="transfer-header">
          <div className="transfer-icon">
            <ArrowRightLeft size={24} />
          </div>

          <span className="transfer-eyebrow">ACCOUNT TRANSACTION</span>

          <h1>Transfer money</h1>

          <p>Transfer money securely to another bank account.</p>
        </div>

        {/* FROM ACCOUNT */}

        <div className="transfer-account">
          <div className="transfer-account-row">
            <span>From account</span>

            <strong>{account.accountType}</strong>
          </div>

          <div className="transfer-account-row">
            <span>Account number</span>

            <strong>•••• {account.accountNumber.slice(-4)}</strong>
          </div>

          <div className="transfer-account-row">
            <span>Available balance</span>

            <strong>₹{account.balance.toLocaleString("en-IN")}</strong>
          </div>
        </div>

        {/* FORM */}

        <form className="transfer-form" onSubmit={handleSubmit}>
          {/* TO ACCOUNT */}

          <div className="transfer-field">
            <label htmlFor="toAccountNumber">To account number</label>

            <input
              id="toAccountNumber"
              type="text"
              inputMode="numeric"
              placeholder="Enter recipient account number"
              value={toAccountNumber}
              onChange={(event) => setToAccountNumber(event.target.value)}
              required
            />

            {toAccountNumber.trim() === account.accountNumber && (
              <span className="transfer-field-error">
                You cannot transfer money to the same account.
              </span>
            )}
          </div>

          {/* AMOUNT */}

          <div className="transfer-field">
            <label htmlFor="amount">Amount</label>

            <div className="transfer-amount-input">
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
              <span className="transfer-field-error">
                Amount cannot exceed your available balance.
              </span>
            )}
          </div>

          {/* REMARKS */}

          <div className="transfer-field">
            <label htmlFor="remarks">Remarks</label>

            <input
              id="remarks"
              type="text"
              placeholder="e.g. Rent payment"
              value={remarks}
              onChange={(event) => setRemarks(event.target.value)}
              required
            />
          </div>

          {/* API ERROR */}

          {transferMutation.isError && (
            <div className="transfer-error" role="alert">
              Unable to process the transfer. Please check the account number,
              balance and try again.
            </div>
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            className="transfer-submit"
            disabled={
              transferMutation.isPending ||
              !toAccountNumber.trim() ||
              !amount ||
              Number(amount) <= 0 ||
              Number(amount) > account.balance ||
              toAccountNumber.trim() === account.accountNumber ||
              !remarks.trim()
            }
          >
            {transferMutation.isPending ? "Processing..." : "Transfer money"}
          </button>
        </form>
      </section>
    </main>
  );
}
