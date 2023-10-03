import { Field } from 'payload/types';
import ParticipantsCountComponent from './component';
import ParticipantsCountCell from './cell';

const ParticipantsCountField: Field = {
  name: 'participants_count',
  type: 'text',
  label: 'Участники',
  admin: {
    position: 'sidebar',
    components: {
      Cell: ParticipantsCountCell,
      Field: ParticipantsCountComponent,
    }
  },
  hooks: {
    beforeChange: [
      ({ siblingData }) => {
        // Ensures data is not stored in DB
        delete siblingData['participants_count'];
      }
    ],
  },
}

export default ParticipantsCountField;