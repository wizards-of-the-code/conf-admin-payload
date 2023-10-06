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
      <div className="field-header">
        <h3>Участники</h3>
        <a href="#participants">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="currentColor"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
          </svg>
        </a>
      </div>
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
