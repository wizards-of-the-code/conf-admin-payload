import React, { useState, useEffect } from 'react';
import './index.scss';

type Props = {
  name: string;
  label: string;
  defaultChecked: boolean;
  onChange: (value: boolean, name: string) => void;
};

function index({ name, label, defaultChecked, onChange }: Props) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleClick = () => {
    setIsChecked((prev) => !prev);
  };

  useEffect(() => {
    onChange(isChecked, name);
  }, [isChecked]);

  return (
    <div
      className={`field-type checkbox${
        isChecked ? ' custom-checkbox--checked' : ''
      }`}
    >
      <div className="checkbox__error-wrap"></div>
      <div
        className={`field-type custom-checkbox checkbox${
          isChecked ? ' custom-checkbox--checked' : ''
        }`}
        onClick={handleClick}
      >
        <div className="custom-checkbox__input">
          <input
            id={`field-${name}`}
            type="checkbox"
            name={name}
            checked={isChecked}
          />
          <span className="custom-checkbox__icon check">
            <svg
              className="icon icon--check"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 25"
            >
              <path
                d="M10.6092 16.0192L17.6477 8.98076"
                className="stroke"
                strokeLinecap="square"
                strokeLinejoin="bevel"
              ></path>
              <path
                d="M7.35229 12.7623L10.6092 16.0192"
                className="stroke"
                strokeLinecap="square"
                strokeLinejoin="bevel"
              ></path>
            </svg>
          </span>
        </div>
        <label
          htmlFor={`field-${name}`}
          className="field-label"
          defaultChecked={defaultChecked}
        >
          {label}
        </label>
      </div>
    </div>
  );
}

export default index;
