import React, { FC } from 'react';
import { useDocumentInfo } from 'payload/components/utilities';
import { useField } from 'payload/components/forms';

const EventLinkComponent: FC<{ path: string }> = ({ path }) => {
  const { value } = useField<string>({ path });

  return (
    <div>
      <div>Запланированное время отправки (UTC)</div>
      <div><b>{value}</b></div>
    </div>
  );
};

export default EventLinkComponent;