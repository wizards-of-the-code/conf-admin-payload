import React, { FC } from 'react';
import { useDocumentInfo } from 'payload/components/utilities';
import { toast } from 'react-toastify';

const EventLinkComponent: FC<{ path: string }> = ({ path }) => {
  const { id } = useDocumentInfo();

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // Copy the text inside the text field
    navigator.clipboard.writeText(`https://t.me/ConfMerchantBot?start=${id}`);
    toast.success("Ссылка скопирована в буфер обмена!");
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