import React from 'react';

function FilterBar({ filter, setFilter }) {
  return (
    <div className='search-filter'>
      <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon icon--search"><circle cx="11.2069" cy="10.7069" r="5" className="stroke"></circle><line x1="14.914" y1="13.9998" x2="20.5002" y2="19.586" className="stroke"></line></svg>
      <input 
        className='search-filter__input'
        placeholder='Поиск'
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)} />
    </div>
  )
}

export default FilterBar;