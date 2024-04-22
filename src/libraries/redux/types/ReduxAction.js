/* @flow */

import type {ReduxActionType} from './ReduxActionType';

export type ReduxAction = {
  type: ReduxActionType,
  payload: Object,
};
