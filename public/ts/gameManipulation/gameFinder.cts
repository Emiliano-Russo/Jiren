const { readdirSync } = require("fs");
const { mainDir } = require("../global.cjs");

module.exports.getInstalledGames = () => {
  const directories = readdirSync(mainDir, { withFileTypes: true })
    .filter((dirent) => {
      return dirent.isDirectory();
    })
    .map((dirent) => dirent.name);
  return directories;
};

module.exports.isThisGameInstalled = (title) => {
  const gameList = this.getInstalledGames(mainDir);
  const filter = gameList.find((folderName) => folderName === title);
  return filter != undefined;
};
