import { apiClient } from '../../../app/api/client';

import type { Transaction } from '../types/transaction';

export interface DepositRequest {
  accountNumber: string;
  amount: number;
  remarks: string;
}

export interface WithdrawRequest {
  accountNumber: string;
  amount: number;
  remarks: string;
}

export interface TransferRequest {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  remarks: string;
}

export const transactionApi = {

  getTransactions: (accountNumber: string) => {
    return apiClient.get<Transaction[]>(
      `/transactions/${accountNumber}`,
    );
  },

  deposit: (request: DepositRequest) => {
    return apiClient.post(
      '/transactions/deposit',
      request,
    );
  },

  withdraw: (request: WithdrawRequest) => {
    return apiClient.post(
      '/transactions/withdraw',
      request,
    );
  },

  transfer: (request: TransferRequest) => {
    return apiClient.post(
      '/transactions/transfer',
      request,
    );
  },
};