import { publicProcedure, router } from '../index';
import { signInValidator } from '../../validators/auth-validator';
import { getPayloadClient } from '../../server/db/config/get-payloadcms';
import { TRPCError } from '@trpc/server';

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
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
    }),
});
