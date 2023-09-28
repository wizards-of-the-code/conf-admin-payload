import React, { useState } from 'react'
import { COLUMNS } from '../columns';
import ParticipantRow from './ParticipantRow';

type Props = {
  tableData: any,
  eventId: string | number,
}

function ParticipantsTable({ tableData, eventId }: Props) {
  // Renders
  const renderHeaders = COLUMNS.map((item, index) => <th key={index}>{item.Header}</th>);

  const renderParticipants = tableData.map((item) => { 
    const eventData = item.events.find((event) => event.event_id === eventId);
    return <ParticipantRow key={item.id} participant={item} eventData={eventData} />;
  });
  
  return (
    <div className='table-wrapper'>
      <table className='table'>
      <thead>
          <tr>
            {renderHeaders}
          </tr>
      </thead>
      <tbody>
        {renderParticipants}
      </tbody>
      </table>
    </div>
  )
}

export default ParticipantsTable