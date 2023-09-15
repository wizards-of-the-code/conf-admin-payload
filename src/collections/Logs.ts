import { CollectionConfig } from 'payload/types';
import getLogInitiator from '../hooks/getLogInitiator';

const Logs: CollectionConfig = {
  slug: 'logs',
  admin: {
    group: 'Системные данные',
    defaultColumns: [
      'datetime',
      'username',
      'status',
      'message',
    ],
  },
  labels: {
    singular: 'Лог',
    plural: 'Логи',
  },
  fields: [
    {
      name: 'datetime',
      label: 'Время',
      type: 'date',
      admin: {
        date: {
          displayFormat: 'dd.MM.yyyy HH:mm:ss',
        }
      }
    },
    {
      name: 'initiator',
      type: 'group',
      interfaceName: "Initiator",
      fields: [
        {
          name: 'id',
          type: 'number',
        },
        {
          name: 'name',
          type: 'text',
        },
      ]
    },
    {
      name: 'status',
      label: 'Статус',
      type: 'text'
    },
    {
      name: 'message',
      label: 'Сообщение',
      type: 'text'
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
        afterRead: [getLogInitiator],
      },
    }
  ],
};

export default Logs;