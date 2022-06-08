import React, { useState } from 'react';
import NewsScreenView from './view';

const NewsScreen = (props) => {

  const [visible, setVisible] = useState(true)

  const viewProps = {
    ...props,
    visible,
    setVisible
  };

  return <NewsScreenView {...viewProps} />;
};

export default NewsScreen;
