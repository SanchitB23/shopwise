import { InitOptions } from 'payload/config';
import payload, { Payload } from 'payload';

const cached = (global as any).payload;

interface Args {
  initOptions?: Partial<InitOptions>;
}

export const getPayloadClient = async ({ initOptions }: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is missing');
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET || '',
      local: !initOptions?.express,
      onInit: async cms => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
      ...(initOptions || {}),
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (e: unknown) {
    cached.promise = null;
    throw e;
  }

  return cached.client;
};
