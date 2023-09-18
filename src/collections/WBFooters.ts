import { CollectionConfig } from 'payload/types';

const WBFooters: CollectionConfig = {
  slug: 'wb-chat-footers',
  labels: {
    singular: 'Footer',
    plural: 'Footers',
  },
  admin: {
    useAsTitle: 'message',
    group: 'Welcome Bot',
    defaultColumns: ['message'],
  },
  fields: [
    {
      name: 'message',
      label: 'Сообщение',
      type: 'text',
    },
  ],
};

export default WBFooters;
