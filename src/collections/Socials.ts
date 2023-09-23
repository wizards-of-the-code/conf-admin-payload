import { CollectionConfig } from 'payload/types';

const Socials: CollectionConfig = {
  slug: 'socials',
  labels: {
    singular: 'Социальная сеть',
    plural: 'Социальные сети',
  },
  auth: false,
  admin: {
    useAsTitle: 'name',
    group: 'Настройки',
    defaultColumns: [
      'name',
      'url',
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
      name: 'url',
      label: 'Ссылка',
      type: 'text',
    },
  ]
};

export default Socials;
