import { CollectionConfig } from 'payload/types';

const Messages: CollectionConfig = {
  slug: 'messages',
  labels: {
    singular: 'Сообщение',
    plural: 'Сообщения',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Настройки',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      label: 'Сообщения',
      name: 'messageList',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'textarea',
        },
      ],
    },
    {
      label: 'Картинки',
      name: 'images',
      type: 'array',
      fields: [
        {
          name: "media_id",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
  ],
};

export default Messages;