import {
  useRef,
  useState,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

import { useVerifyOtp } from '../hooks/useVerifyOtp';

import './OtpVerificationPage.css';
import { useLocation } from 'react-router-dom';

const OTP_LENGTH = 6;

export function OtpVerificationPage() {
  const [otp, setOtp] = useState<string[]>(
    Array(OTP_LENGTH).fill(''),
  );

  const location = useLocation();
  const email = location.state?.email;

const verifyOtp = useVerifyOtp();


  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);


  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);

    const nextOtp = [...otp];
    nextOtp[index] = digit;

    setOtp(nextOtp);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (
      event.key === 'Backspace' &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    if (
      event.key === 'ArrowLeft' &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    if (
      event.key === 'ArrowRight' &&
      index < OTP_LENGTH - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (
    event: ClipboardEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH);

    if (!pastedValue) {
      return;
    }

    const nextOtp = Array(OTP_LENGTH).fill('');

    pastedValue.split('').forEach((digit, index) => {
      nextOtp[index] = digit;
    });

    setOtp(nextOtp);

    const nextIndex = Math.min(
      pastedValue.length,
      OTP_LENGTH - 1,
    );

    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const otpValue = otp.join('');

    if (otpValue.length !== OTP_LENGTH) {
      return;
    }

    verifyOtp.mutate({
        email,
      otp: otpValue,
    });
  };

  const isOtpComplete = otp.every(Boolean);

  return (
    <main className="otp-page">
      <section className="otp-container">
        <div className="otp-card">

          {/* OTP Icon */}
          <div className="otp-icon">
            <ShieldCheck size={25} />
          </div>

          {/* Header */}
          <div className="otp-header">
            <span className="otp-eyebrow">
              SECURITY VERIFICATION
            </span>

            <h1>Verify your identity</h1>

            <p>
              Enter the 6-digit verification code sent to your
              registered mobile number.
            </p>
          </div>

          {/* OTP Form */}
          <form
            className="otp-form"
            onSubmit={handleSubmit}
          >
            <div
              className="otp-input-group"
              aria-label="6-digit verification code"
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  className="otp-input"
                  type="text"
                  inputMode="numeric"
                  autoComplete={
                    index === 0
                      ? 'one-time-code'
                      : 'off'
                  }
                  maxLength={1}
                  value={digit}
                  aria-label={`Verification digit ${
                    index + 1
                  }`}
                  onChange={(event) =>
                    handleChange(
                      index,
                      event.target.value,
                    )
                  }
                  onKeyDown={(event) =>
                    handleKeyDown(index, event)
                  }
                  onPaste={handlePaste}
                />
              ))}
            </div>

            {/* Verification Error */}
            {verifyOtp.isError && (
              <div
                className="otp-error"
                role="alert"
              >
                Unable to verify the code. Please try again.
              </div>
            )}

            {/* Verify Button */}
            <button
              className="otp-submit-button"
              type="submit"
              disabled={
                !isOtpComplete ||
                verifyOtp.isPending
              }
            >
              {verifyOtp.isPending
                ? 'Verifying...'
                : 'Verify and continue'}
            </button>
          </form>

          {/* Resend */}
          <div className="otp-resend">
            <span>
              Didn't receive the code?
            </span>

            <button type="button">
              Resend code
            </button>
          </div>

          {/* Back */}
          <button
            type="button"
            className="back-to-login"
          >
            <ArrowLeft size={16} />
            Back to sign in
          </button>

          {/* Security Note */}
          <div className="otp-security-note">
            <ShieldCheck size={17} />

            <span>
              Never share your verification code with
              anyone, including bank representatives.
            </span>
          </div>

        </div>
      </section>
    </main>
  );
}