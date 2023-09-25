import { CollectionConfig } from 'payload/types';

const Currencies: CollectionConfig = {
  slug: 'currencies',
  labels: {
    singular: 'Валюта',
    plural: 'Валюты',
  },
  auth: false,
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
      required: true,
    },
    {
      name: 'sign',
      label: 'Знак',
      type: 'text',
      required: true,
    },
  ]
};

export default Currencies;