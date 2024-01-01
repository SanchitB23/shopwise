import { publicProcedure, router } from '../index';
import productsRouter from './products';
import { getPayloadClient } from '../../server/db/config/get-payloadcms';
import { Category } from '../../payload-types';

export const appRouter = router({
  productsRouter,
  getCategories: publicProcedure.query(async () => {
    const payload = await getPayloadClient();
    const { docs: items } = await payload.find({
      collection: 'categories',
    });
    return items as Category[];
  }),
});

export type AppRouter = typeof appRouter;
