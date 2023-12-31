import { Participant, ParticipantEventData, SelectedOption } from './types';

import React, { useState } from 'react';
import TelegramSvg from '../../../assets/svgs/telegram_logo.svg';
import ChevronUp from '../../../assets/svgs/chevron-up.svg';
import ChevronDown from '../../../assets/svgs/chevron-down.svg';
import { toast } from 'react-toastify';
import Date from 'payload/dist/admin/components/elements/DatePicker';
import SelectInput from 'payload/dist/admin/components/elements/ReactSelect';
import CustomCheckbox from '../../../components/CustomCheckbox';
import { Option } from 'payload/dist/admin/components/elements/ReactSelect/types';
import { Tooltip } from 'react-tooltip';

type Props = {
  participant: Participant;
  eventData: ParticipantEventData;
  paymentOptions: Option[];
};

function ParticipantCard({ participant, eventData, paymentOptions }: Props) {
  const [currentData, setCurrentData] = useState(eventData);
  const [collapsed, setCollapsed] = useState(true);
  const [changed, setChanged] = useState(false);

  // Functions
  const handleCollapse = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCollapsed((prev) => !prev);
  };

  const handleRevert = () => {
    setChanged(false);
    setCurrentData(eventData);
    console.log(eventData);
  };

  const handleCheckboxSwitch = (e: boolean, name: string) => {
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

  const handlePaymentChange = (selectedOption: SelectedOption | null) => {
    setChanged(true);
    setCurrentData({
      ...currentData,
      payment_method: selectedOption !== null ? selectedOption.value : null,
    });
  };

  const handleDateChange = (value: Date) => {
    setChanged(true);
    setCurrentData({
      ...currentData,
      payment_date: value,
    });
  };

  const handleRequest = (itemId: string, data: unknown) => {
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"></path>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M11.9997 10.8284L7.04996 15.7782L5.63574 14.364L11.9997 8L18.3637 14.364L16.9495 15.7782L11.9997 10.8284Z"></path>
    </svg>
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

  const renderPaid = () => {
    if (currentData.refund) {
      return <div className="span-red">Возврат</div>;
    } else {
      if (currentData.is_payed) {
        return <div className="span-green">Оплачено</div>;
      } else {
        return <div className="span-yellow">Не оплачено</div>;
      }
    }
  };

  return (
    <div className="participant-card">
      <Tooltip id="tg-contact-tooltop" />
      <div className="pc-header-wrapper">
        <div className="pc-contact">
          <a href={`https://t.me/${participant.tg.username}`} target="_blank">
            <img
              className="svg-icon-small svg-link"
              src={TelegramSvg}
              alt="Copy bot link"
              data-tooltip-id="tg-contact-tooltop"
              data-tooltip-content={`Связаться с ${participant.tg.username}`}
            />
          </a>
        </div>
        <div className="pc-header_handler" onClick={handleCollapse}>
          <div className="name-field">{participant.username}</div>
          <div className="role-field">{renderRole()}</div>
          {renderPaid()}
          <div className="pc-header-controls">
            <button
              className="btn-action"
              type="button"
              onClick={handleCollapse}
            >
              {renderChevron}
            </button>
          </div>
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
              key={Math.random()} // Shame, but it's the only way I have found to rerender lib's component :/
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
            key={`is_payed-${currentData.is_payed}`}
            name="is_payed"
            label="Оплачено"
            defaultChecked={currentData.is_payed}
            onChange={(e) => handleCheckboxSwitch(e, 'is_payed')}
          />
          <CustomCheckbox
            key={`refund-${currentData.refund}`}
            name="refund"
            label="Возврат"
            defaultChecked={currentData.refund}
            onChange={(e) => handleCheckboxSwitch(e, 'refund')}
          />
          <CustomCheckbox
            key={`attended-${currentData.is_payed}`}
            name="attended"
            label="Участвовал(а)"
            defaultChecked={currentData.attended}
            onChange={(e) => handleCheckboxSwitch(e, 'attended')}
          />
        </div>
        <div className="controls-row">
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
