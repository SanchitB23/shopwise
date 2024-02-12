import { publicProcedure, router } from '../index';
import productsRouter from './products';
import { getPayloadClient } from '../../server/db/config/get-payloadcms';
import { Category } from '../../payload-types';
import { authRouter } from './auth-router';
import { userRouter } from './users';

export const appRouter = router({
  auth: authRouter,
  productsRouter,
  getCategories: publicProcedure.query(async () => {
    const payload = await getPayloadClient();
    const { docs: items } = await payload.find({
      collection: 'categories',
    });
    return items as Category[];
  }),
  userRouter,
});

export type AppRouter = typeof appRouter;
