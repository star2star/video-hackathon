//import AppService, {LocalStorageService, Utilities, AlertService, crypto, track } from 's2s-app-service';
import * as ac from './index';
import LoggingService from 's2s-logging-service';


const doProcessWSMessage = (rawWSMessageData) => {
  return (dispatch) =>{

    //LoggingService.getInstance().debug('doProcessWSMessage', rawWSMessageData);

    const event = rawWSMessageData.event;

    // depending on the message content, decide what further actions need to be done.

    // **************************
    // Messaging
    // TODO Fix to use ws messages for SMS/Chat....

      // take action based on the event
      switch(event) {


        default:
          LoggingService.getInstance().info('Unhandled WS Message....');
      }

  };
};



// TODO Add other action-creators for wsmessage.

export { doProcessWSMessage };
