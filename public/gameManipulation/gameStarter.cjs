const exec = require("child_process").execFile;
const fs = require("fs");
const path = require("path");
const { findFirstMatchOnPath } = require("./installationCycle/helper.cjs");

//gameName == game.title == folder Name
module.exports.playGame = function playGame(gameName, allGamesDirectory) {
  const exeLocation = getGameExe(gameName, allGamesDirectory);
  console.log("Exe location: ");
  console.log(exeLocation);
  exec(exeLocation, function (err, data) {
    console.log(err);
    console.log(data.toString());
  });
};

function getGameExe(gameName, allGamesDirectory) {
  //Magic
  const baseDir = allGamesDirectory + "/" + gameName + "/Uncompress/";
  const finalDir = baseDir + fs.readdirSync(baseDir).filter((val) => !val.includes("rack"))[0];
  console.log("% Final Dir: ");
  console.log(finalDir);
  const exeLocation = findFirstMatchOnPath(finalDir, ".exe");
  return exeLocation;
}
