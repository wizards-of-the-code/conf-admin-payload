import ParticipantsListComponent from "./component";
import { Field } from 'payload/types';


const ParticipantsListField: Field = {
  name: 'participants_list',
  type: 'text',
  admin: {
    components: {
      Field: ParticipantsListComponent,
    },
  },
  hooks: {
    beforeChange: [
      ({ siblingData }) => {
        // Ensures data is not stored in DB
        delete siblingData['participants_list'];
      }
    ],
  },
};

export default ParticipantsListField;