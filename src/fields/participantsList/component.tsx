import React, { FC, useEffect, useState } from 'react';
import { useDocumentInfo } from 'payload/components/utilities';
import './index.scss';
import FilterBar from '../../components/FilterBar';
import ParticipantsList from './components/ParticipantsList';

const ParticipantsListComponent: FC<{ path: string }> = ({ path }) => {
  const { id } = useDocumentInfo();
  const [participants, setParticipants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQ, setSearchQ] = useState('');

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
    <div>
      <h3>Участники</h3>
      <FilterBar filter={searchQ} setFilter={setSearchQ} />
      {/* <ParticipantsTable tableData={filtered} eventId={id} /> */}
      <ParticipantsList items={filtered} eventId={id} />
    </div>
  );
};

export default ParticipantsListComponent;
