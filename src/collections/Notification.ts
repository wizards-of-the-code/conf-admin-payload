import { CollectionBeforeChangeHook, CollectionConfig } from 'payload/types';
import dateValidation from '../utils/dateValidation';

const addCreationData: CollectionBeforeChangeHook = async ({ 
  data, 
  req, 
  operation, 
  originalDoc, 
}) => {
  // add the generated simulation inside the data that will be saved to database
  if(operation === 'create') {
    data.sent = null;
  }

  // return the data
  return data;
};

const Notifications: CollectionConfig = {
  slug: 'notifications',
  labels: {
    singular: 'Рассылка',
    plural: 'Рассылки',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Конференции',
    defaultColumns: [
      'title',
      'is_active',
      'event_id',
      'type',
      'datetime_to_send',
      'sent',
      'images',
    ],
  },
  fields: [
    {
      name: 'is_active',
      label: 'Активно',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'title',
      label: 'Название',
      type: 'text',
      required: true,
    },
    {
      name: 'event_id',
      label: 'Конференция',
      type: 'relationship',
      relationTo: 'events',
      required: true,
    },
    {
      name: 'type',
      label: 'Тип',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Automatic',
          value: 'auto',
        },
        {
          label: 'Manual',
          value: 'manual',
        },
      ]
    },
    {
      name: 'text',
      label: 'Текст сообщения',
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
    {
      name: 'links',
      label: 'Ссылки',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    {
      name: 'images',
      label: 'Картинки',
      type: 'array',
      fields: [
        {
          name: "media_id",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      label: 'Картинки сверху',
      name: 'images_on_top',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'sent',
      label: 'Отправлено',
      type: 'date',
      admin: {
        readOnly: true,
        date: {
          displayFormat: 'dd.MM.yyyy HH:mm',
          timeFormat: 'HH:mm',
          pickerAppearance: 'dayAndTime',
        }
      }
    },
    {
      name: 'datetime_to_send',
      label: 'Запланированная дата и время отправки',
      type: 'date',
      admin: {
        date: {
          displayFormat: 'dd.MM.yyyy HH:mm',
          timeFormat: 'HH:mm',
          pickerAppearance: 'dayAndTime',
        },
        condition: (data) => {
          if (data.type === 'manual') {
            return true;
          } else {
            return false;
          }
        }

      },
      validate: dateValidation,
    },
    {
      name: 'days_until_conf',
      label: 'Дней до конференции',
      type: 'number',
      admin: {
        condition: (data) => {
          if (data.type === 'auto') {
            return true;
          } else {
            return false;
          }
        }
      }
    },
  ],
  hooks: {
    beforeChange: [
      addCreationData,
    ],
  },
};

export default Notifications;