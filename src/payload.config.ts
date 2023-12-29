import path from 'path';
import dotenv from 'dotenv';
import { buildConfig } from 'payload/config';
import { slateEditor } from '@payloadcms/richtext-slate';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { Products, Users } from './server/db/models';
import { SITE_NAME } from './constants/global';
import { mongooseAdapter } from '@payloadcms/db-mongodb';

dotenv.config({
  path: path.resolve(__dirname, '../../../../.env'),
});

export default buildConfig({
  collections: [Users, Products],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
  }),
  routes: {
    admin: '/root/admin',
  },
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta: {
      titleSuffix: `- ${SITE_NAME}`,
      favicon: '/favicon.png',
      ogImage: '/thumbnail.jpg',
    },
  },
  editor: slateEditor({}), // editor-config
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
});
