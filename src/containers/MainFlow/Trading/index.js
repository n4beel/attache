import React from 'react';
import TradingView from './view';

const Trading = (props) => {



  const viewProps = {
    ...props,
  };

  return <TradingView {...viewProps} />;
};

export default Trading;
