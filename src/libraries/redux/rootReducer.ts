import {combineReducers, Reducer} from 'redux';

import type {ReduxAction} from './types/ReduxAction';

import {
  requestSlice,
} from './slices';

export type RootStore = {
  request: typeof requestSlice.reducer;
};

// @ts-ignore
const appReducer: Reducer<null | RootStore> = combineReducers({
  request: requestSlice.reducer,
});

const rootReducer: Reducer<null | RootStore> = (
  state: null | RootStore,
  action: ReduxAction,
): RootStore => {
  const processedState: null | RootStore = state;
  return appReducer(processedState, action);
};

export default rootReducer;
