import { useMutation } from "@tanstack/react-query";

import { customerApi, type CreateCustomerRequest } from "../api/customerApi";

export function useCreateCustomer() {
  return useMutation({
    mutationFn: (request: CreateCustomerRequest) => {
      return customerApi.createCustomer(request);
    },
  });
}
