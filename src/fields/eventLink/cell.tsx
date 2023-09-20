import React from "react";
import CopySvg from '../../assets/svgs/file-copy-line.svg';
import "./index.scss";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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
    <img src={CopySvg} alt="Copy bot link" onClick={() => handleCopyLink(rowData.id)} /></span>;
};

export default EventLinkCell;