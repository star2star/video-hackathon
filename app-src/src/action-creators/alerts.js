import AppService, {LocalStorageService, Utilities, AlertService, crypto, track } from 's2s-app-service';
import LoggingService from 's2s-logging-service';

const doShowAlert = (aData) => {
  return {
    "type": "NEW_ALERT",
    "payload": aData,
    "meta": {
      "analytics":{
        'category':'alerts',
        'action': 'show'
      }
    }
  };
};

const doDismissAlert = (alertId) => {
  return {
    "type": "DISMISS_ALERT",
    "payload": alertId,
    "meta": {
      "analytics":{
        'category':'alerts',
        'action': 'dismiss'
      }
    }
  };
};

const doDismissPersistent = () => {
  return {
    "type": "DISMISS_PERSISTENT",
    "meta": {
      "analytics":{
        'category':'alerts',
        'action': 'dismissPersistent'
      }
    }
  };
};


const doClearAlerts = () => {
  return dispatch =>{
    dispatch({
      "type": "CLEARING_ALERT_HISTORY",
      "meta": {
        "analytics":{
          'category':'alertLog',
          'action': 'cleared'
        }
      }
    });
  };
};


export {doShowAlert, doDismissAlert, doDismissPersistent, doClearAlerts };
