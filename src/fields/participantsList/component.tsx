import React, { FC, useEffect, useState } from 'react';
import { useField, useFormFields } from 'payload/components/forms';

const ParticipantsListComponent: FC<{ path: string }> = ({ path }) => {
    const { value, setValue } = useField<string>({ path });
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                console.log('fetch');
            } catch (error) {
                console.log('error');
            }
        }

        fetchParticipants();
    }, []);

    return (
        <div>
            List here
        </div>
    )
}

export default ParticipantsListComponent;