/* @flow */

import type {AppStore} from '../../rootReducer';
import {connect} from 'react-redux';

const connectState = (reducerKey: string): Function => {
  return connect((store: AppStore): Object => store[reducerKey]);
};

export default connectState;
