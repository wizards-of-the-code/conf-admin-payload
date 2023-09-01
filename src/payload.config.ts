import { buildConfig } from 'payload/config';
import path from 'path';
import { payloadCloud } from '@payloadcms/plugin-cloud';
import Users from './collections/Users';
import Events from './collections/Events';
import Participants from './collections/Participant';
import Log from './collections/Log';

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Events,
    Participants,
    Users,
    Log
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    payloadCloud()
  ]
});
