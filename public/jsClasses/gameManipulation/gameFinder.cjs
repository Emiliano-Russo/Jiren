class GameFinder {
  #readdirSync = null;
  #mainDir = null;

  constructor(readdirSync, mainDir) {
    this.#readdirSync = readdirSync;
    this.#mainDir = mainDir;
  }

  getInstalledGames() {
    const directories = this.#readdirSync(mainDir, { withFileTypes: true })
      .filter((dirent) => {
        return dirent.isDirectory();
      })
      .map((dirent) => dirent.name);
    return directories;
  }

  isThisGameInstalled(title) {
    const gameList = this.getInstalledGames(mainDir);
    const filter = gameList.find((folderName) => folderName === title);
    return filter != undefined;
  }
}

module.exports.GameFinder = GameFinder;
