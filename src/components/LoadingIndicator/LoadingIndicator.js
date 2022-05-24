import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator = (props) => {
  return props.trigger ? (
    <div className="lds-ring">
      <div className="lds-inner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : "";
};

export default LoadingIndicator;
