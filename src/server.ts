import path from 'node:path';
import dotenv from 'dotenv';
import express from 'express';
import nextBuild from 'next/dist/build';
import { getPayloadClient } from './server/db/config/get-payloadcms';
import { nextApp, nextHandler } from './server/utils/next-utils';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext } from './trpc/config/create-context';
import { appRouter } from './trpc/routes/route';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const app = express();
const PORT = process.env.PORT || 3000;

const start = async (): Promise<void> => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
    },
  });
  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info('Next.js is building for production');

      // @ts-expect-error
      await nextBuild(path.join(__dirname, '../'));

      process.exit();
    });

    return;
  }

  app.use(payload.authenticate);
  // app.use(mediaManagement(cloudinaryConfig));
  app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );
  app.use((req, res) => nextHandler(req, res));
  nextApp.prepare().then(() => {
    payload.logger.info('Next.js started');

    app.listen(PORT, async () => {
      payload.logger.info(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
    });
  });
};

start();
