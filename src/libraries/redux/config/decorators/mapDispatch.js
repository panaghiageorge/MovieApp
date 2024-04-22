/* @flow */

import * as React from 'react';
import {connect} from 'react-redux';

const mapDispatch = (mapDispatchToProps: Function): Function => {
  return (baseComponent: React.Component<any>): React.Component<any> => {
    return connect(null, mapDispatchToProps)(baseComponent);
  };
};

export default mapDispatch;
