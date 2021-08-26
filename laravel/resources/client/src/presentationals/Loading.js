import React from 'react';

const Loading = props => (
  <div className={`
    loading-container
    ${props.absolute ? 'loading-absolute' : 'loading-fixed'}
  `}
  >
    <div className="pulse" />
  </div>
);

export default Loading;
