import { useState, type FormEvent } from "react";
import { Eye, EyeOff, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";

import { useLogin } from "../hooks/useLogin";
import "./LoginPage.css";
import { Link } from "react-router-dom";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = useLogin();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login.mutate({
      email,
      password,
    });
  };

  return (
    <main className="login-page">
      <section className="login-container">
        {/* Brand / Information Panel */}
        <div className="login-info">
          <div className="bank-brand">
            <div className="brand-mark">B</div>

            <span className="brand-name">Banking Management</span>
          </div>

          <div className="login-info-content">
            <span className="login-eyebrow">SECURE BANKING PORTAL</span>

            <h1>
              Manage your banking
              <span> securely.</span>
            </h1>

            <p>
              Access your accounts, transactions, transfers and financial
              information through a secure banking platform.
            </p>
          </div>

          <div className="security-note">
            <ShieldCheck size={20} />

            <div>
              <strong>Protected environment</strong>
              <span>Your connection is secured and monitored.</span>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="login-section">
          <div className="login-card">
            <div className="login-header">
              <div className="mobile-brand">
                <div className="brand-mark">B</div>
                <span className="brand-name">Banking Management</span>
              </div>

              <h2>Welcome back</h2>

              <p>Sign in to access your banking dashboard.</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="form-field">
                <label htmlFor="email">Email address</label>

                <div className="input-wrapper">
                  <UserRound size={18} />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-field">
                <div className="password-label-row">
                  <label htmlFor="password">Password</label>

                  <button
                    type="button"
                    className="forgot-password"
                    onClick={() => {
                      // Implement forgot password flow later.
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="input-wrapper">
                  <LockKeyhole size={18} />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {login.isError && (
                <div className="login-error" role="alert">
                  Unable to sign in. Please check your credentials and try
                  again.
                </div>
              )}

              {/* Submit */}
              <button
                className="login-button"
                type="submit"
                disabled={login.isPending}
              >
                {login.isPending ? "Signing in..." : "Sign in"}
              </button>

               {/* Sign-up */}
                <div className="login-signup">
                <span>Don't have an account?</span>
                <Link to="/signup">Create an account</Link>
              </div>

            </form>

            <div className="login-footer">
              <span>Authorized users only</span>
              <span className="footer-divider">•</span>
              <span>Secure banking platform</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
