class Global {
  #dialog = null;
  #os = null;
  #username = "Pedro";
  mainDir = "C:/Users/" + this.#username + "/Documents/JirenGames";
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
  mainDir() {
    const mainDir = "C:/Users/" + this.#username + "/Documents/JirenGames";
    return mainDir;
  }
}

module.exports.Global = Global;
