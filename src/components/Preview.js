import React from 'react';

const Preview = ({ meta }) => {
    const { name, percent, status } = meta;
    return (
      <div className="preview-box">
        <span style={{ 
          alignSelf: 'flex-start', 
          margin: '10px 3%', 
          fontFamily: 'Helvetica' 
          }}>
        {name}, 
        {Math.round(percent)}%, 
        {status}
    </span>
    </div>
    )
  }

export default Preview