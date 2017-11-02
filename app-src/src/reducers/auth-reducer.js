import LoggingService from 's2s-logging-service';

const auth = (state, action)=>{
  //LoggingService.getInstance().debug('>>>>', state, action)
  if (typeof state === 'undefined') {
    return {};
  }

  switch (action.type) {
    case "AUTH_DATA":
      //LoggingService.getInstance().debug('-------->  auth data to store', action.payload);
      return { ...state, ...action.payload};

    case "CLEAR_AUTH_DATA":
      // return empty object to clear the old auth data
      return {};

    default:
     return state;
    }
};

export { auth };
