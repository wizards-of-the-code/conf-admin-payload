import { Field } from 'payload/types';
import CurrencySelectComponent from './component';

const CurrencySelectField: Field = {
  name: 'currency',
  label: 'Валюта',
  type: 'text',
  admin: {
    components: {
      Field: CurrencySelectComponent,
    },
    width: '30%',
  }
}

export default CurrencySelectField;