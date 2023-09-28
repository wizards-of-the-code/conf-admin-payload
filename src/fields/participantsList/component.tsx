import React, { FC, useEffect, useState } from 'react';
import { useDocumentInfo } from 'payload/components/utilities';
import "./index.scss";

const ParticipantsListComponent: FC<{ path: string }> = ({ path }) => {
    const { id } = useDocumentInfo();
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await fetch(`http://${process.env.PAYLOAD_PUBLIC_CMS_URL}:${process.env.PAYLOAD_PUBLIC_NGINX_PORT}/api/events/${id}?depth=1`);
                const data = await response.json();

                if (data.participants) {
                    setParticipants(data.participants);
                }
            } catch (error) {
                console.log('error');
            }
        }

        fetchParticipants();
    }, []);

    const renderParticipants = participants.map((item) => {
        const eventData = item.events.find((event) => event.event_id === id);

        return (
            <div className='participants-wrapper' key={item.id}>
                <span>{item.username}</span>
                <span>{eventData.role}</span>
                <input type="checkbox" id={`${eventData.id}-${item.id}`} name="vehicle1" value={eventData.is_payed}></input>
                <input type="checkbox" id={`${eventData.id}-${item.id}`} name="vehicle1" value={eventData.attended}></input>
            </div>
        )
    });

    return (
        <div>
            <h3>Участники</h3>
            {renderParticipants}
        </div>
    )
}

export default ParticipantsListComponent;