import {
  Bell,
  ChevronDown,
  Landmark,
  LogOut,
  UserRound,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';

import { useAccountsQuery } from '../hooks/useAccountsQuery';
import { useTransactionsQuery } from '../hooks/useTransactionsQuery';

import { useCustomersQuery } from '../../../features/customers/hooks/useCustomersQuery';

import { getLoggedInEmail } from '../../../shared/utils/currentUser';

import { AccountSelector } from '../../../features/dashboard/components/AccountSelector/AccountSelector';

import {
  getSelectedAccountNumber,
  saveSelectedAccountNumber,
} from '../../../shared/utils/accountStorage';

import { useLogout } from '../../../features/auth/hooks/useLogout';

import './DashboardPage.css';

export function DashboardPage() {
  const navigate = useNavigate();

  // -----------------------------------------
  // LOGOUT
  // -----------------------------------------

  const logout = useLogout();

  // -----------------------------------------
  // USER MENU
  // -----------------------------------------

  const [isUserMenuOpen, setIsUserMenuOpen] =
    useState(false);

  // -----------------------------------------
  // LOGGED-IN USER
  // -----------------------------------------

  const loggedInEmail =
    getLoggedInEmail();

  // -----------------------------------------
  // API QUERIES
  // -----------------------------------------

  const customersQuery =
    useCustomersQuery();

  const accountsQuery =
    useAccountsQuery();

  // -----------------------------------------
  // FIND LOGGED-IN CUSTOMER
  // -----------------------------------------

  const customer =
    customersQuery.data?.find(
      (item) =>
        item.email.toLowerCase() ===
        loggedInEmail?.toLowerCase(),
    );

  // -----------------------------------------
  // FIND CUSTOMER ACCOUNTS
  // -----------------------------------------

  const customerAccounts = useMemo(() => {
    if (
      !accountsQuery.data ||
      !customer
    ) {
      return [];
    }

    return accountsQuery.data
      .filter(
        (account) =>
          account.customerId ===
          customer.customerId,
      )
      .sort(
        (a, b) =>
          new Date(
            a.createdAt,
          ).getTime() -
          new Date(
            b.createdAt,
          ).getTime(),
      );
  }, [
    accountsQuery.data,
    customer,
  ]);

  // -----------------------------------------
  // SAVED ACCOUNT
  // -----------------------------------------

  const savedAccountNumber =
    customer
      ? getSelectedAccountNumber(
          customer.customerId,
        )
      : null;

  // -----------------------------------------
  // CURRENT ACCOUNT
  // -----------------------------------------

  const [
    selectedAccountNumber,
    setSelectedAccountNumber,
  ] = useState<string | null>(null);

  // -----------------------------------------
  // EFFECTIVE ACCOUNT
  // -----------------------------------------

  const effectiveAccountNumber =
    selectedAccountNumber ??
    (
      customerAccounts.find(
        (account) =>
          account.accountNumber ===
          savedAccountNumber,
      ) ??
      customerAccounts[0]
    )?.accountNumber;

  // -----------------------------------------
  // SELECTED ACCOUNT OBJECT
  // -----------------------------------------

  const account = useMemo(() => {
    if (!effectiveAccountNumber) {
      return undefined;
    }

    return customerAccounts.find(
      (item) =>
        item.accountNumber ===
        effectiveAccountNumber,
    );
  }, [
    customerAccounts,
    effectiveAccountNumber,
  ]);

  // -----------------------------------------
  // ACCOUNT CHANGE
  // -----------------------------------------

  const handleAccountChange = (
    accountNumber: string,
  ) => {
    if (!customer) {
      return;
    }

    setSelectedAccountNumber(
      accountNumber,
    );

    saveSelectedAccountNumber(
      customer.customerId,
      accountNumber,
    );
  };

  // -----------------------------------------
  // TRANSACTIONS
  // -----------------------------------------

  const transactionsQuery =
    useTransactionsQuery(
      account?.accountNumber,
    );

  // -----------------------------------------
  // LOADING
  // -----------------------------------------

  if (
    customersQuery.isLoading ||
    accountsQuery.isLoading
  ) {
    return (
      <main className="dashboard-page">
        <section className="dashboard-shell">

          <div className="dashboard-loading">
            Loading your dashboard...
          </div>

        </section>
      </main>
    );
  }

  // -----------------------------------------
  // JWT ERROR
  // -----------------------------------------

  if (!loggedInEmail) {
    return (
      <main className="dashboard-page">
        <section className="dashboard-shell">

          <div className="dashboard-error">
            Unable to identify the logged-in
            user. Please sign in again.
          </div>

        </section>
      </main>
    );
  }

  // -----------------------------------------
  // CUSTOMER API ERROR
  // -----------------------------------------

  if (customersQuery.isError) {
    return (
      <main className="dashboard-page">
        <section className="dashboard-shell">

          <div className="dashboard-error">
            Unable to load customer
            information.
          </div>

        </section>
      </main>
    );
  }

  // -----------------------------------------
  // ACCOUNT API ERROR
  // -----------------------------------------

  if (accountsQuery.isError) {
    return (
      <main className="dashboard-page">
        <section className="dashboard-shell">

          <div className="dashboard-error">
            Unable to load your account
            information.
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
      <main className="dashboard-page">
        <section className="dashboard-shell">

          <div className="dashboard-error">
            No customer was found for the
            logged-in user.
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
      <main className="dashboard-page">
        <section className="dashboard-shell">

          <div className="dashboard-error">
            No account was found for the
            logged-in user.
          </div>

        </section>
      </main>
    );
  }

  // -----------------------------------------
  // DISPLAY DATA
  // -----------------------------------------

  const customerName =
    `${customer.firstName} ${customer.lastName}`.trim();

  const balance =
    account.balance;

  const accountStatus =
    account.status;

  // -----------------------------------------
  // RECENT TRANSACTIONS
  // -----------------------------------------

  const transactions =
    transactionsQuery.data?.slice(
      0,
      5,
    ) ?? [];

  // -----------------------------------------
  // GREETING
  // -----------------------------------------

  const currentHour =
    new Date().getHours();

  let greeting =
    'Good evening';

  if (currentHour < 12) {
    greeting =
      'Good morning';
  } else if (currentHour < 18) {
    greeting =
      'Good afternoon';
  }

  // -----------------------------------------
  // SIGN OUT
  // -----------------------------------------

  const handleSignOut = () => {
    setIsUserMenuOpen(false);
    logout();
  };

  // -----------------------------------------
  // RENDER
  // -----------------------------------------

  return (
    <main className="dashboard-page">

      <section className="dashboard-shell">

        {/* =====================================
            HEADER
            ===================================== */}

        <header className="dashboard-header">

          {/* BRAND */}

          <div className="dashboard-brand">

            <div className="dashboard-brand-icon">
              <Landmark size={19} />
            </div>

            <span>
              Bank
            </span>

          </div>


          {/* HEADER ACTIONS */}

          <div className="dashboard-header-actions">

            {/* NOTIFICATIONS */}

            <button
              type="button"
              className="dashboard-notification"
              aria-label="Notifications"
            >
              <Bell size={19} />
            </button>


            {/* USER MENU */}

            <div className="dashboard-user-menu">

              <button
                type="button"
                className="dashboard-user"
                onClick={() =>
                  setIsUserMenuOpen(
                    (previous) =>
                      !previous,
                  )
                }
                aria-expanded={
                  isUserMenuOpen
                }
                aria-haspopup="menu"
              >

                <UserRound size={18} />

                <span>
                  {customer.firstName}{' '}
                  {customer.lastName?.charAt(
                    0,
                  )}
                </span>

                <ChevronDown
                  size={16}
                  className={
                    isUserMenuOpen
                      ? 'dashboard-user-chevron dashboard-user-chevron--open'
                      : 'dashboard-user-chevron'
                  }
                />

              </button>


              {/* USER DROPDOWN */}

              {isUserMenuOpen && (
                <div
                  className="dashboard-user-dropdown"
                  role="menu"
                >

                  {/* USER INFORMATION */}

                  <div className="dashboard-user-dropdown-header">

                    <div className="dashboard-user-avatar">
                      <UserRound size={18} />
                    </div>

                    <div className="dashboard-user-details">

                      <strong>
                        {customerName}
                      </strong>

                      <span>
                        {customer.email}
                      </span>

                    </div>

                  </div>


                  {/* MENU ITEMS */}

                  <div className="dashboard-user-dropdown-items">

                    <button
                      type="button"
                      className="dashboard-user-dropdown-item"
                      disabled
                    >
                      <UserRound
                        size={17}
                      />

                      <span>
                        Profile
                      </span>
                    </button>


                    <button
                      type="button"
                      className="dashboard-user-dropdown-item"
                      disabled
                    >
                      <span className="dashboard-settings-icon">
                        ⚙
                      </span>

                      <span>
                        Settings
                      </span>
                    </button>

                  </div>


                  {/* SIGN OUT */}

                  <div className="dashboard-user-dropdown-footer">

                    <button
                      type="button"
                      className="dashboard-signout"
                      onClick={
                        handleSignOut
                      }
                    >
                      <LogOut
                        size={17}
                      />

                      <span>
                        Sign out
                      </span>
                    </button>

                  </div>

                </div>
              )}

            </div>

          </div>

        </header>


        {/* =====================================
            CONTENT
            ===================================== */}

        <div className="dashboard-content">

          {/* TITLE */}

          <h1 className="dashboard-title">
            Dashboard
          </h1>

          <p className="dashboard-welcome">
            {greeting},{' '}
            {customerName}
          </p>


          {/* =================================
              BALANCE
              ================================= */}

          <section className="dashboard-balance-section">

            <div className="dashboard-balance-card">

              <span className="dashboard-card-label">
                Total Balance
              </span>

              <strong className="dashboard-balance">
                ₹
                {balance.toLocaleString(
                  'en-IN',
                )}
              </strong>

            </div>


            <div className="dashboard-balance-card">

              <span className="dashboard-card-label">
                Available
              </span>

              <strong className="dashboard-balance">
                ₹
                {balance.toLocaleString(
                  'en-IN',
                )}
              </strong>

            </div>

          </section>


          {/* =================================
              ACCOUNT SELECTOR
              ================================= */}

          <section className="dashboard-account-info">

            <AccountSelector
              accounts={
                customerAccounts
              }
              selectedAccountNumber={
                effectiveAccountNumber ??
                ''
              }
              onAccountChange={
                handleAccountChange
              }
            />

            <span
              className={`dashboard-account-status ${accountStatus.toLowerCase()}`}
            >
              {accountStatus}
            </span>

          </section>


          {/* =================================
              QUICK ACTIONS
              ================================= */}

          <section className="dashboard-section">

            <h2>
              Quick Actions
            </h2>

            <div className="dashboard-actions">

              <button
                type="button"
                className="dashboard-action"
                onClick={() =>
                  navigate('/deposit')
                }
              >
                Deposit
              </button>


              <button
                type="button"
                className="dashboard-action"
                onClick={() =>
                  navigate('/withdraw')
                }
              >
                Withdraw
              </button>


              <button
                type="button"
                className="dashboard-action"
                onClick={() =>
                  navigate('/transfer')
                }
              >
                Transfer
              </button>


              <button
                type="button"
                className="dashboard-action"
                onClick={() =>
                  navigate('/transactions')
                }
              >
                Transactions
              </button>

            </div>

          </section>


          {/* =================================
              RECENT TRANSACTIONS
              ================================= */}

          <section className="dashboard-section">

            <h2>
              Recent Transactions
            </h2>


            {/* LOADING */}

            {transactionsQuery.isLoading && (
              <div className="transaction-message">
                Loading transactions...
              </div>
            )}


            {/* ERROR */}

            {transactionsQuery.isError && (
              <div className="transaction-message transaction-error">
                Unable to load transactions.
              </div>
            )}


            {/* EMPTY */}

            {!transactionsQuery.isLoading &&
              !transactionsQuery.isError &&
              transactions.length ===
                0 && (
                <div className="transaction-message">
                  No transactions found.
                </div>
              )}


            {/* TRANSACTIONS */}

            {transactions.length > 0 && (
              <div className="transaction-list">

                {transactions.map(
                  (transaction) => {

                    const isCredit =
                      transaction.transactionType
                        .toUpperCase() ===
                      'DEPOSIT';

                    const formattedAmount =
                      transaction.amount.toLocaleString(
                        'en-IN',
                      );

                    const transactionDate =
                      new Date(
                        transaction.transactionTime,
                      ).toLocaleDateString(
                        'en-IN',
                        {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        },
                      );

                    return (
                      <div
                        key={
                          transaction.transactionReference
                        }
                        className="transaction-row"
                      >

                        <div className="transaction-details">

                          <span className="transaction-name">
                            {transaction.remarks ||
                              transaction.transactionType}
                          </span>

                          <span className="transaction-date">
                            {transactionDate}
                          </span>

                        </div>


                        <span
                          className={`transaction-amount ${
                            isCredit
                              ? 'credit'
                              : 'debit'
                          }`}
                        >
                          {isCredit
                            ? '+'
                            : '-'}
                          ₹
                          {formattedAmount}
                        </span>

                      </div>
                    );
                  },
                )}

              </div>
            )}

          </section>

        </div>

      </section>

    </main>
  );
}