import ParticipantsListComponent from "./component";
import { Field } from 'payload/types';


const ParticipantsListField: Field = {
  name: 'participants_list',
  type: 'text',
  admin: {
    components: {
      Field: ParticipantsListComponent,
    }
  }
};

export default ParticipantsListField;