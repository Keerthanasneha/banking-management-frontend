import { apiClient } from "../../../app/api/client";
import type { Account } from "../types/account";

export const accountApi = {
  getAccounts: () => {
    return apiClient.get<Account[]>("/accounts");
  },
};
