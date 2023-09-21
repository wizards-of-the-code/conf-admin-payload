import React from "react";
import CopySvg from '../../assets/svgs/file-copy-line.svg';
import "./index.scss";
import handleCopyLink from "./handleCopyLink";

const baseClass = "copy-link-cell";

type CustomCellProps = {
  field: any, 
  colIndex: any,
  collection: any,
  cellData: any,
  rowData: any,
}

const EventLinkCell: React.FC<CustomCellProps> = (props) => {
  const { rowData } = props;

  return <span className={baseClass}>
    <img src={CopySvg} alt="Copy bot link" onClick={(e) => handleCopyLink(e, rowData.id)} /></span>;
};

export default EventLinkCell;