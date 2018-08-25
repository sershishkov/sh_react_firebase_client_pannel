import React from 'react';
import spinner from '../../img/loading_1.gif';

export default () => {
  return (
    <div>
      <img 
      src={spinner} 
      alt="Loading..." 
      style={{
        width:'200px',
        margin:'auto',
        display:'block'  
      }}
      />
    </div>
  )
}
