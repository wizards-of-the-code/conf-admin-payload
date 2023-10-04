import React, { FC, useEffect, useState } from 'react';
import { SelectInput, useField } from 'payload/components/forms';

const PaymentMethodSelectComponent: FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = useState([]);

  // Fetch options on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(
          `http://${process.env.PAYLOAD_PUBLIC_CMS_URL}:${process.env.PAYLOAD_PUBLIC_NGINX_PORT}/api/payment-methods`
        );
        const data = await response.json();

        const paymentOptions = data.docs.map((item) => {
          return {
            label: `${item.source} ( ${item.currency} )`,
            value: item.id,
          };
        });

        setOptions(
          paymentOptions.sort((a, b) => a.label.localeCompare(b.label))
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOptions();
  }, []);

  return (
    <div>
      <label className="field-label">Способ оплаты</label>
      <SelectInput
        path={path}
        name={path}
        options={options}
        value={value}
        onChange={(e) => setValue(e.value)}
      />
    </div>
  );
};

export default PaymentMethodSelectComponent;
