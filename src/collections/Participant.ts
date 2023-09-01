import { CollectionConfig } from 'payload/types';

const Participants: CollectionConfig = {
  slug: 'participants',
  labels: {
    singular: 'Участник',
    plural: 'Участники',
  },
  admin: {
    group: 'Конференции',
  },
  fields: [
    {
      name: 'tg',
      type: 'group',
      interfaceName: "Telegram",
      fields: [
        {
          name: 'tg_id',
          type: 'number',
          required: true,
          custom: {
            name: 'tg_id',
            value: ({ data }) => data?.tg_id || 'Untitled',
          }
        },
        {
          name: 'username',
          type: 'text',
        },
        {
          name: 'first_name',
          type: 'text',
        },
        {
          name: 'last_name',
          type: 'text',
        },
      ]
    },
    {
      name: 'events',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
      admin: {
        allowCreate: false,
      }
    }
  ],
};

export default Participants;