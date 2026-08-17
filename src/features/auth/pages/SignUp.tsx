import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";

import {
  signupSchema,
  type SignupFormData,
} from "../../auth/validations/signupSchema";

import "./SignUp.css";
import { useCreateCustomer } from "../../customers/hooks/useCreateCustomer";

export function SignupPage() {
  const createCustomer = useCreateCustomer();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: SignupFormData) => {
    createCustomer.mutate(data, {
      onSuccess: (response) => {
        navigate("/set-password", {
          state: {
            customerId: response.data.customerId,
            email: response.data.email,
          },
        });
      },
    });
  };

  return (
    <main className="signup-page">
      <section className="signup-card">
        <div className="signup-header">
          <div className="signup-icon">
            <UserPlus size={24} />
          </div>

          <span className="signup-eyebrow">CUSTOMER REGISTRATION</span>

          <h1>Create your account</h1>

          <p>
            Register your details to get started with Banking Management System.
          </p>
        </div>

        <form
          className="signup-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="signup-grid">
            {/* First Name */}
            <div className="form-field">
              <label htmlFor="firstName">First name</label>

              <input
                id="firstName"
                type="text"
                placeholder="Enter first name"
                autoComplete="given-name"
                {...register("firstName")}
              />

              {errors.firstName && (
                <span className="form-error">{errors.firstName.message}</span>
              )}
            </div>

            {/* Last Name */}
            <div className="form-field">
              <label htmlFor="lastName">Last name</label>

              <input
                id="lastName"
                type="text"
                placeholder="Enter last name"
                autoComplete="family-name"
                {...register("lastName")}
              />

              {errors.lastName && (
                <span className="form-error">{errors.lastName.message}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-field">
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email")}
              />

              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>

            {/* Phone */}
            <div className="form-field">
              <label htmlFor="phoneNumber">Phone number</label>

              <input
                id="phoneNumber"
                type="tel"
                inputMode="numeric"
                placeholder="10-digit phone number"
                autoComplete="tel"
                maxLength={10}
                {...register("phoneNumber")}
              />

              {errors.phoneNumber && (
                <span className="form-error">{errors.phoneNumber.message}</span>
              )}
            </div>

            {/* PAN */}
            <div className="form-field">
              <label htmlFor="panNumber">PAN number</label>

              <input
                id="panNumber"
                type="text"
                placeholder="ABCDE1234F"
                autoComplete="off"
                maxLength={10}
                style={{ textTransform: "uppercase" }}
                {...register("panNumber")}
              />

              {errors.panNumber && (
                <span className="form-error">{errors.panNumber.message}</span>
              )}
            </div>

            {/* DOB */}
            <div className="form-field">
              <label htmlFor="dateOfBirth">Date of birth</label>

              <input
                id="dateOfBirth"
                type="date"
                {...register("dateOfBirth")}
              />

              {errors.dateOfBirth && (
                <span className="form-error">{errors.dateOfBirth.message}</span>
              )}
            </div>

            {/* Address */}
            <div className="form-field form-field--full">
              <label htmlFor="address">Address</label>

              <textarea
                id="address"
                rows={4}
                placeholder="Enter your full address"
                autoComplete="street-address"
                {...register("address")}
              />

              {errors.address && (
                <span className="form-error">{errors.address.message}</span>
              )}
            </div>
          </div>

          {createCustomer.isError && (
            <div className="signup-error" role="alert">
              Unable to create your account. Please try again.
            </div>
          )}

          <button
            type="submit"
            className="signup-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        {createCustomer.isSuccess && (
          <div className="signup-success" role="status">
            Account created successfully.
          </div>
        )}

        <div className="signup-footer">
          <span>Already have an account?</span>

          <Link to="/login">Sign in</Link>
        </div>
      </section>
    </main>
  );
}
