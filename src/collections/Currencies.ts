import { CollectionConfig } from 'payload/types';

const Currencies: CollectionConfig = {
  slug: 'currencies',
  labels: {
    singular: 'Валюта',
    plural: 'Вылюты',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Настройки',
    defaultColumns: [
      'name',
      'text',
      'sign',
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'flag',
      type: 'text',
    },
    {
      name: 'sign',
      type: 'text',
    },
  ]
};

export default Currencies;