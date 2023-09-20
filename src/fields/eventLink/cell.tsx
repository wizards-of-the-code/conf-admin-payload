import React from "react";
import CopySvg from '../../assets/svgs/file-copy-line.svg';
import "./index.scss";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(`https://t.me/ConfMerchantBot?start=${rowData.id}`);
    toast.success("Ссылка скопирована в буфер обмена!");
  }

  return <span className={baseClass}>
    <img src={CopySvg} alt="Copy bot link" onClick={handleClick} /></span>;
};

export default EventLinkCell;