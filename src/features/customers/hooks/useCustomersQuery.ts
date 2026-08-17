import { useQuery } from "@tanstack/react-query";

import { customerApi } from "../api/customerApi";

export function useCustomersQuery() {
  return useQuery({
    queryKey: ["customers"],

    queryFn: async () => {
      const response = await customerApi.getCustomers();

      return response.data;
    },
  });
}
