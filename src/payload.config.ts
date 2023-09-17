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
import { Logo } from './components/Logo';
import WBFooters from './collections/WBFooters';
import WBChats from './collections/WBChats';
import CustomDefaultRoute from './pages/customPage';
import AfterNavLinks from './components/AfterNavLinks';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

export default buildConfig({
  admin: {
    user: Users.slug,
    css: path.resolve(__dirname, 'styles/override.css'),
    components: {
      graphics: {
        Logo: Logo,
        Icon: Logo,
      },
      routes: [
        {
          path: '/custom-default-route',
          Component: CustomDefaultRoute,
        },
      ],
      afterNavLinks: [
        AfterNavLinks,
      ],
    },
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
    Media,
    WBChats,
    WBFooters,
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
