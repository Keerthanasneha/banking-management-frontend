import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../../features/auth/pages/LoginPage";
import { OtpVerificationPage } from "../../features/auth/pages/OtpVerificationPage";
import { SignupPage } from "../../features/auth/pages/SignUp";
import { SetPasswordPage } from "../../features/auth/pages/setPassword";
import { DashboardPage } from "../../features/dashboard/pages/DashboardPage";
import { DepositPage } from "../../features/dashboard/pages/transactions/DepositPage";
import { TransactionsPage } from "../../features/dashboard/pages/transactions/TransactionsPage";
import { TransferPage } from "../../features/dashboard/pages/transactions/TransferPage";
import { WithdrawPage } from "../../features/dashboard/pages/transactions/WithdrawPage";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}

        <Route path="/" element={<Navigate to="/login" replace />} />

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
