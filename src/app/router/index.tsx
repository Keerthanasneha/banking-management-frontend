import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DashboardPage } from "../../features/dashboard/pages/DashboardPage";
import { LoginPage } from "../../features/auth/pages/LoginPage";
import { OtpVerificationPage } from "../../features/auth/pages/OtpVerificationPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { SignupPage } from "../../features/auth/pages/SignUp";
import { SetPasswordPage } from "../../features/auth/pages/setPassword";

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
