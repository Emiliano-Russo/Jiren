// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const fs = require("fs");
const { Initializer } = require("./initializer.cjs");
//
const creator = new Initializer();
const main = creator.buildMain();
const gameStarter = creator.buildGameStarter();
const gameRemover = creator.buildGameRemover();
const gameFinder = creator.buildGameFinder();
const wish = creator.buildWish();
const updater = creator.buildUpdater();
const global = creator.buildGlobal();
//

if (!fs.existsSync(global.mainDir)) {
  fs.mkdirSync(global.mainDir, (err) => {
    console.log("**ERROR**");
    console.log(err);
    global.showError(err);
  });
}

const createWindow = () => {
  //Check for app updated after 3 seconds
  setTimeout(updater.updateChecker, 3000);
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    frame: true, // removes the frame from the BrowserWindow. It is advised that you either create a custom menu bar or remove this line
    webPreferences: {
      devTools: isDev, // toggles whether devtools are available. to use node write window.require('<node-name>')
      nodeIntegration: true, // turn this off if you don't mean to use node
      enableRemoteModule: true,
      contextIsolation: false,
    },
    width: 1360,
    height: 700,
    autoHideMenuBar: !isDev,
  });
  //dialog.showErrorBox("ERROR");
  // load the index.html of the app. (or localhost on port 3000 if you're in development)
  mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);

  // Open the DevTools. will only work if webPreferences::devTools is true
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  dialog
    .showMessageBox({
      type: "info",
      title: "Welcome to Jiren Games!",
      message: "-No Avast Antivirus\n-Open Steam ",
      buttons: ["Ok"],
    })
    .then((result) => {
      let buttonIndex = result.response;

      if (buttonIndex === 0) {
        createWindow();
        app.on("activate", () => {
          if (BrowserWindow.getAllWindows().length === 0) createWindow();
        });
      }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  // if (process.platform !== "darwin") app.quit();
  console.log("window-all-closed!");
  app.quit();
});

app.on("quit", () => {
  console.log("quit!");
  app.quit();
});

ipcMain.on("download", async function (event, game) {
  main.beginInstallationCycle(event, game);
});

ipcMain.on("get-installed-games", function (event, arg) {
  const gameList = gameFinder.getInstalledGames();
  event.sender.send("get-installed-games", gameList);
});

ipcMain.on("is-game-installed", function (event, title) {
  const isGameInstalled = gameFinder.isThisGameInstalled(title);
  event.sender.send("is-game-installed", { name: title, isInstalled: isGameInstalled });
});

ipcMain.on("play-game", function (event, gameName) {
  gameStarter.playGame(gameName, global.mainDir);
});

ipcMain.on("delete-game", function (event, gameName) {
  console.log("DELETING GAME: ");
  gameRemover.deleteGame(gameName, global.mainDir);
  event.sender.send("gameRemoved", "removed");
});

ipcMain.on("get-page", function (event, pageNmbr) {
  console.log("IPCMAIN.ON (GET-PAGE)");
  wish.getPage(pageNmbr, event);
});
