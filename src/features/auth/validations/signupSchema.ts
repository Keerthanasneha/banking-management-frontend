import { z } from 'zod';

export const signupSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name is too long'),

  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .max(50, 'Last name is too long'),

  email: z
    .string()
    .trim()
    .email('Enter a valid email address'),

  phoneNumber: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, 'Phone number must contain 10 digits'),

  panNumber: z
    .string()
    .trim()
    .toUpperCase()
    .regex(
      /^[A-Z]{5}[0-9]{4}[A-Z]$/,
      'Enter a valid PAN number',
    ),

  address: z
    .string()
    .trim()
    .min(10, 'Address must be at least 10 characters')
    .max(250, 'Address is too long'),

  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine(
      (date) => {
        return new Date(date) < new Date();
      },
      {
        message: 'Date of birth must be in the past',
      },
    ),
});

export type SignupFormData = z.infer<typeof signupSchema>;