import React, { useEffect, useState } from 'react';
import qs from "qs";

const query = {
  depth: 1,
  is_active: true,
  is_finished: false
};

function CustomList(): React.FC {
  const [list, setList] = useState([]);

  useEffect(() => {
    const stringifiedQuery = qs.stringify(
      {
        where: query, // ensure that `qs` adds the `where` property, too!
      },
      { addQueryPrefix: true }
    );

    const fetchOptions = async () => {
      const response = await fetch(
        `http://${process.env.PAYLOAD_PUBLIC_CMS_URL}:${process.env.PAYLOAD_PUBLIC_NGINX_PORT}/api/events${stringifiedQuery}`
        );
      const data = await response.json();
      if(data && data.docs) {
        console.log(data.docs);
        // setParticipants(data.docs);
      }
    }

    fetchOptions();
  }, []);

  const renderParticipants = () => {
    return list.map(item => (
      <p key={item.id}>{item.username}</p>
    ))
  }

  return (
    <div>{renderParticipants()}</div>
  )
}

export default CustomList