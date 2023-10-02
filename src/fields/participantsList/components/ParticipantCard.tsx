import React, { useState } from 'react';
import TelegramSvg from '../../../assets/svgs/telegram_logo.svg';
import ChevronUp from '../../../assets/svgs/chevron-up.svg';
import ChevronDown from '../../../assets/svgs/chevron-down.svg';
import { toast } from 'react-toastify';
import Date from 'payload/dist/admin/components/elements/DatePicker';
import SelectInput from 'payload/dist/admin/components/elements/ReactSelect';
import CustomCheckbox from '../../../components/CustomCheckbox';

type Props = {
  participant: any;
  eventData: any;
  paymentOptions: any;
};

function ParticipantCard({ participant, eventData, paymentOptions }: Props) {
  const [currentData, setCurrentData] = useState(eventData);
  const [collapsed, setCollapsed] = useState(true);
  const [changed, setChanged] = useState(false);

  // Functions
  const handleCollapse = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setCollapsed((prev) => !prev);
  };

  const handleRevert = () => {
    setChanged(false);
    setCurrentData(eventData);
  };

  const handleCheckboxSwitch = (e: any, name: string) => {
    setChanged(true);
    setCurrentData({
      ...currentData,
      [name]: e,
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChanged(true);
    setCurrentData({
      ...currentData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e: any) => {
    setChanged(true);
    setCurrentData({
      ...currentData,
      payment_method: e.value,
    });
  };

  const handleDateChange = (value: Date) => {
    setChanged(true);
    setCurrentData({
      ...currentData,
      payment_date: value,
    });
  };

  const handleRequest = (itemId, data) => {
    const postUpdate = async () => {
      try {
        const response = await fetch(
          `http://${process.env.PAYLOAD_PUBLIC_CMS_URL}:${process.env.PAYLOAD_PUBLIC_NGINX_PORT}/api/custom/participants/${itemId}`,
          {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          setChanged(false);
          toast.success('Изменения сохранены.');
        } else {
          handleRevert();
          toast.error('Произошла ошибка при сохранении данных.');
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    postUpdate();
  };

  const getSelectedOption = paymentOptions.find(
    (option) => option.value === currentData.payment_method
  );

  // Renders
  const renderChevron = collapsed ? (
    <img className="svg-icon-small svg-link" src={ChevronDown} />
  ) : (
    <img className="svg-icon-small svg-link" src={ChevronUp} />
  );

  const renderRole = () => {
    switch (currentData.role) {
      case 'organizer':
        return 'Организатор';
      case 'speaker':
        return 'Спикер';
      case 'volunteer':
        return 'Волонтёр';
      case 'participant':
      default:
        return 'Участник';
    }
  };

  const renderPaid = currentData.is_payed ? (
    <div className="span-green">Оплачено</div>
  ) : (
    <div className="span-red">Не оплачено</div>
  );

  return (
    <div className="participant-card">
      <div className="pc-header">
        <div className="name-field">
          <a href={`https://t.me/${participant.tg.username}`} target="_blank">
            <img
              className="svg-icon-small svg-link"
              src={TelegramSvg}
              alt="Copy bot link"
            />
          </a>
          {participant.username}
        </div>
        <div className="role-field">{renderRole()}</div>
        {renderPaid}
        <div className="pc-header-controls">
          <button className="btn-action" type="button" onClick={handleCollapse}>
            {renderChevron}
          </button>
        </div>
      </div>
      <div className={`pc-body ${collapsed ? 'hidden' : ''}`}>
        <div className="render-fields field-type row">
          <div className="field-type text">
            <label>Сумма</label>
            <input
              type="text"
              name="sum"
              onChange={handleTextChange}
              value={currentData.sum}
            />
          </div>
          <div className="field-type select">
            <label>Способ оплаты</label>
            <SelectInput
              options={paymentOptions}
              value={getSelectedOption}
              onChange={handlePaymentChange}
            />
          </div>
          <div className="field-type text">
            <label>Дата</label>
            <Date
              value={currentData.payment_date}
              onChange={handleDateChange}
              displayFormat="dd.MM.yyyy"
            />
          </div>
        </div>
        <div className="render-fields field-type row">
          <div className="field-type text">
            <label>Примечание</label>
            <input
              type="text"
              name="description"
              onChange={handleTextChange}
              value={currentData.description}
            />
          </div>
        </div>
        <div className="render-fields field-type row">
          <CustomCheckbox
            name="is_payed"
            label="Оплачено"
            defaultChecked={eventData.is_payed}
            onChange={(e) => handleCheckboxSwitch(e, 'is_payed')}
          />
          <CustomCheckbox
            name="attended"
            label="Участвовал(а)"
            defaultChecked={eventData.attended}
            onChange={(e) => handleCheckboxSwitch(e, 'attended')}
          />
        </div>
        <div className={`controls-row ${changed ? 'changed' : ''}`}>
          <button
            className="btn btn-compact btn--style-secondary btn--icon-style-without-border btn--size-small btn--icon-position-right"
            type="button"
            onClick={() => handleRevert()}
          >
            Отменить изменения
          </button>
          <button
            className="btn btn-compact btn--style-primary btn--icon-style-without-border btn--size-small btn--icon-position-right"
            type="button"
            onClick={() => handleRequest(participant.id, currentData)}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

export default ParticipantCard;
