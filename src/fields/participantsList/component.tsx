import React, { FC, useEffect, useState } from 'react';
import { useDocumentInfo } from 'payload/components/utilities';
import './index.scss';
import FilterBar from '../../components/FilterBar';
import ParticipantsList from './components/ParticipantsList';
import generateParticipantsPDF from '../../utils/generateParticipantsPDF';

const ParticipantsListComponent: FC<{ path: string }> = ({ path }) => {
  const { id } = useDocumentInfo();
  const [participants, setParticipants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQ, setSearchQ] = useState('');

  // Functions
  const handleDownloadPDF = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://${process.env.PAYLOAD_PUBLIC_CMS_URL}:${process.env.PAYLOAD_PUBLIC_NGINX_PORT}/api/custom/reports/event-participants/${id}`
      );
      const data = await response.json();

      generateParticipantsPDF(data);
    } catch (error) {
      console.log(
        'Error while fetching /api/custom/reports/event-participants: ',
        error
      );
    }
  };

  // Side effects
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(
          `http://${process.env.PAYLOAD_PUBLIC_CMS_URL}:${process.env.PAYLOAD_PUBLIC_NGINX_PORT}/api/events/${id}?depth=1`
        );
        const data = await response.json();

        if (data.participants) {
          setParticipants(data.participants);
          setFiltered(data.participants);
        }
      } catch (error) {
        console.log('error');
      }
    };

    fetchParticipants();
  }, []);

  useEffect(() => {
    if (participants.length > 0) {
      if (searchQ !== '') {
        setFiltered(
          participants.filter((participant) =>
            participant.username.toLowerCase().includes(searchQ.toLowerCase())
          )
        );
      } else {
        setFiltered(participants);
      }
    }
  }, [searchQ]);

  return (
    <>
      <div className="field-header">
        <h3>Участники</h3>
        <button
          type="button"
          onClick={handleDownloadPDF}
          className="btn btn-compact btn--style-primary btn--icon-style-without-border btn--size-small btn--icon-position-right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="currentColor"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
          </svg>
        </button>
      </div>
      <FilterBar filter={searchQ} setFilter={setSearchQ} />
      <ParticipantsList items={filtered} eventId={id} />
    </>
  );
};

export default ParticipantsListComponent;
