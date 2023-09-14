import { CollectionConfig, FieldHook } from 'payload/types';
import { useEffect, useState } from 'react';
import formatDateToDdMmYyyy from '../utils/dateFormat';

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
          type: 'number',
          required: true,
        },
        {
          name: 'username',
          type: 'text',
          required: true,
        },
        {
          name: 'first_name',
          type: 'text',
        },
        {
          name: 'last_name',
          type: 'text',
        },
      ],
    },
    {
      name: 'events',
      label: 'Конференции',
      type: 'array',
      fields: [
        {
          name: 'event_id',
          type: 'relationship',
          relationTo: 'events',
          hasMany: false,
          admin: {
            allowCreate: false,
            readOnly: true,
          },
        },
        {
          name: 'role',
          label: 'Роль',
          type: 'text',
          required: true,
        },
        {
          name: 'is_payed',
          label: 'Оплачено',
          type: 'checkbox',
          required: true,
        },
        {
          name: 'attended',
          label: 'Присутствовал(а) на конфе',
          type: 'checkbox',
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: ({ data, index = 0 }) => {
            const [label, setLabel] = useState('');
      
            useEffect(() => {
              fetch(
                `http://${PAYLOAD_PUBLIC_CMS_URL}:${PAYLOAD_PUBLIC_NGINX_PORT}/api/events/${data.event_id}`
              ).then(async (res) => {
                const event = await res.json();

                setLabel(`${event.name}${event.datetime ? ` - ${formatDateToDdMmYyyy(event.datetime)}` : ''}`);
              })
            }, []);
      
            return label;
          },
        },
      },
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