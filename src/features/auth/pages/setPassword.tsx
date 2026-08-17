import { useState, type FormEvent } from "react";
import { LockKeyhole } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { authApi } from "../api/authApi";

import "./setPassword.css";

interface RegistrationState {
  customerId: number;
  email: string;
}

export function SetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const registration = location.state as RegistrationState | null;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!registration?.customerId) {
    return (
      <main className="set-password-page">
        <section className="set-password-card">
          <h1>Registration session expired</h1>

          <p>Please start the registration process again.</p>

          <button type="button" onClick={() => navigate("/signup")}>
            Back to registration
          </button>
        </section>
      </main>
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);

      await authApi.register({
        customerId: registration.customerId,
        password,
      });

      navigate("/login", {
        replace: true,
        state: {
          registrationSuccess: true,
          email: registration.email,
        },
      });
    } catch (error) {
      console.error("Password registration failed:", error);

      setError("Unable to create your password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="set-password-page">
      <section className="set-password-card">
        <div className="set-password-icon">
          <LockKeyhole size={24} />
        </div>

        <span className="set-password-eyebrow">ACCOUNT SECURITY</span>

        <h1>Create your password</h1>

        <p>
          Your customer account has been created. Set a secure password to
          complete your registration.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword">Confirm password</label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              required
            />
          </div>

          {error && (
            <div className="set-password-error" role="alert">
              {error}
            </div>
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating password..." : "Create password"}
          </button>
        </form>
      </section>
    </main>
  );
}
