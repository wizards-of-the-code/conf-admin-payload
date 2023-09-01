import { CollectionConfig } from 'payload/types';

const Message: CollectionConfig = {
  slug: 'messages',
  admin: {
    useAsTitle: 'name',
    group: 'Настройки',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      label: 'Сообщения',
      name: 'messages',
      type: 'array',
      fields: [
        {
          name: 'msg',
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
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
};

export default Message;