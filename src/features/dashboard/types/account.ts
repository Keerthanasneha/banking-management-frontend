import { apiClient } from "../../../app/api/client";

export interface Account {
  id: number;
  accountNumber: string;
  customerId: number;
  customerName: string;
  accountType: string;
  balance: number;
  status: string;
  createdAt: string;
}

export const accountApi = {
  getAccounts: () => {
    return apiClient.get<Account[]>("/accounts");
  },
};
