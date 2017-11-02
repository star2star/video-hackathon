var {app, Menu, BrowserWindow, autoUpdater , ipcMain, dialog } = require('electron');
var electron = require('electron');
const path = require('path');
var appVersion = require('./package.json').version;
var os = require('os');
var fs = require('fs');
var storage = require('electron-json-storage');
var alwaysOnTop = true;
var platform = os.platform() + '_' + os.arch();
var appArguments = process.argv.splice(1);
var winWidth = (os.platform()  !== 'darwin'? 286 : 270);
var winHeight = (os.platform()  !== 'darwin'? 561 : 545);

var win = null;

// var HID = require('node-hid');
//
// var devices = HID.devices();

// var registeredDevices = [];

//var sender;
//var device;

// const refreshDevices = () =>{
//   registeredDevices.map((d)=>{
//     try {
//       d.close();
//     } catch(e){}
//
//   });
//   registeredDevices = [];
//   devices = HID.devices();
//   //console.log('>>>>', HID, devices);
//   devices.map((d)=>{
//     if (d.manufacturer.toLowerCase().trim()  == 'plantronics'){
//       const device = new HID.HID(d.vendorId,d.productId);
//       registeredDevices.push(device);
//       //console.log('dddd', device)
//       let buttonState;
//       device.on('error', function(e){
//         console.log('eeeeee', e);
//         refreshDevices();
//       });
//       device.on("data", function(data) {
//         console.log('I got Data: ', typeof(data), data);
//         Object.keys(data).map((k)=>{
//           // TODO jes fix this
//           console.log('what should id do now: ', k, data[k]);
//           if (sender && k == 1){
//             //console.log('Will be sending this: ', k, data[k]);
//             if ( (data[k] == 80 || data[k] == 64)  && !buttonState){
//               buttonState = 'toggleMute';
//               //sender.send('toggleMute')
//             } else if (data[k] == 96){
//               buttonState = 'toggleAnswerHangup'
//               //sender.send('toggleAnswerHangup');
//             } else if (data[k] == 81 || data[k] == 65){
//               buttonState = 'volumeUp'
//               //sender.send('toggleAnswerHangup');
//             } else if (data[k] == 82 || data[k] == 66){
//               buttonState = 'volumeDown'
//               //sender.send('toggleAnswerHangup');
//             } else if (data[k] == 64 ||data[k] == 80 ) {
//               sender.send(buttonState);
//               buttonState = undefined;
//             } else {
//               console.log('USB Device click not handled: ', k, data[k]);
//             }
//             //console.log('button State is: ', buttonState);
//           }
//         })
//       });
//     } else if (d.manufacturer.toLowerCase().trim() == 'jabra'){
//       const device = new HID.HID(d.vendorId,d.productId);
//       registeredDevices.push(device);
//       //console.log('dddd', device)
//       device.on('error', function(e){
//         console.log('eeeeee', e);
//         refreshDevices();
//       });
//       device.on("data", function(data) {
//         console.log('I got Data: ', typeof(data), data);
//         Object.keys(data).map((k)=>{
//           // TODO jes fix this
//           //console.log('what should id do now: ', k, data[k]);
//           if (sender && k == 1){
//             //console.log('Will be sending this: ', k, data[k]);
//             if (data[k] == 2){
//               // jes dont do anything jabra mutes the mic
//               //sender.send('toggleMute')
//             } else if (data[k] == 1){
//               sender.send('toggleAnswerHangup');
//             } else {
//               console.log('USB Device click not handled: ', k, data[k]);
//             }
//           }
//         })
//       });
//     }
//   })
// }

// setInterval(()=>{
//   console.log('Refreshing list');
//   refreshDevices();
// }, 10000);

const shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory){
  if (win){
    if(win.isMinimized()) win.restore();
    win.focus();
  }
});

if (shouldQuit){
  app.quit();
  return;
}

// only for windows install
function handleSquirrelEvent() {
  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  if (process.platform !== 'win32') {
    return false;
  }

  const spawn = function(command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {detached: true, stdio: 'ignore'});
      spawnedProcess.unref();
    } catch (error) {

    }

    return spawnedProcess;
  };

  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      app.quit();
      return true;
    default:
      return false;
  }
};

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

