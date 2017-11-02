const {ipcRenderer} = require('electron');

var logger = require('electron-log');


var LoggingService = require('s2s-logging-service').default;

var x = LoggingService.getInstance();
x.setLogger(logger);

log = x;

//************************************
//************************************
// ****   ipc Render             *****
//************************************
//************************************
ipcRenderer.send('ipc-message','register'  );

// ipcRenderer.on('toggleMute', (event, message) => {
//   //console.log('got toggleMute');
//   var event = new Event('toggleMute');
//   document.dispatchEvent(event);
//   //ipcRenderer.send('ipc-message','pong'  );
// });
// ipcRenderer.on('toggleAnswerHangup', (event, message) => {
//   //console.log('got toggleAnswerHangup');
//   var event = new Event('toggleAnswerHangup');
//   document.dispatchEvent(event);
//   //ipcRenderer.send('ipc-message','pong'  );
// });
// ipcRenderer.on('volumeUp', (event, message) => {
//   //console.log('got toggleAnswerHangup');
//   var event = new Event('volumeUp');
//   document.dispatchEvent(event);
//   //ipcRenderer.send('ipc-message','pong'  );
// });
// ipcRenderer.on('volumeDown', (event, message) => {
//   //console.log('got toggleAnswerHangup');
//   var event = new Event('volumeDown');
//   document.dispatchEvent(event);
//   //ipcRenderer.send('ipc-message','pong'  );
// });
// functions necessary for communication to electron app
setAlwaysOnTop =  (v) => {
  //console.log('sending always on top ', v);
  ipcRenderer.send('ipc-message','setAlwaysOnTop', v );
}

// incomingCall = () =>{
//   //console.log('sending incoming call message')
//   ipcRenderer.send('ipc-message','incomingCall');
// }

openHelp = (urlHelp) => {
  //console.log('open help');
  ipcRenderer.send('ipc-message','openHelp', urlHelp);
}

openSettings = (urlSettings) => {
  //console.log('open help');
  ipcRenderer.send('ipc-message','openSettings', urlSettings);
}

openChat = (urlSettings) => {
  //console.log('open help');
  ipcRenderer.send('ipc-message','openChat', urlChat);
}

updateApp = (willUpdate)=>{
  //console.log('updateApp', willUpdate);
  ipcRenderer.send('ipc-message','updateApp', willUpdate);
}
