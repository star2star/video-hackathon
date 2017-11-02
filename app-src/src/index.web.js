import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { addLocaleData } from 'react-intl';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import AppService, {analytics, Utilities, AlertService } from 's2s-app-service';
import reducer from './reducers/index.js';
import LoggingService from 's2s-logging-service';
import Messages from './js/messages';

import ReactNative, { View, Text, StyleSheet } from 'react-native';
import AppMain from './components/appMain';

import {doReceiveAuthData, doLoginFailure, doExpiredPassword,
  doShowAlert, doAppStatus, doProcessWSMessage} from './action-creators/index.js';


// Create stylesheet
const styles = StyleSheet.create({
  viewStyles: {
    alignSelf: 'center',
    height: '400px',
    width: '80vw',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center'
  },
  textStyles: {
    color: 'blue',
    fontSize: '18px'
  }
});

// accessiblity import
//import a11y from 'react-a11y';

// what is my environment
let myEnvironment = "prod"; // defaults to prod
if (location.href.indexOf('star2star.com') > -1) {

  myEnvironment = "prod";
} else if (location.href.indexOf('star2star.net') > -1) {

  myEnvironment = "test";
} else if (location.href.indexOf('localhost') > -1) {

  myEnvironment = "dev";
} else {
  //wtf
  LoggingService.getInstance().info('something went wrong. You should never see this message');
}


// ******************************
// ****      THE STORE       ****
// ******************************
const store = createStore(reducer, applyMiddleware(analytics, thunk));


// ******************************
// **** Internationalization ****
// ******************************
let locale, dialect, messages, localeData;
dialect = 'en';
locale = dialect;
messages = (new Messages(dialect)).getAllMessages();
// inject onto utilities
Utilities.getInstance().setIntlMessages(messages);
// needed for INTL
localeData = require('react-intl/locale-data/'+dialect);
//LoggingService.getInstance().debug('>>>>>>>>', dialect, messages);
addLocaleData(localeData);

// ******************************
// ****   Theming Section    ****
// ******************************
// Theming TBD


// ******************************
// **** AppServices Section  ****
// ******************************
const appService = AppService.getInstance()
    .addS2SService('websocket')
    .setEnvironment(myEnvironment);

// Keeping appService subscriptions... may use later.
const subId = appService.subscribe((event, status, data)=>{
  LoggingService.getInstance().debug('>>>> Subscription: ', event, status, data);

  switch (event){
    case 'app-status':
      //LoggingService.getInstance().debug('&&&&&&&&  New APp Status', data);
      store.dispatch(doAppStatus(data));
      break;
    case "connect":
      // LoggingService.getInstance().debug('>>>> Subscription: ', event, status, data);
      // TODO confirm that login error/expired status are properly reported and handled
      if (status === 'error'){
        //LoggingService.getInstance().debug('>>>> sending doLoginFailure', data);
        store.dispatch(doLoginFailure(Utilities.sanitizeDataKeys(data)));
      } else if (status === 'expired') {
        store.dispatch(doExpiredPassword(Utilities.sanitizeDataKeys(data)));
      } else {
        //LoggingService.getInstance().debug('>>> status:', status, data);
        const authData = Utilities.sanitizeDataKeys(data);
        //LoggingService.getInstance().debug('>>>> connected: ', authData);
        // save data to store via dispatch
        store.dispatch(doReceiveAuthData(authData));
      }
      break;

    case "disconnect":
      break;

    case 'showAlert':
      // TODO is this case needed? or handled in 'alerts-new'?
      //LoggingService.getInstance().debug('>>>>>>>showAlert', data);
      AlertService.getInstance().createAlert(data);
      break;

    case 'alerts-new':
      //LoggingService.getInstance().debug('Got to handler for alerts-new', data);
      store.dispatch(doShowAlert(data));
      break;

    case 'websocket-message':
    {
      LoggingService.getInstance().info('======> Web Socket Message', new Date(), event, data);
      store.dispatch(doProcessWSMessage(data.data));
      // TODO call action-creator to set notification and any other actions to be done.
      break;
    }

    default:
      if (event) LoggingService.getInstance().info('>>> Subscription Not Handled:',new Date(),  event, data);
  }
});

// TODO remove for production
// for dev only!!!!
window.theStore = store;

// code with routing for later...
// ReactDOM.render((
//   <Provider store={store}>
//     <BrowserRouter>
//       <Route path="/" component={Main}/>
//     </BrowserRouter>
//   </Provider>
// ), document.getElementById('app'));

// This is a very, VERY simple example of using react-native.
// As we learn more we will beef up this starter kit

ReactNative.render((
  <Provider store={store}>
    <View style={styles.viewStyles}>
      <AppMain />
    </View>
  </Provider>
), document.getElementById('app'));
