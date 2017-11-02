import { LocalStorageService } from 's2s-app-service';
import LoggingService from 's2s-logging-service';
import * as ac from './index';


const doAppStatus = (data) =>{
  return {
    "type": "APP_STATUS",
    "payload": data,
    "meta": {
      "analytics":{
        'category':'main',
        'action': 'status'
      }
    }
  };
};

const doAppInitialize = () =>{
  return (dispatch, getState) => {
    const store = getState();

    LoggingService.getInstance().info('App Initialize action creator');
    if (localStorage && localStorage.credentials) {
      // if credentials is in localStorage, and remember is true, do the login
      // TODO should we check for expiration of credential data here???
      const { email, pwd, remember, encrypted } = LocalStorageService.getData('credentials').data;

      // only do login if remember is true
      if (remember){
        // put timeout to allow ws connection to be established
        setTimeout(()=>{
          dispatch(ac.doSubmitLogin(email, pwd, remember, encrypted));
        }, 1000);
      }
    }
  };
};

const doSetRoute = (theRoute) => {
  return {
    type: 'SET_APP_ROUTE',
    payload: { route: theRoute}
  };
};

export { doAppStatus, doAppInitialize, doSetRoute };
