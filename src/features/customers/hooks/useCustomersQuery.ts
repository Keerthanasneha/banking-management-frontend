// This connects React components to TanStack Query.

import { useQuery } from '@tanstack/react-query';

import { customerApi } from '../api/customerApi';

export function useCustomersQuery() {
  return useQuery({
    queryKey: ['customers'],
    queryFn: () => customerApi.getCustomers(),
  });
}
