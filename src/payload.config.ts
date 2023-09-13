import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Events from './collections/Events';
import Participants from './collections/Participant';
import Logs from './collections/Logs';
import Messages from './collections/Messages';
import Notifications from './collections/Notification';
import Media from './collections/Media';
import { relationshipsAsObjectID } from '@payloadcms/plugin-relationship-object-ids';
import Currencies from './collections/Currencies';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, written in bytes
    },
  },
  collections: [
    Events,
    Participants,
    Users,
    Messages,
    Currencies,
    Notifications,
    Logs,
    Media
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    relationshipsAsObjectID()
  ]
});
