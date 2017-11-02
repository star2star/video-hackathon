import objectMerge from 'object-merge';
import { LocalStorageService, Utilities } from 's2s-app-service';
import { addLocaleData } from 'react-intl';
import Messages from '../js/messages';

const app = (state, action)=>{
  if (typeof state === 'undefined') {
    let locale, dialect, messages, localeData;
    dialect = 'en';
    locale = dialect;
    messages = (new Messages(dialect)).getAllMessages();
    // inject onto utilities
    Utilities.getInstance().setIntlMessages(messages);
    // needed for INTL
    localeData = require('react-intl/locale-data/'+dialect);
    addLocaleData(localeData);

    return {credentials: undefined,
            currentRoute: undefined,
            status: {status:'disconnected'},
            selectedItems: [],
            localeData: { locale, messages },
            uiTheme: {appliedThemeName: 'default', appliedTheme: {}}
            };
  }
  //LoggingService.getInstance().debug('ACTION CREATOR: ---- ', action.type, action.payload);
  switch (action.type) {

    case 'APP_STATUS':
      //LoggingService.getInstance().debug('APP STATUS action.payload', action.payload);
      return { ...state, "status": objectMerge(state.status, action.payload)};

    case "SHOW_LOGIN":
      return { ...state, "credentials": objectMerge(state.credentials, action.payload) };

    case "SHOW_MANUAL_LOGIN":
      return { ...state, "credentials": objectMerge(state.credentials, action.payload) };

    case 'SAVE_CREDENTIALS':
      // save credentials to local storage
      // TODO fix so that clear pwd is not saved to local storage.... This is only temporary for dev
      LocalStorageService.setData('credentials', { ...action.payload});
      return { ...state};

    case 'SET_APP_ROUTE':
      {
        const newState = objectMerge({}, state);
        newState.currentRoute = action.payload.route;

        return newState;
      }

    case "LOGOUT":
      {  //LoggingService.getInstance().debug('Reducer: logout')
        const newCreds = { ...state.credentials};
        // remove these from creds when I logout
        delete newCreds.pwd;
        delete newCreds.hash;
        delete newCreds.isAutoLogin;
        delete newCreds.autologin;

        return { ...state, "credentials": newCreds  };
      }

    case 'AUTH_SUBMIT_LOGIN':
    {
      // fix credentials
      delete action.payload.settings;
      //LoggingService.getInstance().debug('AUTH SUBMITTTED_LOGIN >>>>> ', action.payload.encrypted, action.payload );


      // This code commented out until Identity microservice cna handle the 'remember' and
      // we no longer need to store the clear password
      /*
      const hash = action.payload.hasOwnProperty('encrypted') && action.payload.encrypted == true ? action.payload.pwd :  crypto.createHash('sha1').update(action.payload.pwd).digest('hex');
      //LoggingService.getInstance().debug('TTTTTTTTTTTTTTTTTTTTT', hash, action.payload.encrypted, action.payload.pwd, action.payload)
      const creds = { ...action.payload, pwd: hash, encrypted: true };
      //LoggingService.getInstance().debug('>>>>>>', creds);
      if (localStorage && action.payload.remember) {

        LocalStorageService.setData('credentials', creds);
        //localStorage.setItem('loginSettings', JSON.stringify(action.payload));
      }

      //LoggingService.getInstance().debug('auth submit login: ', action.payload)
      return { ...state, "credentials": objectMerge(state.credentials, creds)};
      */
      return { ...state}; // TODO remove this when stuff above is addressed
    }

    case "LOGIN_FAILED":
      //LoggingService.getInstance().debug('RRRRRR APP', state.credentials)
      return { ...state, "credentials": objectMerge(state.credentials, action.payload)};

    case 'EXPIRED_PASSWORD':
      // LoggingService.getInstance().debug('>>>EXPIRED_PASSWORD REDUCER:>>>>', action.payload);
      return { ...state, "credentials": objectMerge(state.credentials, action.payload)};
    /*
    case 'CONNECTED':
      return { ...state, "status": action.payload  };
    */

    case 'VIDEO_CONSTRAINTS':
      return { ...state, "videoConstraints": action.payload };

    default:
      return state;
  }
};

export { app };
