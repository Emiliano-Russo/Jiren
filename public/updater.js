//Electron-Updater
const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");

//Configure log debugging
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";

//Single export to check for and apply any available updated
module.exports.updateChecker = () => {
  autoUpdater.requestHeaders = { "PRIVATE-TOKEN": "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" };
  //Check for update (GH Releases)
  console.log("Checking for updates");
  autoUpdater.checkForUpdatesAndNotify();

  /*autoUpdater.on("update-available", () => {
    //Prompt user to start download
    dialog
      .showMessageBox({
        type: "info",
        title: "Update available",
        message: "A new version of Jiren is available, Do you want ot update now?",
        buttons: ["Update", "No"],
      })
      .then((result) => {
        let buttonIndex = result.response;

        if (buttonIndex === 0) {
          console.log("OK LETS DOWNLOAD!!");
          autoUpdater.downloadUpdate();
        }
      });

    autoUpdater.downloadUpdate();
  });*/

  autoUpdater.on("error", (error) => {
    console.log("############## ERROR ###############");
    console.log(error);
    dialog.showMessageBox({
      type: "error",
      title: "ERROR",
      message: "ERROR JUST NOW",
      buttons: ["Update", "No"],
    });
  });

  autoUpdater.on("download-progress", (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + " - Downloaded " + progressObj.percent + "%";
    log_message = log_message + " (" + progressObj.transferred + "/" + progressObj.total + ")";
    console.log("*********************************");
    console.log(log_message);
  });

  //Listen for update downloaded
  autoUpdater.on("update-downloaded", () => {
    //Prompt the if sure to install the update
    dialog
      .showMessageBox({
        type: "info",
        title: "Update ready",
        message: "Install & restart now?",
        buttons: ["Yes", "Later"],
      })
      .then((result) => {
        let buttonIndex = result.response;

        //Install & restart
        if (buttonIndex === 0) {
          autoUpdater.quitAndInstall(false, true);
        }
      });
  });
};
