import path from 'path';
import dotenv from 'dotenv';
import { buildConfig } from 'payload/config';
import { slateEditor } from '@payloadcms/richtext-slate';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { Categories, Media, Orders, Products, Users } from './server/db/models';
import { SITE_NAME } from './constants/global';
import { mongooseAdapter } from '@payloadcms/db-mongodb';

dotenv.config({
  path: path.resolve(__dirname, '../../../../.env'),
});

export default buildConfig({
  collections: [Users, Products, Categories, Media, Orders],
  db: args => {
    const baseAdapter = mongooseAdapter({
      url: process.env.DATABASE_URI!,
    })(args);
    baseAdapter.beginTransaction = async () => null;
    return baseAdapter;
  },
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
  // plugins: [cloudinaryPlugin()],
  editor: slateEditor({
    admin: {
      elements: ['h1', 'h2', 'h3', 'h4', 'link', 'blockquote', 'ol', 'ul'],
      leaves: ['bold', 'italic', 'strikethrough', 'underline', 'code'],
      link: {
        fields: [
          {
            name: 'rel',
            label: 'Rel Attribute',
            type: 'select',
            hasMany: true,
            options: ['noopener', 'noreferrer', 'nofollow'],
          },
        ],
      },
    },
  }), // editor-config
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
});
