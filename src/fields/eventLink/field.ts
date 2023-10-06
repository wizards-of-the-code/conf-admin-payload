import { Field } from 'payload/types';
import EventLinkCell from './cell';
import EventLinkComponent from './component';

const EventLinkField: Field = {
  name: 'event_link',
  label: ' ',
  type: 'text',
  access: {
    create: () => false,
    update: () => false,
  },
  admin: {
    position: 'sidebar',
    components: {
      Field: EventLinkComponent,
      Cell: EventLinkCell,
    },
  },
  hooks: {
    beforeChange: [
      ({ siblingData }) => {
        // Ensures data is not stored in DB
        delete siblingData['event_link'];
      },
    ],
  },
};

export default EventLinkField;
