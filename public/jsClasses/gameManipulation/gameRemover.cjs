class GameRemover {
  #fs = null;
  constructor(fs) {
    this.#fs = fs;
  }

  deleteGame(folderGameName, baseDir) {
    const finalDir = baseDir + "/" + folderGameName;
    console.log("DELETING GAME WITH FINAL DIR: ");
    console.log(finalDir);
    this.#fs.rmdirSync(finalDir, { recursive: true, force: true });
  }
}

module.exports.GameRemover = GameRemover;
