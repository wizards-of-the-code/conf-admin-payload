import React from "react";
import './index.scss';

const baseClass = "price-cell";

type CustomCellProps = {
  field: any, 
  colIndex: any,
  collection: any, 
  cellData: any,
  rowData: any,
}

const PriceCell: React.FC<CustomCellProps> = (props) => {
  const { rowData, cellData } = props;
  const { currency } = rowData;

  // Classes
  const currencyClass = currency ? 'currency-span filled' : 'currency-span';
  
  return (
  <span className={baseClass}>
    <span className={currencyClass}>{currency || '?'}</span>
    <span>{cellData || '--'}</span>
  </span>
  );
};

export default PriceCell;