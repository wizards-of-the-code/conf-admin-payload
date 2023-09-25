import React, { FC, useEffect, useState } from 'react';
import { SelectInput, useField } from 'payload/components/forms';

const CountrySelectComponent: FC<{ path: string }> = ({ path }) => {
    const { value, setValue } = useField<string>({ path });
    const [options, setOptions] = useState([]);

    const isoCountries = require('i18n-iso-countries');
    isoCountries.registerLocale(require('i18n-iso-countries/langs/ru.json')); 

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countriesList = Object.keys(isoCountries.getNames('ru')).map((code) => ({
                    value: code,
                    label: isoCountries.getName(code, 'ru'),
                }));

                const countriesOptions = countriesList.map((item) => {
                    if (item.label === 'Российская Федерация') {
                        item.label = 'Россия'
                    }
                    
                    return {
                        label: `${item.label}`,
                        value: item.label,
                    }
                });

                setOptions(countriesOptions);
            } catch (error) {
                console.log('error');
            }
        }

        fetchCountries();
    }, []);
    return (
        <div>
            <label className='field-label'>
                Страна
            </label>
            <SelectInput
                path={path}
                name={path}
                options={options}
                value={value}
                onChange={(e) => setValue(e.value)}
            />
        </div>
    )
}

export default CountrySelectComponent;