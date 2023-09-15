import CountrySelectComponent from "./component";
import { Field } from 'payload/types';


const CountrySelectorField: Field = {
    name: 'country',
    label: 'Страна',
    type: 'text',
    admin: {
        components: {
            Field: CountrySelectComponent,
        },
        width: '30%',
    },
    required: true,
};

export default CountrySelector;