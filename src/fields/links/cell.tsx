import React from 'react';
import './index.scss';
import { Tooltip } from 'react-tooltip';

const baseClass = 'links-cell';

type CustomCellProps = {
  field: any;
  colIndex: any;
  collection: any;
  cellData: any;
  rowData: any;
};

const LinksCell: React.FC<CustomCellProps> = (props) => {
  const { rowData } = props;
  const { link, tickets_link, tg_channel } = rowData;

  // Classes
  const siteClass = link ? 'link-span active' : 'link-span';
  const ticketsClass = tickets_link ? 'link-span active' : 'link-span';
  const telegramClass = tg_channel ? 'link-span active' : 'link-span';

  // Spans
  // Direct svg tags are necessary to painlessly change their color dynamically depending on the theme
  const siteSpan = (
    <span
      className={siteClass}
      data-tooltip-id="tooltip-links"
      data-tooltip-content="Ссылка на сайт"
    >
      <svg
        fill="currentColor"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0" />
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <g>
            <g>
              <path d="M256,0C114.62,0,0,114.62,0,256s114.62,256,256,256s256-114.62,256-256S397.38,0,256,0z M172.211,41.609 c-24.934,27.119-44.68,66.125-56.755,111.992H49.749C75.179,102.741,118.869,62.524,172.211,41.609z M25.6,256 c0-26.999,5.077-52.727,13.662-76.8h70.494c-4.608,24.294-7.356,49.963-7.356,76.8s2.748,52.506,7.347,76.8H39.262 C30.677,308.727,25.6,283,25.6,256z M49.749,358.4h65.707c12.083,45.867,31.821,84.872,56.755,111.991 C118.869,449.476,75.179,409.259,49.749,358.4z M243.2,485.188c-43.81-8.252-81.877-58.24-101.359-126.788H243.2V485.188z M243.2,332.8H135.74c-4.924-24.166-7.74-49.997-7.74-76.8s2.816-52.634,7.74-76.8H243.2V332.8z M243.2,153.6H141.841 C161.323,85.052,199.39,35.063,243.2,26.812V153.6z M462.251,153.6h-65.707c-12.083-45.867-31.821-84.873-56.755-111.992 C393.131,62.524,436.821,102.741,462.251,153.6z M268.8,26.812c43.81,8.252,81.877,58.24,101.359,126.788H268.8V26.812z M268.8,179.2h107.46c4.924,24.166,7.74,49.997,7.74,76.8s-2.816,52.634-7.74,76.8H268.8V179.2z M268.8,485.188V358.4h101.359 C350.677,426.948,312.61,476.937,268.8,485.188z M339.789,470.391c24.934-27.127,44.672-66.125,56.755-111.991h65.707 C436.821,409.259,393.131,449.476,339.789,470.391z M402.244,332.8c4.608-24.294,7.356-49.963,7.356-76.8 s-2.748-52.506-7.347-76.8h70.494c8.576,24.073,13.653,49.801,13.653,76.8c0,27-5.077,52.727-13.662,76.8H402.244z" />
            </g>
          </g>
        </g>
      </svg>
    </span>
  );

  const ticketsSpan = (
    <span
      className={ticketsClass}
      data-tooltip-id="tooltip-links"
      data-tooltip-content="Ссылка на билеты"
    >
      <svg
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
      >
        <path d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z" />
      </svg>
    </span>
  );

  const telegramSpan = (
    <span
      className={telegramClass}
      data-tooltip-id="tooltip-links"
      data-tooltip-content="Групповой Telegram чат"
    >
      <svg
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 496 512"
      >
        <path d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z" />
      </svg>
    </span>
  );

  return (
    <span className={baseClass}>
      <Tooltip id="tooltip-links" />
      {link ? (
        <a href={link} target="_blank">
          {siteSpan}
        </a>
      ) : (
        siteSpan
      )}
      {tickets_link ? (
        <a href={tickets_link} target="_blank">
          {ticketsSpan}
        </a>
      ) : (
        ticketsSpan
      )}
      {tg_channel ? (
        <a href={tg_channel} target="_blank">
          {telegramSpan}
        </a>
      ) : (
        telegramSpan
      )}
    </span>
  );
};

export default LinksCell;
