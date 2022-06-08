import React from 'react';
import SettingsView from './view';

const Settings = (props) => {

  const viewProps = {
    ...props,
  };

  return <SettingsView {...viewProps} />;
};

export default Settings;
