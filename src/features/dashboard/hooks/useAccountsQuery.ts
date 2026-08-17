import { useQuery } from "@tanstack/react-query";

import { accountApi } from "../api/accountApi";

export function useAccountsQuery() {
  return useQuery({
    queryKey: ["accounts"],

    queryFn: async () => {
      const response = await accountApi.getAccounts();

      return response.data;
    },
  });
}
