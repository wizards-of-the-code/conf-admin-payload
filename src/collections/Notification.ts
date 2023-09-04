import { CollectionConfig } from 'payload/types';

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
      'text',
      'datetime_to_send',
      'images',
    ],
  },
  fields: [
    {
      name: 'is_active',
      type: 'checkbox',
    },
    {
      name: 'title',
      label: 'Название',
      type: 'text',
    },
    {
      name: 'event_id',
      label: 'Конференция',
      type: 'relationship',
      relationTo: 'events',
    },
    {
      name: 'type',
      label: 'Тип',
      type: 'select',
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
      type: 'textarea',
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
      name: 'photos_on_top',
      type: 'checkbox',
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
        }
      }
    },
    {
      name: 'days_until_conf',
      type: 'number',
    },
  ],
};

export default Notifications;