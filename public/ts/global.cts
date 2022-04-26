const { dialog } = require("electron");
const os = require("os");
const username = os.userInfo().username;
module.exports.mainDir = "C:/Users/" + username + "/Documents/JirenGames";

module.exports.showError = function showError(message) {
  dialog.showMessageBox({
    type: "error",
    title: "Error!",
    message: message,
    buttons: ["Ok"],
  });
};
