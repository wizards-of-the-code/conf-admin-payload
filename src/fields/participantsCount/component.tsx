import React, { FC, useEffect, useState } from 'react';
import { useDocumentInfo } from 'payload/components/utilities';
import { Tooltip } from 'react-tooltip';

const ParticipantsCountComponent: FC<{ path: string }> = ({ path }) => {
  const { id } = useDocumentInfo();
  const [count, setCount] = useState(0);
  const [paid, setPaid] = useState(0);
  const [refund, setRefund] = useState(0);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(
          `http://${process.env.PAYLOAD_PUBLIC_CMS_URL}:${process.env.PAYLOAD_PUBLIC_NGINX_PORT}/api/custom/events/${id}`
        );
        const data = await response.json();

        if (data.paid) {
          setPaid(data.paid);
        }

        if (data.count) {
          setCount(data.count);
        }

        if (data.refund) {
          setRefund(data.refund);
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
      <span className="participants-cell">
        <Tooltip id="tooltip-participants" />
        <span
          className="registred-span"
          data-tooltip-id="tooltip-participants"
          data-tooltip-content="Регистрации"
        >
          {count}
        </span>
        <span
          className="paid-span"
          data-tooltip-id="tooltip-participants"
          data-tooltip-content="Оплаты"
        >
          {paid}
        </span>
        <span
          className="refund-span"
          data-tooltip-id="tooltip-participants"
          data-tooltip-content="Возвраты"
        >
          {refund}
        </span>
      </span>
    </div>
  );
};

export default ParticipantsCountComponent;
