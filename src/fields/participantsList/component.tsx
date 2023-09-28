import React, { FC, useEffect, useState } from 'react';
import { useDocumentInfo } from 'payload/components/utilities';
import "./index.scss";
import FilterBar from '../../components/FilterBar';
import { COLUMNS } from './columns';
import TelegramSvg from '../../assets/svgs/telegram_logo.svg';

const ParticipantsListComponent: FC<{ path: string }> = ({ path }) => {
    const { id } = useDocumentInfo();
    const [participants, setParticipants] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchQ, setSearchQ] = useState('');

    // Side effects
    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await fetch(`http://${process.env.PAYLOAD_PUBLIC_CMS_URL}:${process.env.PAYLOAD_PUBLIC_NGINX_PORT}/api/events/${id}?depth=1`);
                const data = await response.json();

                if (data.participants) {
                    setParticipants(data.participants);
										setFiltered(data.participants);
                }
            } catch (error) {
                console.log('error');
            }
        }

        fetchParticipants();
    }, []);

		useEffect(() => {
			if(participants.length > 0) {
				if(searchQ !== '') {
					setFiltered(participants.filter((participant) => participant.username.toLowerCase().includes(searchQ.toLowerCase())));
				} else {
					setFiltered(participants);
				}
			}
		}, [searchQ])

		// Renders
    const renderHeaders = COLUMNS.map((item, index) => <th key={index}>{item.Header}</th>);

    const renderParticipants = filtered.map((item) => {
        const eventData = item.events.find((event) => event.event_id === id);

        return (
            <tr className='participant-row' key={item.id}>
                <td>
									<div className='name-field'>
										<a href={`https://t.me/${item.tg.username}`} target='_blank'>
											<img
											className='svg-icon-small svg-link'
											src={TelegramSvg} 
											alt="Copy bot link" />
										</a>
									{item.username}
									</div>
								</td>
                <td>{eventData.role}</td>
                <td><input
                    type="checkbox"
                    id={`${eventData.id}-${item.id}`}
                    name="vehicle1"
                    value={eventData.is_payed}
                ></input></td>
                <td><input
                    type="checkbox" 
                    id={`${eventData.id}-${item.id}`}
                    name="vehicle1"
                    value={eventData.attended}
                ></input></td>
            </tr>             
        )
    });

    return (
        <div>
            <h3>Участники</h3>
            <FilterBar filter={searchQ} setFilter={setSearchQ} />
            <table className='table'>
            <thead>
                <tr>
                    {renderHeaders}
                </tr>
            </thead>
            <tbody>
                {renderParticipants}
            </tbody>
            </table>
            
        </div>
    )
}

export default ParticipantsListComponent;