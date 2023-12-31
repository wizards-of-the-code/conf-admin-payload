import React, { FC, useEffect, useState } from 'react';
import { SelectInput, useField } from 'payload/components/forms';

const CurrencySelectComponent: FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = useState([]);

  // Fetch options on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`http://${process.env.PAYLOAD_PUBLIC_CMS_URL}:${process.env.PAYLOAD_PUBLIC_NGINX_PORT}/api/currencies`);
        const data = await response.json();

        const currencyOptions = data.docs.map((item) => {
          return {
            label: `${item.name} ( ${item.sign} )`,
            value: item.sign,
          };
        });

        setOptions(currencyOptions.sort(
          (a, b) => a.label.localeCompare(b.label)
        ));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOptions();
  }, []);



  return (
    <div>
      <label className='field-label'>
        Валюта
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
};

export default CurrencySelectComponent;