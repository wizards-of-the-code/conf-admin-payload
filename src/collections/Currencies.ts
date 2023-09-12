import { CollectionConfig } from 'payload/types';

const Currencies: CollectionConfig = {
  slug: 'currencies',
  labels: {
    singular: 'Валюта',
    plural: 'Валюты',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Настройки',
    defaultColumns: [
      'name',
      'sign',
    ],
  },
  timestamps: false,
  fields: [
    {
      name: 'name',
      label: 'Название',
      type: 'text',
    },
    {
      name: 'sign',
      label: 'Знак',
      type: 'text',
    },
  ]
};

export default Currencies;