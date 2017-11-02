import { AlertService } from 's2s-app-service';
import LoggingService from 's2s-logging-service';

const alerts = (state, action)=>{

  if (typeof state === 'undefined') {
    return  { log: AlertService.getInstance().getAlertLog(),
              active: []
            };
  }

  switch (action.type) {
    case 'CLEARING_ALERT_HISTORY':
      AlertService.getInstance().clearAlerts();
      return { ...state, log: []};

    case 'NEW_ALERT':
    {
      // get nextId by looking at highest in state.active array and adding 1
      let nextId = Date.now();

      action.payload.alertId = nextId;

      let newActive = [].concat([action.payload], state.active).slice(0,50);  // Use "slice" to avoid mutating array.
      //LoggingService.getInstance().debug('>>>>>', newActive)
      return {...state, active: newActive, log: AlertService.getInstance().getAlertLog() };
    }

    case 'DISMISS_ALERT':
    {  // filter out the active alert matching the alertId in action.payload

      const remainingAlerts = state.active.filter((alertData)=>{
        return alertData.alertId !== action.payload;//payload will be alertId
      });
      return {...state, active: remainingAlerts , log: AlertService.getInstance().getAlertLog()};
    }

    case 'DISMISS_PERSISTENT':
    {
      //LoggingService.getInstance().debug('####>>>> Dismiss notconnected')
      const remainingAlerts = state.active.filter((alertData)=>{

          return !alertData.isPersistent;
      });

      return {...state, active: remainingAlerts , log: AlertService.getInstance().getAlertLog()};
    }

    default:
     return state;
    }
};

export { alerts };
