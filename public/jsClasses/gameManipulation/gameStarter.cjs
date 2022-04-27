class GameStarter {
  #exec = null;
  #fs = null;
  #findFirstMatchOnPath = null;
  #mainDir = null;
  #showError = null;

  constructor(exec, fs, findFirstMatchOnPath, mainDir, showError) {
    this.#exec = exec;
    this.#fs = fs;
    this.#findFirstMatchOnPath = findFirstMatchOnPath;
    this.#mainDir = mainDir;
    this.#showError = showError;
  }

  playGame(gameName) {
    const exeLocation = getGameExe(gameName);
    exec(exeLocation, function (err, data) {
      const errorMessage = err.toString();
      showError(errorMessage);
    });
  }

  getGameExe(gameName) {
    const baseDir = mainDir + "/" + gameName + "/Uncompress/";
    const finalDir = baseDir + this.#fs.readdirSync(baseDir).filter((val) => !val.includes("rack"))[0];
    console.log("% Final Dir: ");
    console.log(finalDir);
    const exeLocation = this.#findFirstMatchOnPath(finalDir, ".exe");
    return exeLocation;
  }
}

module.exports.GameStarter = GameStarter;
