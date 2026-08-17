import { useMutation } from "@tanstack/react-query";

import { transactionApi } from "../api/transactionApi";

export function useTransferMutation() {
  return useMutation({
    mutationFn: transactionApi.transfer,
  });
}
