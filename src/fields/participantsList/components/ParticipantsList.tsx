import React from 'react';
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
}

function ParticipantsList({items, eventId}: Props) {

  // Renders
  const renderParticipants = items.map((item) => { 
    const eventData = item.events.find((event: ParticipantEventData) => event.event_id === eventId);

    return <ParticipantCard key={item.id} participant={item} eventData={eventData} />;
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