import React, { useState } from 'react';
import TelegramSvg from '../../../assets/svgs/telegram_logo.svg';
import ChevronUp from '../../../assets/svgs/chevron-up.svg';
import ChevronDown from '../../../assets/svgs/chevron-down.svg';

type Props = {
  participant: any,
  eventData?: any,
}

function ParticipantCard({participant, eventData = {}}: Props) {

  console.log(eventData);

  const [collapsed, setCollapsed] = useState(true);

  // Functions
  const handleCollapse = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setCollapsed(prev => !prev);
  }

  // Renders
  const renderChevron = collapsed ?
    <img
      className='svg-icon-small svg-link'
      src={ChevronDown} /> :
    <img
      className='svg-icon-small svg-link'
      src={ChevronUp} />;

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
        <span>Role</span>
        <span>Не оплачено</span>
        <div className="pc-header-controls">
          <button className='action-button' type='button' onClick={handleCollapse}>{renderChevron}</button>
        </div>
      </div>
      <div className={`pc-body ${collapsed ? 'hidden' : ''}`}>
        Body here
      </div>
    </div>
  )
}

export default ParticipantCard