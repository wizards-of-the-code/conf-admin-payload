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
          type: 'richText',
          admin: {
            elements: [
              "link",
            ],
            leaves: [
              "bold",
              "italic",
              'underline',
              'strikethrough',
            ],
          },
          required: true,
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
    {
      name: 'links',
      label: 'Ссылки',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};

export default Messages;