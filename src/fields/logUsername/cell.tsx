import React from "react";
import "./index.scss";

const baseClass = "username-cell";

type CustomCellProps = {
  field: any, 
  colIndex: any,
  collection: any, 
  cellData: any,
  rowData: any,
}

const LogUsernameCell: React.FC<CustomCellProps> = (props) => {
  const { cellData } = props;

  return <span className={baseClass}><a href={`https://t.me/${cellData}`} target='_blank'>@{cellData}</a></span>;
};

export default LogUsernameCell;