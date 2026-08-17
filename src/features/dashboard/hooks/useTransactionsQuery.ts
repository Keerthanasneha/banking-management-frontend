import { useQuery } from '@tanstack/react-query';

import { transactionApi } from '../api/transactionApi';

export function useTransactionsQuery(
  accountNumber: string | undefined,
) {
  return useQuery({
    queryKey: ['transactions', accountNumber],

    queryFn: async () => {
      if (!accountNumber) {
        throw new Error('Account number is required');
      }

      const response =
        await transactionApi.getTransactions(accountNumber);

      return response.data;
    },

    enabled: !!accountNumber,
  });
}