const { readdirSync } = require("fs");

module.exports.getInstalledGames = (source) => {
  const directories = readdirSync(source, { withFileTypes: true })
    .filter((dirent) => {
      return dirent.isDirectory();
    })
    .map((dirent) => dirent.name);
  return directories;
};
