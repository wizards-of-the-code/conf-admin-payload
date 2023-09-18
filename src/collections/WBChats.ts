import { CollectionConfig } from 'payload/types';

const WBChats: CollectionConfig = {
  slug: 'welcome-bot_chat-settings',
  labels: {
    singular: 'Chat',
    plural: 'Chats',
  },
  admin: {
    useAsTitle: 'message',
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
      relationTo: 'welcome-bot_footer',
      hasMany: false,
      admin: {
        allowCreate: false,
      }
    },
  ],
};

export default WBChats;