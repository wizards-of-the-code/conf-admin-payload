import dateValidation from '../utils/dateValidation';
import { CollectionConfig, FieldHook } from 'payload/types';
import CurrencySelectField from '../fields/currencySelector/field';
import CountrySelectorField from '../fields/countrySelector/field';

const addUTCOffset: FieldHook = async ({
  value,
}) => {
  const date: Date = new Date(value);
  const offset = new Date().getTimezoneOffset() / 60;
  date.setHours(date.getHours() + offset);

  return date;
};

const removeUTCOffset: FieldHook = async ({
  value,
}) => {
  const date: Date = new Date(value);
  const offset = new Date().getTimezoneOffset() / 60;
  date.setHours(date.getHours() - offset);

  return date;
};

const validatePrice = async (inputValue) => {
  const value = parseFloat(inputValue);
  if (!isNaN(value) && value >= 0) {
    return true;
  }
  return 'Введите числовое значение больше 0';
}

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
      defaultValue: false,
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
          name: 'date',
          label: 'Время',
          type: 'date',
          required: true,
          admin: {
            date: {
              displayFormat: 'HH:mm',
              pickerAppearance: 'timeOnly',
              timeFormat: 'HH:mm',
            }
          },
          validate: dateValidation,
          hooks: {
            beforeChange: [
              removeUTCOffset,
            ],
            afterRead: [
              addUTCOffset,
            ]
          },
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