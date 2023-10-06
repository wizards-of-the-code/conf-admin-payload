import React from 'react';
import CopySvg from '../../assets/svgs/file-copy-line.svg';
import './index.scss';
import handleCopyLink from './handleCopyLink';
import { Tooltip } from 'react-tooltip';

const baseClass = 'copy-link-cell';

type CustomCellProps = {
  field: any;
  colIndex: any;
  collection: any;
  cellData: any;
  rowData: any;
};

const EventLinkCell: React.FC<CustomCellProps> = (props) => {
  const { rowData } = props;

  return (
    <span className={baseClass}>
      <Tooltip id="tooltip-event-link" />
      <img
        src={CopySvg}
        alt="Copy bot link"
        data-tooltip-id="tooltip-event-link"
        data-tooltip-content="Скопировать прямую ссылку на бота"
        onClick={(e) => handleCopyLink(e, rowData.id)}
      />
    </span>
  );
};

export default EventLinkCell;
