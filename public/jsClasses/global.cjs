class Global {
  mainDir = "C:/Users/" + username + "/Documents/JirenGames";

  constructor(dialog, os, username) {
    this.#dialog = dialog;
    this.#os = os;
    this.#username = username;
  }
  showError(message) {
    dialog.showMessageBox({
      type: "error",
      title: "Error!",
      message: message,
      buttons: ["Ok"],
    });
  }
}

module.exports.Global = Global;
