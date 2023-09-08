import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Настройки',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'tg_username',
      label: 'Telegram Username',
      type: 'text',
    },
  ],
};

export default Users;