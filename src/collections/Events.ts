import dateValidation from '../utils/dateValidation';
import validateTime from '../utils/validateTime';
import validatePrice from '../utils/validatePrice';
import { CollectionConfig, FieldHook } from 'payload/types';
import CurrencySelectField from '../fields/currencySelector/field';
import CountrySelectorField from '../fields/countrySelector/field';
import EventLinkField from '../fields/eventLink/field';

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
    EventLinkField,
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
          //validate: dateValidation,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'is_active',
          label: 'Активная',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'is_finished',
          label: 'Завершена',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'description',
      label: 'Описание',
      type: 'richText',
      admin: {
        elements: [
          "link",
        ],
        leaves: [
          "bold",
          "italic",
          'underline',
          'strikethrough',
        ],
      },
    },
    {
      name: 'link',
      label: 'Ссылка на сайт мероприятия',
      type: 'text'
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
            CountrySelectorField,
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
      type: 'row',
      fields: [
        {
          name: 'current_price',
          label: 'Цена билета',
          type: 'text',
          admin: {
            width: '30%',
          },
          validate: validatePrice,
        },
        {
          name: 'partner_price',
          label: 'Цена билета за +1',
          type: 'text',
          admin: {
            width: '30%',
          },
          validate: validatePrice,
        },
        CurrencySelectField,
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
          name: 'time',
          label: 'Время',
          type: 'text',
          validate: validateTime,
          required: true,
        },
        {
          name: 'title',
          label: 'Событие',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: ({ data, index = 0 }) => {
            return data ? `${data.time} - ${data.title}` : 'undefined';
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
          type: 'richText',
          admin: {
            elements: [
              "link",
            ],
            leaves: [
              "bold",
              "italic",
              'underline',
              'strikethrough',
            ],
          },
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
      label: 'Участники',
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