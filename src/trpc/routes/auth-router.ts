import { publicProcedure, router } from '../index';
import { signInValidator, signUpValidator } from '../../validators/auth-validator';
import { getPayloadClient } from '../../server/db/config/get-payloadcms';
import { TRPCError } from '@trpc/server';
import libphonenumber from 'libphonenumber-js';
import { APIError } from 'payload/errors';

export const authRouter = router({
  signIn: publicProcedure
    .input(signInValidator)
    .mutation(async ({ input: { email, password }, ctx: { res } }) => {
      try {
        const payload = await getPayloadClient();
        await payload.login({
          collection: 'users',
          data: {
            email,
            password,
          },
          res,
        });
        return { success: true };
      } catch (err) {
        let error = err as APIError;
        if (error.status === 401) {
          throw new TRPCError({ code: 'UNAUTHORIZED', message: error.message });
        }
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),
  signUp: publicProcedure
    .input(signUpValidator)
    .mutation(async ({ input: { email, password, mobile, countryCode } }) => {
      const mobileNumber = libphonenumber(String(mobile), countryCode)?.number as string;
      if (!mobileNumber)
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Mobile Number is not valid' });

      try {
        const payload = await getPayloadClient();
        const { docs: users } = await payload.find({
          collection: 'users',
          where: {
            email: {
              equals: email,
            },
          },
        });

        if (users.length !== 0) throw new TRPCError({ code: 'CONFLICT' });

        await payload.create({
          collection: 'users',
          data: {
            email,
            password,
            mobile,
            role: 'customer',
          },
        });

        return { success: true, sentToEmail: email };
      } catch (e) {
        if (e instanceof TRPCError) throw e;
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),
});
