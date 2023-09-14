import React from 'react';
import { useFormFields } from 'payload/components/forms';

const ContactUserButtonComponent = () => {

  const username = useFormFields(([fields, dispatch]) => fields['tg.username'].value);

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    window.open(`https://t.me/${username}`, '_blank');
  };

  return (
    <div>
      {
        username ? (
          <button 
            className="btn btn--style-secondary btn--icon-style-without-border btn--size-medium btn--icon-position-right"
            onClick={handleClick}>
            Свзязаться с @{username.toString()}
          </button>
        ) : ''
      }
    </div>
  );
};

export default ContactUserButtonComponent;