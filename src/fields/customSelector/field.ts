import { Field } from 'payload/types';
import { CustomSelectComponent } from './component';

const CustomSelectField: Field = {
  name: 'customSelectField',
  type: 'text',
  admin: {
    components: {
      Field: CustomSelectComponent,
    },
  }
}

export default CustomSelectField;