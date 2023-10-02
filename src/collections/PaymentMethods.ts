import { CollectionConfig } from 'payload/types';

const PaymentMethods: CollectionConfig = {
  slug: 'payment-methods',
  labels: {
    singular: 'Способ оплаты',
    plural: 'Способы оплаты',
  },
  auth: false,
  admin: {
    useAsTitle: 'source',
    group: 'Настройки',
    defaultColumns: [
      'source',
      'currency',
    ],
  },
  timestamps: false,
  fields: [
    {
      name: 'source',
      label: 'Источник',
      type: 'text',
      required: true,
      admin: {
        description: 'Например: Банк, Крипта, Наличные',
      }
    },
    {
      name: 'currency',
      label: 'Валюта',
      type: 'text',
      required: true,
    },
  ]
};

export default PaymentMethods;