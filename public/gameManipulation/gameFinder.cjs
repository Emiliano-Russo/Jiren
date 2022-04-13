const { readdirSync } = require("fs");

module.exports.getInstalledGames = (mainDir) => {
  const directories = readdirSync(mainDir, { withFileTypes: true })
    .filter((dirent) => {
      return dirent.isDirectory();
    })
    .map((dirent) => dirent.name);
  return directories;
};

module.exports.isThisGameInstalled = (mainDir, title) => {
  const gameList = this.getInstalledGames(mainDir);
  const filter = gameList.find((folderName) => folderName === title);
  return filter != undefined;
};
