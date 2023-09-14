import { CollectionConfig, FieldHook } from 'payload/types';

const getUsername: FieldHook = async ({ data }) => {
  return `@${data.tg.username}`;
};

const Participants: CollectionConfig = {
  slug: 'participants',
  labels: {
    singular: 'Участник',
    plural: 'Участники',
  },
  admin: {
    group: 'Конференции',
    useAsTitle: 'username',
    defaultColumns: [
      'username',
      'tg',
      'events',
    ],
  },
  fields: [
    {
      name: 'tg',
      label: 'Пользователь',
      type: 'group',
      interfaceName: "Telegram",
      fields: [
        {
          name: 'tg_id',
          label: 'Телеграм ID',
          type: 'number',
          required: true,
        },
        {
          name: 'username',
          label: 'Username',
          type: 'text',
          required: true,
        },
        {
          name: 'first_name',
          label: 'Имя',
          type: 'text',
        },
        {
          name: 'last_name',
          label: 'Фамилия',
          type: 'text',
        },
      ],
    },
    {
      name: 'events',
      label: 'Конференции',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
      admin: {
        allowCreate: false,
        readOnly: true,
      }
    },
    {
      name: 'username',
      label: 'Пользователь',
      type: 'text',
      access: {
        create: () => false,
        update: () => false,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // Ensures data is not stored in DB
            delete siblingData['username'];
          }
        ],
        afterRead: [getUsername],
      },
    }
  ],
};

export default Participants;