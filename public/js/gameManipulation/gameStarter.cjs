const exec = require("child_process").execFile;
const fs = require("fs");
const { findFirstMatchOnPath } = require("./installationCycle/helper.cjs");
const { mainDir, showError } = require("../global.cjs");

//gameName == game.title == folder Name
module.exports.playGame = function playGame(gameName) {
  const exeLocation = getGameExe(gameName);
  console.log("Exe location: ");
  console.log(exeLocation);
  exec(exeLocation, function (err, data) {
    //console.log(err);
    //console.log(data.toString());
    const errorMessage = err.toString();
    showError(errorMessage);
  });
};

function getGameExe(gameName) {
  //Magic
  const baseDir = mainDir() + "/" + gameName + "/Uncompress/";
  const finalDir = baseDir + fs.readdirSync(baseDir).filter((val) => !val.includes("rack"))[0];
  console.log("% Final Dir: ");
  console.log(finalDir);
  const exeLocation = findFirstMatchOnPath(finalDir, ".exe");
  return exeLocation;
}
