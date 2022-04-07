const fs = require("fs");

module.exports.deleteGame = function deleteGame(folderGameName, baseDir) {
  const finalDir = baseDir + "/" + folderGameName;
  fs.rmdirSync(finalDir, { recursive: true, force: true });
};
