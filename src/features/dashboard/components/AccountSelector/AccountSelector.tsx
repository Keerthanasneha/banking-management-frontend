import { ChevronDown, Check } from "lucide-react";

import { useState } from "react";

import type { Account } from "../../types/account";

import "./AccountSelector.css";

interface AccountSelectorProps {
  accounts: Account[];
  selectedAccountNumber: string;
  onAccountChange: (accountNumber: string) => void;
}

export function AccountSelector({
  accounts,
  selectedAccountNumber,
  onAccountChange,
}: AccountSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  /*
   * Find the currently selected account.
   */
  const selectedAccount =
    accounts.find(
      (account) => account.accountNumber === selectedAccountNumber,
    ) ?? accounts[0];

  /*
   * No accounts available.
   */
  if (!selectedAccount) {
    return null;
  }

  /*
   * Handle account selection.
   */
  const handleSelect = (accountNumber: string) => {
    onAccountChange(accountNumber);
    setIsOpen(false);
  };

  return (
    <div className="account-selector">
      {/* SELECTED ACCOUNT */}

      <button
        type="button"
        className="account-selector-trigger"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
      >
        <div className="account-selector-info">
          <span className="account-selector-label">Account</span>

          <strong>{selectedAccount.accountType}</strong>

          <span className="account-selector-number">
            •••• {selectedAccount.accountNumber.slice(-4)}
          </span>
        </div>

        <ChevronDown
          size={20}
          className={
            isOpen
              ? "account-selector-chevron account-selector-chevron--open"
              : "account-selector-chevron"
          }
        />
      </button>

      {/* DROPDOWN */}

      {isOpen && (
        <div className="account-selector-menu">
          {accounts.map((account) => {
            const isSelected =
              account.accountNumber === selectedAccount.accountNumber;

            return (
              <button
                key={account.accountNumber}
                type="button"
                className={
                  isSelected
                    ? "account-selector-option account-selector-option--selected"
                    : "account-selector-option"
                }
                onClick={() => handleSelect(account.accountNumber)}
              >
                <div className="account-selector-option-info">
                  <strong>{account.accountType}</strong>

                  <span>•••• {account.accountNumber.slice(-4)}</span>

                  <small>
                    Balance: ₹{account.balance.toLocaleString("en-IN")}
                  </small>
                </div>

                {isSelected && <Check size={18} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
