import { CollectionBeforeChangeHook, CollectionConfig } from 'payload/types';
import CustomButtonComponent from '../components/custom-button/CustomButton';

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
      name: "myCustomUIField", // required
      type: "ui", // required
      admin: {
        position: 'sidebar',
        components: {
          Field: CustomButtonComponent,
        },
      },
    },
    {
      name: 'is_active',
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
      type: 'textarea',
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
        }
      }
    },
    {
      name: 'days_until_conf',
      type: 'number',
    },
  ],
  hooks: {
    beforeChange: [
      addCreationData,
    ],
  },
};

export default Notifications;