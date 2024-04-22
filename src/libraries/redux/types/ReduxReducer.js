/* @flow */

import type {ReduxAction} from './ReduxAction';

export type ReduxReducer = (state: Object, action: ReduxAction) => Object;
