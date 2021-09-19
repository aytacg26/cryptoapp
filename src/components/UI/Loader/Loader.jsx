import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className='loader-container'>
      <div className='lds-ripple'>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
