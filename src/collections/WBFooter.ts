import { CollectionConfig } from 'payload/types';

const WBFooter: CollectionConfig = {
  slug: 'welcome-bot_footer',
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

export default WBFooter;