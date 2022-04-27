class GameCracker {
  constructor(downloader, extractor, helper, linkCollector, fs) {
    this.#downloader = downloader;
    this.#extractor = extractor;
    this.#helper = helper;
    this.#linkCollector = linkCollector;
    this.#fs = fs;
  }

  crack(urlCrack, gameFolder, event) {
      event.sender.send("feedBack", "Cracking...");
      const compressionType = this.#helper.detectCompressionType(urlCrack);
      const destiny = gameFolder + "/crack." + compressionType;
      const link = await this.#linkCollector.fetchLink(urlCrack);
      await this.#downloader.downloadFile(link, destiny, event);
      await this.#extractor.unCompress(destiny, gameFolder + "/Crack");
      this.#applyCrackToGame(gameFolder + "/Crack", gameFolder);
  }

  #applyCrackToGame(crackFolder, gameFolder) {
    const crackFolderFiles = crackFolder + "/" + this.#fs.readdirSync(crackFolder, (res) => {})[0];
    const gameFolderFiles = gameFolder + "/" + this.#fs.readdirSync(gameFolder).filter((val) => !val.includes("rack"))[0];
    const crackFilesNamesList = this.#fs.readdirSync(crackFolderFiles);
    this.#copyEveryFileIntoTheGame(crackFilesNamesList, gameFolderFiles, crackFolderFiles);
  }

  #copyEveryFileIntoTheGame(crackFilesNamesList, gameFolderFiles, crackFolderFiles) {
    console.log("$$$$$$$$$");
    console.log(crackFilesNamesList);
    console.log(gameFolderFiles);
    console.log(crackFolderFiles);
    for (let i = 0; i < crackFilesNamesList.length; i++) {
      const source = crackFolderFiles + "/" + crackFilesNamesList[i];
      if (this.#fs.statSync(source).isDirectory()) {
        console.log("*IS DIRECTORY*");
        const newGameDest = gameFolderFiles + "/" + crackFilesNamesList[i];
        this.#copyEveryFileIntoTheGame(this.#fs.readdirSync(source), newGameDest, source);
        continue;
      }
      const dest = this.#helper.findFirstMatchOnPath(gameFolderFiles, crackFilesNamesList[i]);
      if (dest) {
        this.#fs.copyFileSync(source, dest);
      } else {
        //copy on main folder
        const data = this.#fs.readFileSync(source);
        this.#fs.writeFileSync(gameFolderFiles + "/" + crackFilesNamesList[i], data);
      }
    }
  }

}

module.exports.GameCracker = GameCracker;
