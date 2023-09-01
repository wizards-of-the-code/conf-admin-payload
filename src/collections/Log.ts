import { CollectionConfig } from 'payload/types';

const Log: CollectionConfig = {
  slug: 'log',
  admin: {
    group: 'Системные данные',
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
          displayFormat: 'dd.MM.yyyy mm:ss',
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
      name: 'event',
      type: 'text'
    },
    {
      name: 'message',
      type: 'text'
    },
  ],
};

export default Log;