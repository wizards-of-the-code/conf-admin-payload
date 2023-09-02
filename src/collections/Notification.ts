import { CollectionConfig } from 'payload/types';

const Notifications: CollectionConfig = {
  slug: 'notifications',
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'is_active',
      type: 'checkbox',
    },
    {
      name: 'event_id',
      type: 'relationship',
      relationTo: 'events',
    },
    {
      name: 'type',
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
      type: 'textarea',
    },
    {
      name: 'links',
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
      label: 'Картинки сверху',
      name: 'photos_on_top',
      type: 'checkbox',
    },
    {
      name: 'sent',
      type: 'date',
      admin: {
        date: {
          displayFormat: 'dd.MM.yyyy HH:mm',
          pickerAppearance: 'dayAndTime',
        }
      }
    },
    {
      name: 'datetime_to_send',
      type: 'date',
      admin: {
        date: {
          displayFormat: 'dd.MM.yyyy HH:mm',
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