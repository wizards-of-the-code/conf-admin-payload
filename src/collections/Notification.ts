import payload from "payload";
import { CollectionBeforeChangeHook, CollectionConfig } from 'payload/types';
import dateValidation from '../utils/dateValidation';
import PlannedDatetimeField from "../fields/plannedDatetime/field";

const addCreationData: CollectionBeforeChangeHook = async ({ 
  data, 
  req, 
  operation, 
  originalDoc, 
}) => {
  if(operation === 'create') {
    data.sent = null;
  }

  return data;
};

const setCorrectDateHook: CollectionBeforeChangeHook = async ({
  data, // incoming data to update or create with
  req, // full express request
  operation, // name of the operation ie. 'create', 'update'
  originalDoc, // original document
}) => {

  if(data.type === 'auto') {
    // Request 
    const event = await payload.findByID({
      collection: 'events',
      id: data.event_id,
    });

    if(!event) {
      return data;
    }

    // Set "date to send" with correction of days_until_conf field
    const eventDate: Date = new Date(new Date(event.datetime).setUTCHours(12, 0, 0, 0));
    data.datetime_to_send = new Date(eventDate).setDate(eventDate.getDate() - data.days_until_conf);
  }

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
      'planned_datetime',
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
        },
        description: 'За какое количество дней до конференции должно быть разослано данное сообщение.',
      }
    },
    PlannedDatetimeField,
  ],
  hooks: {
    beforeChange: [
      addCreationData,
      setCorrectDateHook,
    ],
  },
};

export default Notifications;