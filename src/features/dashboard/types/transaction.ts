export interface Transaction {
  transactionReference: string;
  transactionType: string;
  amount: number;
  fromAccountNumber: string | null;
  toAccountNumber: string | null;
  status: string;
  remarks: string;
  transactionTime: string;
}