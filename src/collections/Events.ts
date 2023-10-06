import validateTime from '../utils/validateTime';
import validatePrice from '../utils/validatePrice';
import { CollectionConfig } from 'payload/types';
import CurrencySelectField from '../fields/currencySelector/field';
import CountrySelectorField from '../fields/countrySelector/field';
import EventLinkField from '../fields/eventLink/field';
import ParticipantsListField from '../fields/participantsList/field';
import ParticipantsCountField from '../fields/participantsCount/field';
import PriceCell from '../fields/price/cell';
import LinksField from '../fields/links/field';
import TitleCell from '../fields/eventTitle/cell';

const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Конференция',
    plural: 'Конференции',
  },
  admin: {
    defaultColumns: [
      'name',
      'datetime',
      'current_price',
      'partner_price',
      'participants_count',
      'links',
      'event_link',
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
          admin: {
            components: {
              Cell: TitleCell,
            },
          },
        },
        {
          name: 'datetime',
          label: 'Дата проведения',
          type: 'date',
          admin: {
            date: {
              displayFormat: 'dd.MM.yyyy',
            },
          },
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
        elements: ['link'],
        leaves: ['bold', 'italic', 'underline', 'strikethrough'],
      },
    },
    {
      name: 'link',
      label: 'Ссылка на сайт мероприятия',
      type: 'text',
    },
    {
      name: 'location',
      label: 'Место проведения',
      type: 'group',
      interfaceName: 'Location',
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
      ],
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
            components: {
              Cell: PriceCell,
            },
          },
          validate: validatePrice,
        },
        {
          name: 'partner_price',
          label: 'Цена для партнёра',
          type: 'text',
          admin: {
            width: '30%',
            components: {
              Cell: PriceCell,
            },
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
            elements: ['link'],
            leaves: ['bold', 'italic', 'underline', 'strikethrough'],
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
        condition: () => false,
      },
    },
    ParticipantsListField,
    ParticipantsCountField,
    LinksField,
  ],
};

export default Events;
