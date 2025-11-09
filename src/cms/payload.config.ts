import { buildConfig } from 'payload/config';
import path from 'path';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { slateEditor } from '@payloadcms/richtext-slate';

// Collections
import { Users } from './collections/Users';
import { Quizzes } from './collections/Quizzes';
import { Assessments } from './collections/Assessments';
import { Videos } from './collections/Videos';
import { Media } from './collections/Media';
import { Studies } from './collections/Studies';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  admin: {
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- Thinkable CMS',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  editor: slateEditor({}),
  collections: [Users, Quizzes, Assessments, Videos, Media, Studies],
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Hebrew',
        code: 'he',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/thinkable',
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
