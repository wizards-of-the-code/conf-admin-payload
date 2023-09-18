import { CollectionConfig } from 'payload/types';

const WBFooter: CollectionConfig = {
  slug: 'welcome-bot_footer',
  labels: {
    singular: 'Footer',
    plural: 'Footers',
  },
  admin: {
    useAsTitle: 'message',
    group: 'Welcome Bot',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'message',
      label: 'Сообщение',
      type: 'text',
    },
  ],
};

export default WBFooter;