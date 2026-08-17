import { useMutation } from "@tanstack/react-query";
import { transactionApi } from "../api/transactionApi";

export function useDepositMutation() {
    return useMutation({
        mutationFn: transactionApi.deposit,
    });
}