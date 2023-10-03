import { Participant, ParticipantEventData, PaymentMethod } from './types';

import React, { useState, useEffect } from 'react';
import ParticipantCard from './ParticipantCard';

type Props = {
  items: Participant[];
  eventId: string | number;
};

function ParticipantsList({ items, eventId }: Props) {
  const [paymentOptions, setPaymentOptions] = useState([]);

  // Side effects
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(
          `http://${process.env.PAYLOAD_PUBLIC_CMS_URL}:${process.env.PAYLOAD_PUBLIC_NGINX_PORT}/api/payment-methods`
        );
        const data = await response.json();

        const currencyOptions = data.docs.map((item: PaymentMethod) => {
          return {
            label: `${item.source} ( ${item.currency} )`,
            value: item.id,
          };
        });

        setPaymentOptions(
          currencyOptions.sort((a, b) => a.label.localeCompare(b.label))
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOptions();
  }, []);

  // Renders
  const renderParticipants = items.map((item) => {
    const eventData: ParticipantEventData = item.events.find(
      (event) => event.event_id === eventId
    );

    // Fill potentially empty fields
    if (!eventData.description) {
      eventData.description = '';
    }
    if (!eventData.sum) {
      eventData.sum = '';
    }
    if (!eventData.payment_date) {
      eventData.payment_date = null;
    }
    if (!eventData.payment_method) {
      eventData.payment_method = null;
    }

    return (
      <ParticipantCard
        key={item.id}
        participant={item}
        eventData={eventData}
        paymentOptions={paymentOptions}
      />
    );
  });

  return (
    <div>
      <div className="participants-wrapper">{renderParticipants}</div>
    </div>
  );
}

export default ParticipantsList;
