import { CollectionConfig } from 'payload/types';

const WBFooters: CollectionConfig = {
  slug: 'wb-chat-footers',
  labels: {
    singular: 'Футер',
    plural: 'Футеры',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Welcome Bot',
    defaultColumns: [
      'title',
      'message',
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Название',
      type: 'text',
    },
    {
      name: 'message',
      label: 'Сообщение',
      type: 'textarea',
    },
  ],
};

export default WBFooters;
