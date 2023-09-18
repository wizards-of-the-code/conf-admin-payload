import { CollectionConfig } from 'payload/types';

const WBFooters: CollectionConfig = {
  slug: 'wb-chat-footers',
  labels: {
    singular: 'Footer',
    plural: 'Footers',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Welcome Bot',
    defaultColumns: [
      'name',
      'message',
    ],
  },
  fields: [
    {
      name: 'name',
      label: 'Название',
      type: 'text',
    },
    {
      name: 'message',
      label: 'Сообщение',
      type: 'text',
    },
  ],
};

export default WBFooters;