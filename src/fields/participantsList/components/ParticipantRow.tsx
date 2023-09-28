import React, { useState } from 'react';
import TelegramSvg from '../../../assets/svgs/telegram_logo.svg';
import SaveSvg from '../../../assets/svgs/save-fill.svg';
import RevertSvg from '../../../assets/svgs/arrow-go-back-line.svg';
import { toast } from 'react-toastify';

type Props = {
  participant: any,
  eventData: any,
}

function ParticipantRow({participant, eventData}: Props) {
  const [currentData, setCurrentData] = useState(eventData);
  const [changed, setChanged] = useState(false);

  // Functions
  const handleRevert = () => {
    setChanged(false);
    setCurrentData(eventData);
  }

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
          setChanged(false);
          toast.info('Изменения сохранены.');
        } else {
          handleRevert();
          toast.error('Произошла ошибка при сохранении данных.')
        }
      } catch (error) {
        console.log('error', error);
      }
    }
    
    postUpdate();
  }

  const handlePaymentSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChanged(true);
    setCurrentData({
      ...currentData,
      is_payed: e.target.checked,
    });
  }

  const handleAttendanceSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChanged(true);
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
              checked={currentData.is_payed}
              onChange={handlePaymentSwitch}
          ></input>
          </td>
          <td>
            <input
              type="checkbox" 
              checked={currentData.attended}
              onChange={handleAttendanceSwitch}
          ></input>
          </td>
          {/* <td>
            <input
              type="text"
          ></input>
          </td>
          <td>
            <input
              type="text"
          ></input>
          </td> */}
          <td>
            <div className={`row-controls-cell ${changed ? 'changed' : ''}`}>
            <img
              className='svg-icon-medium svg-link'
              src={SaveSvg}
              onClick={() => handleRequest(participant.id, currentData)}
              alt="Copy bot link"
            />
            <img
              className='svg-icon-medium svg-link'
              src={RevertSvg}
              onClick={() => handleRevert()}
              alt="Copy bot link"
            />
            </div>
          </td>
      </tr>             
  )
}

export default ParticipantRow