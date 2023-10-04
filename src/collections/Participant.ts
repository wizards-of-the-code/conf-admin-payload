import { CollectionConfig } from 'payload/types';
import { useEffect, useState } from 'react';
import formatDateToDdMmYyyy from '../utils/dateFormat';
import ContactUserButtonField from '../fields/contactButton/field';
import getUsername from '../hooks/getUsername';
import PaymentMethodSelectComponent from '../fields/paymentMethodSelector/component';

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
    ContactUserButtonField,
    {
      name: 'tg',
      label: 'Пользователь',
      type: 'group',
      interfaceName: "Telegram",
      fields: [
        {
          name: 'tg_id',
          label: 'Telegram ID',
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
      type: 'array',
      fields: [
        {
          name: 'event_id',
          label: 'Конференция',
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
        {
          name: 'sum',
          label: 'Оплаченная сумма',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Комментарий',
          type: 'text',
        },
        {
          name: 'payment_date',
          label: 'Дата платежа',
          type: 'date',
          admin: {
            date: {
              displayFormat: 'dd.MM.yyyy',
            }
          },
        },
        {
          name: 'payment_method',
          label: 'Способ оплаты',
          type: 'text',
          admin: {
            components: {
              Field: PaymentMethodSelectComponent,
            }
          }
        }
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: ({ data, index = 0 }) => {
            const [label, setLabel] = useState('');
      
            useEffect(() => {
              fetch(
                `http://${process.env.PAYLOAD_PUBLIC_CMS_URL}:${process.env.PAYLOAD_PUBLIC_NGINX_PORT}/api/events/${data.event_id}`
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