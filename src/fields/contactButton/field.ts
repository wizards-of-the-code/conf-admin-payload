import { Field } from 'payload/types';
import ContactUserButtonComponent from './component';

const ContactUserButtonField: Field = {
  name: "contactUserButton",
  type: "ui",
  admin: {
    position: 'sidebar',
    components: {
      Field: ContactUserButtonComponent,
    },
  },
};

export default ContactUserButtonField;
