import countrySelectComponent from "./component";
import { Field } from 'payload/types';


const CountrySelector: Field = {
    name: 'country',
    label: 'Страна',
    type: 'text',
    admin: {
        components: {
            Field: countrySelectComponent,
            width: '30%',
        }
    },
};

export default CountrySelector;