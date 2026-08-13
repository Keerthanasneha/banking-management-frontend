// backend operations and hides HTTP details from the UI for customer related operations."

import { apiClient } from '../../../app/api/client';

export interface CreateCustomerRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  panNumber: string;
  address: string;
  dateOfBirth: string;
}

export interface CustomerResponse {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  createdAt: string;
}

export const customerApi = {
    getCustomers: () => {
    return apiClient.get<CustomerResponse[]>('/customers');
  },
  
  createCustomer: (request: CreateCustomerRequest) => {
    return apiClient.post<CustomerResponse>(
      '/customers',
      request,
    );
  },
};