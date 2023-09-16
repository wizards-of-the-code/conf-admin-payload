import { CollectionConfig } from 'payload/types';
import LogUsernameField from '../fields/logUsername/field';

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
    useAsTitle: 'username',
  },
  access: {
    create: () => false,
    update: () => false,
    delete: () => false,
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
      fields: [
        {
          name: 'tg_id',
          label: 'Telegram ID',
          type: 'number',
        },
        {
          name: 'username',
          label: 'Пользователь',
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
    LogUsernameField,
  ],
};

export default Logs;