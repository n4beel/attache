import React, { useState } from 'react';
import VideoScreenView from './view';

const VideoScreen = (props) => {

  const [visible, setVisible] = useState(true)

  const viewProps = {
    ...props,
    visible,
    setVisible
  };

  return <VideoScreenView {...viewProps} />;
};

export default VideoScreen;
