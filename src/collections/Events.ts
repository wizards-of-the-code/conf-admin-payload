import { CollectionConfig } from 'payload/types';
import dateValidation from '../utils/dateValidation';

const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Конференция',
    plural: 'Конференции',
  },
  admin: {
    defaultColumns: [
      'name',
      'is_active',
      'current_price',
      'partner_price',
      'currency',
      'schedule',
      'datetime',
    ],
    group: 'Конференции',
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          label: 'Название',
          type: 'text',
          required: true,
        },
        {
          name: 'datetime',
          label: 'Дата проведения',
          type: 'date',
          admin: {
            date: {
              displayFormat: 'dd.MM.yyyy',
            }
          },
          validate: dateValidation,
        },
      ],
    },
    {
      name: 'is_active',
      label: 'Активная',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'description',
      label: 'Описание',
      type: 'textarea'
    },
    {
      name: 'location',
      label: 'Место проведения',
      type: 'group',
      interfaceName: "Location",
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'country',
              label: 'Страна',
              type: 'text',
              required: true,
            },
            {
              name: 'city',
              label: 'Город',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'address',
          label: 'Адрес',
          type: 'text',
        },
      ]
    },
    {
      name: 'link',
      label: 'Ссылка',
      type: 'text'
    },
    {
      type: 'row',
      fields: [
        {
          name: 'current_price',
          label: 'Стоимость',
          type: 'text',
          admin: {
            width: '40%',
          },
        },
        {
          name: 'partner_price',
          label: 'Стоимость для партнера',
          type: 'text',
          admin: {
            width: '40%',
          },
        },
        {
          name: 'currency',
          label: 'Валюта',
          type: 'text',
          admin: {
            width: '20%',
          },
        },
      ],
    },
    {
      label: 'Расписание',
      name: 'schedule',
      type: 'array',
      fields: [
        {
          name: 'date',
          label: 'Время',
          type: 'date',
          admin: {
            date: {
              displayFormat: 'HH:mm',
              pickerAppearance: 'dayAndTime',
            }
          },
          validate: dateValidation,
        },
        {
          name: 'title',
          label: 'Название',
          type: 'text'
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: ({ data, index = 0 }) => {
            return data ? `${new Date(data.date).toLocaleTimeString().slice(0, 5)} - ${data.title}` : 'undefined';
          },
        },
      },
    },
    {
      label: 'Спикеры',
      name: 'speakers',
      type: 'array',
      fields: [
        {
          name: 'name',
          label: 'Имя спикера',
          type: 'text',
          required: true,
        },
        {
          name: 'position',
          label: 'Должность спикера',
          type: 'text',
        },
        {
          name: 'topic',
          label: 'Тема доклада',
          type: 'text',
          required: true,
        },
        {
          name: 'topic_description',
          label: 'Описание',
          type: 'textarea',
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: ({ data, index = 0 }) => {
            return data ? `${data.name}: ${data.topic}` : 'undefined';
          },
        },
      },
    },
    {
      name: 'participants',
      label: 'Участники',
      type: 'relationship',
      relationTo: 'participants',
      hasMany: true,
      admin: {
        allowCreate: false,
      }
    },
  ]
};

export default Events;