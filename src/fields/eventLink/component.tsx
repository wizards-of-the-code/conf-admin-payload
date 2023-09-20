import React, { FC } from 'react';
import { useDocumentInfo } from 'payload/components/utilities';
import handleCopyLink from './handleCopyLink';

const EventLinkComponent: FC<{ path: string }> = ({ path }) => {
  const { id } = useDocumentInfo();

  return (
    <div>
      <button
        type="button"
        className="btn btn--style-secondary btn--icon-style-without-border btn--size-medium btn--icon-position-right"
        onClick={() => handleCopyLink(id)}>
        Скопировать ссылку на мероприятие
      </button>
    </div>
  );
};

export default EventLinkComponent;