import React, { useState } from 'react';
import TelegramSvg from '../../../assets/svgs/telegram_logo.svg';
import ChevronUp from '../../../assets/svgs/chevron-up.svg';
import ChevronDown from '../../../assets/svgs/chevron-down.svg';

type Props = {
  participant: any,
  eventId: number | string,
}

type ParticipantEventData = {
  event_id: string | number;
  role: 'participant' | 'organizer' | 'speaker' | 'volunteer';
  is_payed: boolean;
  attended: boolean;
}

function ParticipantCard({participant, eventId}: Props) {
  const [currentData, setCurrentData] = useState(
    participant.events.find((event: ParticipantEventData) => event.event_id === eventId)
  );
  const [collapsed, setCollapsed] = useState(true);
  const [changed, setChanged] = useState(false);
  const [paid, setPaid] = useState(currentData.is_payed);

  // Functions
  const handleCollapse = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setCollapsed(prev => !prev);
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

  // Renders
  const renderChevron = collapsed ?
    <img
      className='svg-icon-small svg-link'
      src={ChevronDown} /> :
    <img
      className='svg-icon-small svg-link'
      src={ChevronUp} />;

  const renderRole = () => {
    switch (currentData.role) {
      case('organizer'):
        return 'Организатор';
      case('speaker'):
        return 'Спикер';
      case('volunteer'):
        return 'Волонтёр';
      case('participant'):
      default:
        return 'Участник';
    }
  }

  const renderPaid = currentData.is_payed ?
    <div className='span-green'>Оплачено</div> :
    <div className='span-red'>Не оплачено</div>;

  return (
    <div className='participant-card'>
      <div className='pc-header'>
        <div className='name-field'>
          <a href={`https://t.me/${participant.tg.username}`} target='_blank'>
            <img
            className='svg-icon-small svg-link'
            src={TelegramSvg} 
            alt="Copy bot link" />
          </a>
        {participant.username}
        </div>
        <div className="role-field">
          {renderRole()}  
        </div>
        {renderPaid}
        <div className="pc-header-controls">
          <button className='action-button' type='button' onClick={handleCollapse}>{renderChevron}</button>
        </div>
      </div>
      <div className={`pc-body ${collapsed ? 'hidden' : ''}`}>
        <div className="render-fields field-type row">
          <div className='field-type text'>
            <label htmlFor={`sum-${participant.username}`}>Сумма</label>
            <input type="text" name={`sum-${participant.username}`}></input>
          </div>
          <div className='field-type text'>
            <label htmlFor={`currency-${participant.username}`}>Валюта</label>
            <input type="text" name={`currency-${participant.username}`}></input>
          </div>
          <div className='field-type text'>
            <label htmlFor={`date-${participant.username}`}>Дата</label>
            <input type="text" name={`date-${participant.username}`}></input>
          </div>
        </div>
        <div className="render-fields field-type row">
          <div className='field-type text'>
            <label htmlFor={`description-${participant.username}`}>Примечание</label>
            <input type="text" name={`description-${participant.username}`}></input>
          </div>
        </div>
        <div className="render-fields field-type row">
          <div>
            <label className="field-label" htmlFor={`paid-${participant.username}`}>Оплачено</label>
            <input 
              type='checkbox' 
              name={`paid-${participant.username}`} 
              checked={currentData.is_payed}
              onChange={handlePaymentSwitch}/>
          </div>
          <div>
            <label className="field-label" htmlFor={`participated-${participant.username}`}>Участвовал(а)</label>
            <input
              type='checkbox'
              name={`participated-${participant.username}`}
              checked={currentData.attended}
              onChange={handleAttendanceSwitch} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParticipantCard