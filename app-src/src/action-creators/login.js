import AppService, { Utilities, AlertService, crypto, track } from 's2s-app-service';
import { doDismissPersistent,  doRemoveUserMenuItem,  doSetRoute } from './index';
import LoggingService from 's2s-logging-service';


const doLoginFailure = (payload) =>{
  return (dispatch) =>{
    LoggingService.getInstance().debug('>>>>> doLoginFailure: ', payload);
    if (typeof payload.message === 'string'){
      AlertService.getInstance().createErrorAlert({alertHeadingText: Utilities.getInstance().getIntlMessage('ALERT_LOGIN', 'Login'), alertBodyText: payload.message, isPersistent: false});
    } else {
      AlertService.getInstance().createErrorAlert({alertHeadingText: Utilities.getInstance().getIntlMessage('ALERT_LOGIN', 'Login'), isPersistent: false});
    }

    // go to login screen if credentials not validated
    dispatch(doSetRoute('/appmain/login'));

    dispatch ({
      "type": "LOGIN_FAILED",
      "payload": {},
      "meta": {
        "analytics":{
          'category':'login',
          'action': 'loginFailure'
        }
      }
    });

  };
};
const doExpiredPassword = (payload) => {
  return (dispatch) =>{
    //LoggingService.getInstance().debug('action creator ', payload)
    dispatch ({
      "type": "EXPIRED_PASSWORD",
      "payload": payload,
      "meta": {
        "analytics":{
          'category':'login',
          'action': 'expiredPassword'
        }
      }
    });
  };
};

const doResetPassword = (credentials, pwd1, pwd2) => {
  return (dispatch, getState) =>{
    track('login', 'resetPassword', 'email', email);
    //LoggingService.getInstance().debug('action creator ', credentials, pwd1, pwd2);

    const email = credentials.email;

    let userpassword = credentials.hash;

    if (credentials.pwd  && !credentials.encrypted) {
      userpassword = crypto.createHash('sha1').update(credentials.pwd).digest('hex');
    }
    if (credentials.pwd  && credentials.encrypted) {
      userpassword = credentials.pwd;
    }

    const additionalParameters = {
      'change_password': 'true',
      'new_password': pwd1,
      'notnow': 'false'
    };
    AppService.getInstance().connect(email, userpassword , true, credentials.autologin, getState().settings, additionalParameters);
  };
};

const doNotNow = (credentials) => {
  return (dispatch, getState) =>{
    track('login', 'notNow', 'email', email);
    //LoggingService.getInstance().debug('action creator ', credentials, pwd1, pwd2)
    const email = credentials.email;
    const userpassword = credentials.pwd ? crypto.createHash('sha1').update(credentials.pwd).digest('hex') : credentials.hash;
    const additionalParameters = {
      'change_password': 'false',
      'notnow': 'true'
    };
    AppService.getInstance().connect(email, userpassword , true, credentials.autologin, getState().settings, additionalParameters);
  };
};


const doReceiveAuthData = (payload) => {
  return dispatch => {

    //LoggingService.getInstance().debug('Auth data received', payload);

    // TODO if we need to select default extension to use, fix this....
    // const softPhoneExts = payload.extensions.filter((e)=>{
    //   return e.phone === 129;
    // }).sort((a,b)=>{
    //   return a.extension < b.extension;
    // });

    // if (softPhoneExts.length === 0){
    //   AlertService.getInstance().createErrorAlert({alertHeadingText: Utilities.getInstance().getIntlMessage('ALERT_SOFTPHONE_EXTENSION', 'No softphone extension'), alertBodyText: Utilities.getInstance().getIntlMessage('ALERT_MORE_INFORMATION', 'For more information visit:'), alertLink: 'http://star2star.com', isPersistent: true});
    //   dispatch(doSubmitLogOut());
    // } else {
    //   // appService logs in with first one
    //   dispatch({
    //     "type": "AUTH_DATA",
    //     "payload": payload
    //   });
    // }

    dispatch({
      "type": "AUTH_DATA",
      "payload": payload
    });

    dispatch(doPostProcessing());
  };
};


const doPostProcessing = () =>{
  //const getIntlText = getIntl;
  return (dispatch, getState) =>{
    const store=getState();
    //LoggingService.getInstance().debug('getintl', this.getIntlText)

    LoggingService.getInstance().debug('POST PROCESSING -- login', location.pathname);

    // DEVELOPER'S NOTE:  YOu will probably need to tweak this area if you need
    // to route to the current location.pathename rather than to the defined route
    // on a typical initialization.  An example of when you would need to do this is
    // tearoffs that start the app and need to go to a specific route rather than
    // the main page.

    dispatch(doSetRoute('/appmain/yourapphere'));
  };
};

// const store = store.getState();
// called by click
const doReconnect = () => {
  return (dispatch, getState) => {
    const store = getState();
    //LoggingService.getInstance().debug('STORE++ ',store);

    // Send all the auth data back to reconnect
    const reconnectToken = {token: store.auth.token};
    AppService.getInstance().reconnect(reconnectToken).then((d)=>{
      //.log('reconnected???', d);
      dispatch(doReceiveAuthData(d));
    }).catch((e)=>{
      //LoggingService.getInstance().debug('catch', e);
      //TODO EXPIRED EXPIRING WRONG
      dispatch(doLoginFailure(e));
    });
  };
};

const doSubmitLogin = (email, pwd, remember, encrypted) => {
  return (dispatch, getState) => {
    // fix callerid here
    //LoggingService.getInstance().debug('>>>>>>>> doSubmitLogin', email, pwd, remember, encrypted);

    const loginParams = {email: email, password: pwd};

    dispatch(doDismissPersistent());
    const settings = getState().settings;
    AppService.getInstance().login(loginParams).then((d)=>{
      //LoggingService.getInstance().debug('then', d);

      dispatch({type: 'SAVE_CREDENTIALS' , payload: {email, pwd, remember}});

      // TODO maybe do this a little differently....
      dispatch(doReceiveAuthData(d));
    }).catch((e)=>{
      //LoggingService.getInstance().debug('catch', e);
      //TODO EXPIRED EXPIRING WRONG
      dispatch(doLoginFailure(e));
    });

    //AppService.getInstance().connect(email, pwd, encrypted, remember, settings);
    // dispatching so we change from not authorized to pending
    dispatch(doingLogin({email, pwd, remember, encrypted, settings}));
  };
};

const doForgotPassword = (email) =>{
  return (dispatch, getState) => {
    track('login', 'forgot', 'email', email);
    AppService.getInstance().speak('resetPassword', { email } ).then((data)=>{
      //LoggingService.getInstance().debug('forgot returned: ', data);
      AlertService.getInstance().createInfoAlert({alertHeadingText: Utilities.getInstance().getIntlMessage('ALERT_FORGOT_PASSWORD', 'Forgot Password'), alertBodyText: data.description, isPersistent: false});
    }).catch((error)=>{
      //LoggingService.getInstance().debug('forgot errored: ', error);
      AlertService.getInstance().createErrorAlert({alertHeadingText: Utilities.getInstance().getIntlMessage('ALERT_FORGOT_PASSWORD', 'Forgot Password'), alertBodyText: error.description, isPersistent: false});
    });
  };
};


const doingLogin = (data) => {
  return {
    type: "AUTH_SUBMIT_LOGIN",
    payload: data,
    "meta": {
      "analytics":{
        'category':'login',
        'action': 'login'
      }
    }
  };
};

const doLogOut = ()=>{
  return {type: 'USER_LOGOUT'};
};

// called by client actions
const doSubmitLogOut = () =>{
  return dispatch => {
    //LoggingService.getInstance().debug('doSubmitLogOut');
    dispatch(doLogOut());

    // clearout the userMenuHeader since it requires being logged in to be used
    dispatch(doRemoveUserMenuItem('userMenuHeader'));

    AppService.getInstance().disconnect();
      // dispatching so we change from not authorized to pending
      // Thunk here
    if (localStorage){
      localStorage.clear();
    }
    // route to login page
    dispatch(doSetRoute('/appmain/login'));
  };
};



export {doReceiveAuthData, doReconnect, doForgotPassword, doExpiredPassword,
        doResetPassword, doNotNow, doSubmitLogin, doLoginFailure,
        doSubmitLogOut };
