import React from 'react';

const CustomButtonComponent = () => {

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('Clicked!');
  };

  return (
    <div>
      <button 
        className="btn btn--style-secondary btn--icon-style-without-border btn--size-medium btn--icon-position-right"
        onClick={handleClick}>
        Отправить тестовую рассылку себе
      </button>
    </div>
  );
};

export default CustomButtonComponent;