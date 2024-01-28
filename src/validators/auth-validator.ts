import { z } from 'zod';
import libphonenumber from 'libphonenumber-js';

export const countryCodes = ['IN'] as const;
export const countryCodeEnum = z.enum(countryCodes);
export const signInValidator = z.object({
  email: z.string().min(1, 'Email cannot be empty').email('Please enter valid email'),
  password: z.string(),
});

export const signUpValidator = z
  .object({
    email: z.string().min(1, 'Email cannot be empty').email('Please enter valid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .refine(password => /[a-z]/.test(password), {
        message: 'Password must contain at least 1 lowercase letter',
      })
      .refine(password => /[A-Z]/.test(password), {
        message: 'Password must contain at least 1 uppercase letter',
      })
      .refine(password => /\d/.test(password), {
        message: 'Password must contain at least 1 numeric digit',
      })
      .refine(password => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password), {
        message: 'Password must contain at least 1 special character',
      }),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .refine(password => /[a-z]/.test(password), {
        message: 'Password must contain at least 1 lowercase letter',
      })
      .refine(password => /[A-Z]/.test(password), {
        message: 'Password must contain at least 1 uppercase letter',
      })
      .refine(password => /\d/.test(password), {
        message: 'Password must contain at least 1 numeric digit',
      })
      .refine(password => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password), {
        message: 'Password must contain at least 1 special character',
      }),
    mobile: z.coerce.number().min(10, 'Should be minimum 10 Digits'),
    countryCode: countryCodeEnum,
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'The passwords did not match',
      });
    }
  })
  .superRefine(({ mobile, countryCode }, ctx) => {
    const isMobileValid = libphonenumber(String(mobile), countryCode);
    if (!(isMobileValid?.isValid() && isMobileValid?.isPossible()))
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['mobile'],
        message: 'Please Enter Correct mobile number',
      });
  });

export type TSignInSchema = z.infer<typeof signInValidator>;
export type TSignUpSchema = z.infer<typeof signUpValidator>;
export type TCountryCodesEnum = z.infer<typeof countryCodeEnum>;
