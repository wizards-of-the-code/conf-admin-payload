import { Field } from 'payload/types';
import LinksCell from './cell';
import EmptyField from '../emptyField/component';

const LinksField: Field = {
  name: 'links',
  type: 'text',
  label: 'Ссылки',
  admin: {
    position: 'sidebar',
    components: {
      Cell: LinksCell,
      Field: EmptyField,
    },
  },
  hooks: {
    beforeChange: [
      ({ siblingData }) => {
        // Ensures data is not stored in DB
        delete siblingData['links'];
      }
    ],
  },
}

export default LinksField;