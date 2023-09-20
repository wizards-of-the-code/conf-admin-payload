import React, { FC } from 'react';
import { useDocumentInfo } from 'payload/components/utilities';

const EventLinkComponent: FC<{ path: string }> = ({ path }) => {
  const { id } = useDocumentInfo();

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // Copy the text inside the text field
    navigator.clipboard.writeText(`https://t.me/ConfMerchantBot?start=${id}`);
  };

  return (
    <div>
      <button 
        className="btn btn--style-secondary btn--icon-style-without-border btn--size-medium btn--icon-position-right"
        onClick={handleClick}>
        Copy link
      </button>
    </div>
  );
};

export default EventLinkComponent;