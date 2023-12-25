import path from 'path';
import dotenv from 'dotenv';
import { buildConfig } from 'payload/config';
import { slateEditor } from '@payloadcms/richtext-slate';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { Users } from '../models';

dotenv.config({
  path: path.resolve(__dirname, '../../../../.env'),
});

export default buildConfig({
  collections: [Users],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  routes: {
    admin: '/sell',
  },
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta: {
      titleSuffix: `- `,
      favicon: '/favicon.ico',
      ogImage: '/thumbnail.jpg',
    },
  },
  editor: slateEditor({}), // editor-config
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  typescript: {
    outputFile: path.resolve(__dirname, '../../../types/payload-types.ts'),
  },
});
