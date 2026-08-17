const SELECTED_ACCOUNT_PREFIX = 'selectedAccount_';

export function getSelectedAccountNumber(
  customerId: number,
): string | null {
  return localStorage.getItem(
    `${SELECTED_ACCOUNT_PREFIX}${customerId}`,
  );
}

export function saveSelectedAccountNumber(
  customerId: number,
  accountNumber: string,
): void {
  localStorage.setItem(
    `${SELECTED_ACCOUNT_PREFIX}${customerId}`,
    accountNumber,
  );
}

export function clearSelectedAccountNumber(
  customerId: number,
): void {
  localStorage.removeItem(
    `${SELECTED_ACCOUNT_PREFIX}${customerId}`,
  );
}