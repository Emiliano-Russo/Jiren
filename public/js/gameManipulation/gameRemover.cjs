const fs = require("fs");

module.exports.deleteGame = function deleteGame(folderGameName, baseDir) {
  const finalDir = baseDir + "/" + folderGameName;
  console.log("DELETING GAME WITH FINAL DIR: ");
  console.log(finalDir);
  fs.rmdirSync(finalDir, { recursive: true, force: true });
};
