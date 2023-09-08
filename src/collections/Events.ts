import { CollectionConfig } from 'payload/types';

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
      name: 'location',
      type: 'group',
      interfaceName: "Location",
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'country',
              type: 'text',
            },
            {
              name: 'city',
              type: 'text',
            },
          ],
        },
        {
          name: 'address',
          type: 'text',
        },
      ]
    },
    {
      name: 'link',
      type: 'text'
    },
    {
      type: 'row',
      fields: [
        {
          name: 'current_price',
          type: 'text',
          admin: {
            width: '40%',
          },
        },
        {
          name: 'partner_price',
          type: 'text',
          admin: {
            width: '40%',
          },
        },
        {
          name: 'currency',
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
          type: 'date',
          admin: {
            date: {
              displayFormat: 'HH:mm',
              pickerAppearance: 'dayAndTime',
            }
          }
        },
        {
          name: 'title',
          type: 'text'
        },
      ],
      admin: {
        initCollapsed: false,
        components: {
          RowLabel: ({ data, index = 0 }) => {
            return data ? `${new Date(data.date).toLocaleTimeString().slice(0, 5)} - ${data.title}` : 'undefined';
          },
        },
      },
    },
    {
      name: 'participants',
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