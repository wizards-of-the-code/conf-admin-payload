import React, { useState, useEffect } from 'react';
import ParticipantCard from './ParticipantCard';

type Props = {
  items: any[],
  eventId: string | number,
}

type ParticipantEventData = {
  event_id: string | number;
  role: 'participant' | 'organizer' | 'speaker' | 'volunteer';
  is_payed: boolean;
  attended: boolean;
  description: string;
}

function ParticipantsList({items, eventId}: Props) {
  const [paymentOptions, setPaymentOptions] = useState([]);

  // Side effects
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`http://${process.env.PAYLOAD_PUBLIC_CMS_URL}:${process.env.PAYLOAD_PUBLIC_NGINX_PORT}/api/payment-methods`);
        const data = await response.json();

        console.log('data', data);

        const currencyOptions = data.docs.map((item) => {
          return {
            label: `${item.source} ( ${item.currency} )`,
            value: item.id,
          };
        });

        setPaymentOptions(currencyOptions.sort(
          (a, b) => a.label.localeCompare(b.label)
        ));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOptions();
  }, []);

  // Renders
  const renderParticipants = items.map((item) => { 
    const eventData: ParticipantEventData = item.events.find((event: ParticipantEventData) => event.event_id === eventId);

    return <ParticipantCard key={item.id} participant={item} eventData={eventData} paymentOptions={paymentOptions} />;
  });

  return (
    <div>
      <div className='participants-wrapper'>
				{renderParticipants}
			</div>
    </div>
  )
}

export default ParticipantsList