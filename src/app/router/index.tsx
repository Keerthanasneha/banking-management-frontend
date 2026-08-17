import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DashboardPage } from "../../features/dashboard/pages/DashboardPage";
import { LoginPage } from "../../features/auth/pages/LoginPage";
import { OtpVerificationPage } from "../../features/auth/pages/OtpVerificationPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { SignupPage } from "../../features/auth/pages/SignUp";
import { SetPasswordPage } from "../../features/auth/pages/setPassword";
import { DepositPage } from "../../features/dashboard/pages/transactions/DepositPage";
import { WithdrawPage } from "../../features/dashboard/pages/transactions/WithdrawPage";
import { TransferPage } from "../../features/dashboard/pages/transactions/TransferPage";
import { TransactionsPage } from "../../features/dashboard/pages/transactions/TransactionsPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}

        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/otp-verification" element={<OtpVerificationPage />} />

        {/* Protected routes */}

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/deposit" element={<DepositPage />} />
          <Route path="/withdraw" element={<WithdrawPage />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />

          {/* Future */}
          {/* <Route path="/customers" element={<CustomersPage />} /> */}
          {/* <Route path="/accounts" element={<AccountsPage />} /> */}
          {/* <Route path="/transactions" element={<TransactionsPage />} /> */}
        </Route>

        <Route path="/set-password" element={<SetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}
