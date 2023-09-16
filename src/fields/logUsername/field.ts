import { Field } from 'payload/types';
import LogUsernameCell from './cell';
import getLogInitiator from '../../hooks/getLogInitiator';

const LogUsernameField: Field = {
  name: 'username',
  label: 'Пользователь',
  type: 'text',
  access: {
    create: () => false,
    update: () => false,
  },
  admin: {
    components: {
      Cell: LogUsernameCell,
    },
  },
  hooks: {
    beforeChange: [
      ({ siblingData }) => {
        // Ensures data is not stored in DB
        delete siblingData['username'];
      }
    ],
    afterRead: [getLogInitiator],
  },
}

export default LogUsernameField;