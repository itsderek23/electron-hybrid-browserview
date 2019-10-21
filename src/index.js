const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 400,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // The remote page
  let view = new BrowserView({
    webPreferences: {
      preload : `${__dirname}/preload.js` // needs full path
    }
  })
  // BrowserView output will go into this console, not main window's devtools console.
  // view.webContents.openDevTools();
  mainWindow.setBrowserView(view)
  view.setBounds({ x: 0, y: 100, width: 800, height: 300 })
  view.webContents.loadURL('https://pste.eu/p/kYaa.html') // replace with the url to your app ie - http://localhost:3000.

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on("hello", (evt, name) => {
  console.log("received hello event=",name);
  mainWindow.getBrowserView().webContents.send("greeting",`Hi ${name}!`)
});
