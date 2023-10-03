import React, { useEffect, useState } from "react";
import "./index.scss";

const baseClass = "participants-cell";

type CustomCellProps = {
  field: any, 
  colIndex: any,
  collection: any, 
  cellData: any,
  rowData: any,
}

const ParticipantsCountCell: React.FC<CustomCellProps> = (props) => {
  const { rowData } = props;
  const [count, setCount] = useState(0);
  const [paid, setPaid] = useState(0);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(
          `http://${process.env.PAYLOAD_PUBLIC_CMS_URL}:${process.env.PAYLOAD_PUBLIC_NGINX_PORT}/api/custom/events/${rowData.id}`
        );
        const data = await response.json();

        if(data.paid) {
          setPaid(data.paid);
        }
        
        if(data.count) {
          setCount(data.count);
        }

      } catch (error) {
        console.log('error');
      }
    };

    fetchParticipants();
  }, []);

  return (
  <span className={baseClass}>
    {count} / <span className="paid-span">{paid}</span>
  </span>
  );
};

export default ParticipantsCountCell;