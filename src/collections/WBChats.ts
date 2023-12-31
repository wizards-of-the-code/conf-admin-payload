import { CollectionConfig } from 'payload/types';

const WBChats: CollectionConfig = {
  slug: 'wb-chat-settings',
  labels: {
    singular: 'Чат',
    plural: 'Чаты',
  },
  admin: {
    useAsTitle: 'chatTitle',
    group: 'Welcome Bot',
    defaultColumns: [
      'chatTitle',
      'message',
    ],
  },
  fields: [
    {
      name: 'chatTitle',
      label: 'Название чата',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      label: 'Сообщение',
      type: 'textarea',
    },
    {
      name: 'footer',
      label: 'Footer',
      type: 'relationship',
      relationTo: 'wb-chat-footers',
      hasMany: false,
      admin: {
        allowCreate: false,
      }
    },
  ],
};

export default WBChats;
