import { CollectionConfig } from 'payload/types';

const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Концеренция',
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
          }
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
      name: 'link',
      label: 'Ссылка на сайт мероприятия',
      type: 'text'
    },
    {
      name: 'location',
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
            },
            {
              name: 'city',
              label: 'Город',
              type: 'text',
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
      type: 'row',
      fields: [
        {
          name: 'current_price',
          label: 'Цена билета',
          type: 'text',
          admin: {
            width: '40%',
          },
        },
        {
          name: 'partner_price',
          label: 'Цена билета за +1',
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
      name: 'tickets_link',
      label: 'Ссылка на билеты',
      type: 'text',
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
              pickerAppearance: 'timeOnly',
              timeFormat: 'HH:mm',
            }
          }
        },
        {
          name: 'title',
          label: 'Событие',
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
      name: 'tg_channel',
      label: 'Групповой чат в Telegram',
      type: 'text',
    },
    {
      name: 'participants',
      type: 'relationship',
      relationTo: 'participants',
      hasMany: true,
      admin: {
        allowCreate: false,
        readOnly: true,
      }
    },
  ]
};

export default Events;