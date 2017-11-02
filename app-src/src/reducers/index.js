import { combineReducers } from 'redux';
import { app } from './app-reducer';
import { auth } from './auth-reducer';
import { reducer as tooltip } from 'redux-tooltip';
import { alerts } from './alerts-reducer';

export default combineReducers({
  app,
  auth,
  alerts,
  tooltip
  });
