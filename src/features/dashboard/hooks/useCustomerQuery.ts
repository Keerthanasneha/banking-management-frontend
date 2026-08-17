import { useQuery } from "@tanstack/react-query";

import { customerApi } from "../../../features/customers/api/customerApi";

export function useCustomerQuery(customerId: number | undefined) {
  return useQuery({
    queryKey: ["customer", customerId],

    queryFn: async () => {
      const response = await customerApi.getCustomer(customerId!);

      return response.data;
    },

    enabled: customerId !== undefined,
  });
}
