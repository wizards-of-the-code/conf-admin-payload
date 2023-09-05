import { buildConfig } from 'payload/config';
import path from 'path';
import { payloadCloud } from '@payloadcms/plugin-cloud';
import Users from './collections/Users';
import Events from './collections/Events';
import Participants from './collections/Participant';
import Log from './collections/Log';
import Message from './collections/Message';
import Notifications from './collections/Notification';
import Media from './collections/Media';
import { relationshipsAsObjectID } from '@payloadcms/plugin-relationship-object-ids';

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  upload: {
    staticDir: 'public/uploads',
  },
  collections: [
    Events,
    Participants,
    Users,
    Message,
    Notifications,
    Log,
    Media
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    payloadCloud(),
    relationshipsAsObjectID()
  ]
});
