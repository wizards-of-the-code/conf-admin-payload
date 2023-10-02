import React, { useState } from 'react';
import TelegramSvg from '../../../assets/svgs/telegram_logo.svg';
import ChevronUp from '../../../assets/svgs/chevron-up.svg';
import ChevronDown from '../../../assets/svgs/chevron-down.svg';
import { toast } from 'react-toastify';
import Date from "payload/dist/admin/components/elements/DatePicker";

type Props = {
  participant: any,
  eventData: any,
}

function ParticipantCard({participant, eventData}: Props) {
  const [currentData, setCurrentData] = useState(eventData);
  const [collapsed, setCollapsed] = useState(true);
  const [changed, setChanged] = useState(false);

  // Functions
  const handleCollapse = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setCollapsed(prev => !prev);
  }

  const handleRevert = () => {
    setChanged(false);
    setCurrentData(eventData);
  }

  const handlCheckboxSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChanged(true);
    setCurrentData({
      ...currentData,
      [e.target.name]: e.target.checked,
    });
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChanged(true);
    setCurrentData({
      ...currentData,
      [e.target.name]: e.target.value,
    });
  }

  const handleDateChange = (value: Date) => {
    setChanged(true);
    setCurrentData({
      ...currentData,
      payment_date: value,
    });
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

        if(response.ok) {
          setChanged(false);
          toast.success('Изменения сохранены.');
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
          <button className='btn-action' type='button' onClick={handleCollapse}>{renderChevron}</button>
        </div>
      </div>
      <div className={`pc-body ${collapsed ? 'hidden' : ''}`}>
        <div className="render-fields field-type row">
          <div className='field-type text'>
            <label>Сумма</label>
            <input
            type='text'
            name='sum'
            onChange={handleTextChange}
            value={currentData.sum} />
          </div>
          <div className='field-type text'>
            <label>Валюта</label>
            <input type="text" name='currency'></input>
          </div>
          <div className='field-type text'>
            <label>Дата</label>
            <Date value={currentData.payment_date} onChange={handleDateChange} displayFormat='dd.MM.yyyy' />
          </div>
        </div>
        <div className="render-fields field-type row">
          <div className='field-type text'>
            <label>Примечание</label>
            <input
              type='text'
              name='description'
              onChange={handleTextChange}
              value={currentData.description} />
          </div>
        </div>
        <div className="render-fields field-type row">
          <div>
            <label className="field-label">Оплачено</label>
            <input 
              type='checkbox' 
              name='is_payed'
              checked={currentData.is_payed}
              onChange={handlCheckboxSwitch}/>
          </div>
          <div>
            <label className="field-label" htmlFor={`participated-${participant.username}`}>Участвовал(а)</label>
            <input
              type='checkbox'
              name='attended'
              checked={currentData.attended}
              onChange={handlCheckboxSwitch} />
          </div>
        </div>
        <div className={`controls-row ${changed ? 'changed' : ''}`}>
          <button className='btn btn-compact btn--style-secondary btn--icon-style-without-border btn--size-small btn--icon-position-right'
            type='button'
            onClick={() => handleRevert()}>
            Отменить изменения
          </button>
          <button className='btn btn-compact btn--style-primary btn--icon-style-without-border btn--size-small btn--icon-position-right'
            type='button'
            onClick={() => handleRequest(participant.id, currentData)}>
            Сохранить
            </button>
        </div>
      </div>
    </div>
  )
}

export default ParticipantCard