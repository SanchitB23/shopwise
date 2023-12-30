import { createTRPCReact } from '@trpc/react-query';
import { AppRouter } from './routes/route';

export const trpc = createTRPCReact<AppRouter>({});
