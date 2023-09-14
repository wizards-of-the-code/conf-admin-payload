import React, { FC, useEffect, useState } from 'react';
import { SelectInput, useField } from 'payload/components/forms';

// Create an array of country options in the format required by Payload CMS
// const countrySelectComponent = Object.keys(isoCountries.getNames('ru')).map((code) => ({
//   value: code,
//   label: isoCountries.getName(code, 'ru'),
// }));

const countrySelectComponent: FC<{ path: string }> = ({ path }) => {
    const isoCountries = require('i18n-iso-countries');
    isoCountries.registerLocale(require('i18n-iso-countries/langs/ru.json')); // Load Russian locale

}

export default countrySelectComponent;