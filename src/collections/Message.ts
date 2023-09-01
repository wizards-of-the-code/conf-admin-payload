import { CollectionConfig } from 'payload/types';

const Message: CollectionConfig = {
  slug: 'messages',
  admin: {
    group: 'Настройки',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      label: 'Сообщения',
      name: 'value',
      type: 'array',
      fields: [
        {
          name: 'message',
          type: 'text'
        },
      ],
    },
  ],
};

export default Message;