import { z } from 'zod';

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
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'The passwords did not match',
      });
    }
  });

export type TSignInSchema = z.infer<typeof signInValidator>;
export type TSignUpSchema = z.infer<typeof signUpValidator>;
