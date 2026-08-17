import { useMutation } from '@tanstack/react-query';

import { transactionApi } from '../api/transactionApi';

export function useWithdrawMutation() {
  return useMutation({
    mutationFn: transactionApi.withdraw,
  });
}