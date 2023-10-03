import React, { FC, useEffect, useState } from 'react';
import { useDocumentInfo } from 'payload/components/utilities';

const ParticipantsCountComponent: FC<{ path: string }> = ({ path }) => {
  const { id } = useDocumentInfo();
  const [count, setCount] = useState(0);
  const [paid, setPaid] = useState(0);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(
          `http://${process.env.PAYLOAD_PUBLIC_CMS_URL}:${process.env.PAYLOAD_PUBLIC_NGINX_PORT}/api/custom/events/${id}`
        );
        const data = await response.json();

        if(data.paid) {
          setPaid(data.paid);
        }
        
        if(data.count) {
          setCount(data.count);
        }

      } catch (error) {
        console.log('error');
      }
    };

    fetchParticipants();
  }, []);

  return (
    <div>
      <h3>Участники</h3>
      <div><b>{count}</b> / <b>{paid}</b></div>
    </div>
  );
};

export default ParticipantsCountComponent;