app.on('ready', function(){

  // Check if we are on a MAC and add Edits app menu
  if (process.platform === 'darwin') {
    var template = [{
        label: app.getName(),
        submenu: [
            { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]}, {
        label: "Edits",
        submenu: [
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  }


  // Sleep/resume....
  electron.powerMonitor.on('suspend', () => {
    log.info('The system is going to sleep');
    sender && sender.send('sleep');
  });
  electron.powerMonitor.on('resume', () => {
    log.info('resume ---- ');
    sender && sender.send('resume');
  });


  // different settings depending on OS windows is different the mac
  const win = new BrowserWindow({
    width:  winWidth,
    height: winHeight,
    title: "Star Launchpad",
    frame: true,
    resizable: true,
    minWidth: winWidth,
    maxWidth: winWidth + 105, // 375px is designed width...
    minHeight: 545,
    maxHeight: 770,
    maximizable: false,
    minimizable: true,
    fullscreen: false,
    fullscreenable: false,
    transparent: false,
    'webPreferences': {
      'webSecurity': false
    }
  });
  win.setMenu(null);

  win.on('close', function(){
    //console.log('closing');
  })

  win.on('move', function(e){
    var b = win.getContentBounds();
    b.width = winWidth; // doing this because sometimes width is wider ... why dont know.
    //console.log('>>>>', b);

    storage.set('windowBounds', b);
  });

  win.on('resize', function(e){
    var b = win.getContentBounds();
    b.width = winWidth; // doing this because sometimes width is wider ... why dont know.
    //console.log('>>>>', b);

    storage.set('windowBounds', b);
  });

  storage.get('windowBounds', function(error, data){
    if (!error) {
      // restoring window position -- last parameter is animation
      //console.log('>>>>', data);
      if (data.hasOwnProperty('x') && data.x > -15000){
        win.setContentBounds(data, true);
      } else {
        storage.set('windowBounds', win.getContentBounds() );
      }

    }
  });

  // always on top setting
  storage.get('onTop', function(error, data) {
    if (!error) {
      if (data.hasOwnProperty('value')){
        alwaysOnTop = data.value;
      }
    } else {
      // error so save it
      storage.set('onTop', {value: true});
    }
    win.setAlwaysOnTop(alwaysOnTop);
  });

  //console.log('>>>', win.alwaysOnTop);

  // if in debug mode or dev ... open dev tools
  if (appArguments.indexOf('--debug') > -1 ){
    //win.webContents.openDevTools({mode: "undocked"});
  }

  let updateUrl;

  // setting up so I know what url to send so we point to the right endpoint
  if (appArguments.indexOf('--dev') > -1 ){
    win.loadURL('file://' + __dirname + '/index.html?env=dev' + (appArguments.indexOf('--debug') > -1 ? '&debug': '') );
    updateUrl = 'file://'+__dirname +'/update.html?env=dev';
    //win.loadURL('http://localhost:8080');
  } else if (appArguments.indexOf('--test') > -1 ){
    win.loadURL('file://' + __dirname + '/index.html?env=test' + (appArguments.indexOf('--debug') > -1 ? '&debug': '') );
    //win.loadURL('https://orion-cust.star2star.net/softphoneDesktop/');
    updateUrl = 'file://'+__dirname +'/update.html?env=test';
  } else {
    win.loadURL('file://' + __dirname + '/index.html?env=prod'+ (appArguments.indexOf('--debug') > -1 ? '&debug': '') );
    updateUrl = 'file://'+__dirname +'/update.html?env=prod';
    //win.loadURL('https://orion-cust.star2star.com/softphoneDesktop/');
  }
  // if in debug mode or dev ... open dev tools
  if (appArguments.indexOf('--debug') > -1 ){
    updateUrl += '&debug=true';
  }

  let updateDialog;

  const showUpdateDialog = () => {
    updateDialog = new BrowserWindow({
      parent: win,
      alwaysOnTop: true,
      width: winWidth,
      height: 200,
      frame: false,
      resizable: false,
      maximizable: false,
      minimizable: false,
      fullscreen: false,
      fullscreenable: false,
      transparent: false,
      'webPreferences': {
        'webSecurity': false
      }
    });

    updateDialog.loadURL(updateUrl);
  }

  // communication between hosted pages and electron
  ipcMain.on('ipc-message', (event, name, value ) => {
    //console.log('MESSAGE: ', name, value)  // prints "ping"
    switch(name){
      case 'register':
        //console.log('>>>>', event, name, value);

        sender = event.sender; //.send('ping', 'mmmmmmmmm')
        break;

      case 'setAlwaysOnTop':
        win.setAlwaysOnTop(value);
        storage.set('onTop', {value}, function(error){});
        break;
      // case 'incomingCall':
      //   win.restore();
      //   // ok check to see if we are always on top and if not
      //   // set always on top and then reverse it so the
      //   // window will pop to the top
      //   if (!win.isAlwaysOnTop()){
      //     win.setAlwaysOnTop(true);
      //     setTimeout(()=>{
      //       win.setAlwaysOnTop(false);
      //     }, 2000)
      //   }
      //   break;
      case 'openSettings':
        const winSettings = new BrowserWindow({
          parent: win,
          title: "StarLauncher Settings",
          frame: true,
          maximizable: false,
          minimizable: false,
          fullscreen: false,
          fullscreenable: false,
          transparent: false,
          'webPreferences': {
            'webSecurity': false
          }
        });
        winSettings.loadURL(value);
        break;
      case 'openHelp':
        const winHelp = new BrowserWindow({
          parent: win,
          title: "StarLauncher Help",
          frame: true,
          maximizable: false,
          minimizable: false,
          fullscreen: false,
          fullscreenable: false,
          transparent: false,
          'webPreferences': {
            'webSecurity': false
          }
        });
        winHelp.loadURL(value);
        break;
      case 'updateApp':
        //console.log('MAIN: updateApp: ', value);
        //debugger;
        if (value){
          autoUpdater.quitAndInstall();
        } else {
          updateDialog.close();
          setTimeout(showUpdateDialog, 60000);
        }
        break;
    }
  })


  // auto update stuff
  //console.log('>>>', appArguments);
  if (  appArguments.indexOf('--dev') === -1 ) {

    if (  appArguments.indexOf('--test') > -1 ) {
      var updateFeed = 'https://starphone-rs.star2star.net/update/'+platform+'/'+appVersion;
    } else {
      var updateFeed = 'https://starphone-rs.star2star.com/update/'+platform+'/'+appVersion;
    }
    //console.log(updateFeed);
    autoUpdater.setFeedURL(updateFeed);
    autoUpdater.on('update-available', function(z){
      console.log('update available: ');
    }).on('update-not-available', function(z){
      console.log('update NOT available: ');
      //showUpdateDialog();
    }).on('update-downloaded', function(a,b,c,d){
      console.log('update downloaded: ' );
      showUpdateDialog();
    }).on('error', function(e, f){
      console.error('ERROR: ', e, f);
    });
    autoUpdater.checkForUpdates();
  }
});

// necessary to close everything when all windows are closed
app.on('window-all-closed', function() {
  // registeredDevices.map((d)=>{
  //   try{
  //     d.close();
  //   } catch(e){
  //
  //   }
  //
  // });
  app.quit();
});
