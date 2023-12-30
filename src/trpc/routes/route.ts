import { router } from '../index';
import productsRouter from './products';

export const appRouter = router({
  productsRouter,
});

export type AppRouter = typeof appRouter;
