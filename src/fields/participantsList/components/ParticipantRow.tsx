import React, { useState } from 'react';
import TelegramSvg from '../../../assets/svgs/telegram_logo.svg';
import { toast } from 'react-toastify';

type Props = {
  participant: any,
  eventData: any,
}

function ParticipantRow({participant, eventData}: Props) {
  const [currentData, setCurrentData] = useState(eventData);

  // Functions
  const handleRequest = (itemId, data) => {
    const postUpdate = async () => {
      try {
        const response = await fetch(`http://${process.env.PAYLOAD_PUBLIC_CMS_URL}:${process.env.PAYLOAD_PUBLIC_NGINX_PORT}/api/custom/participants/${itemId}`,
        {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const content = await response.json();
        
        if(response.ok) {
          toast.info('Изменения сохранены');
        }
      } catch (error) {
        console.log('error', error);
      }
    }
    
    postUpdate();
  }

  const handlePaymentSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentData({
      ...currentData,
      is_payed: e.target.checked,
    });
  }

  const handleAttendanceSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentData({
      ...currentData,
      attended: e.target.checked,
    });
  }

  return (
      <tr className='participant-row' key={participant.id}>
          <td>
            <div className='name-field'>
              <a href={`https://t.me/${participant.tg.username}`} target='_blank'>
                <img
                className='svg-icon-small svg-link'
                src={TelegramSvg} 
                alt="Copy bot link" />
              </a>
            {participant.username}
            </div>
          </td>
          <td>
            {eventData.role}
          </td>
          <td>
            <input
              type="checkbox"
              id={`${eventData.id}-${participant.id}`}
              checked={currentData.is_payed}
              onChange={handlePaymentSwitch}
          ></input>
          </td>
          <td>
            <input
              type="checkbox" 
              id={`${eventData.id}-${participant.id}`}
              checked={currentData.attended}
              onChange={handleAttendanceSwitch}
          ></input>
          </td>
          <td className='row-controls'>
            <button type="button" onClick={() => handleRequest(participant.id, currentData)}>Save</button>
          </td>
      </tr>             
  )
}

export default ParticipantRow