// composes global React context providers required throughout the application.

import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { queryClient } from "../query/queryClient";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
