class Updater {
  constructor(dialog, autoUpdater, log, showError) {
    this.#dialog = dialog;
    this.#autoUpdater = autoUpdater;
    this.#log = log;
    this.#showError = showError;
  }

  updateChecker() {
    this.#autoUpdater.requestHeaders = { "PRIVATE-TOKEN": process.env.GH_TOKEN };
    //Check for update (GH Releases)
    console.log("Checking for updates");
    this.#autoUpdater.checkForUpdates();

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

    this.#autoUpdater.on("error", (error) => {
      console.log("############## ERROR ###############");
      console.log(error);
      if (typeof error === "string" || error instanceof String) this.#showError(error);
      else this.#showError(error.toString());
    });

    this.#autoUpdater.on("update-available", (something) => {
      this.#dialog.showMessageBox({
        type: "info",
        title: "Update Availabel!",
        message: "Downloading in progress",
        buttons: ["Ok i just wait"],
      });
    });

    this.#autoUpdater.on("download-progress", (progressObj) => {
      let log_message = "Download speed: " + progressObj.bytesPerSecond;
      log_message = log_message + " - Downloaded " + progressObj.percent + "%";
      log_message = log_message + " (" + progressObj.transferred + "/" + progressObj.total + ")";
      console.log("*********************************");
      console.log(log_message);
    });

    //Listen for update downloaded
    this.#autoUpdater.on("update-downloaded", () => {
      //Prompt the if sure to install the update
      this.#dialog
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
  }
}

module.exports.Updater = Updater;
