class Main {
  constructor(pcUsername, extractor, linkCollector, downloader, gameCracker, helper) {
    this.#pcUsername = pcUsername;
    this.#extractor = extractor;
    this.#linkCollector = linkCollector;
    this.#downloader = downloader;
    this.#gameCracker = gameCracker;
    this.#helper = helper;
  }

  async beginInstallationCycle(event, game) {
    this.#helper.createFolder(jirenGamesFolder + "/" + game.title);
    const listLocationCompressedFiles = await this.#downloadAllLinks(game.downloadLinks, game.title, event);
    const gameLocation = `${jirenGamesFolder}/${game.title}/Uncompress`;
    await this.#unCompressAllFiles(listLocationCompressedFiles, gameLocation, event);
    if (game.crackUrl) await this.#extractor.crackGame(game.crackUrl, gameLocation, event);
    event.sender.send("download-ready", game.title);
  }

  async #downloadAllLinks(links, gameName, event) {
    const listLocations = [];
    for (link of links) {
      const fileLocation = await this.#downloadProcess(link, gameName, event);
      listLocations.push(fileLocation);
    }
    return listLocations;
  }

  async #unCompressAllFiles(listLocationCompressedFiles, destiny, event) {
    event.sender.send("feedBack", "Extracting Files...");
    for (locationCompressedFile of listLocationCompressedFiles)
      await this.#extractor.unCompress(locationCompressedFile, destiny, event);
  }

  async #downloadProcess(linkWeb, folderName, event) {
    event.sender.send("feedBack", "Preparing Download...");
    const link = await this.#linkCollector.fetchLink(linkWeb);
    const fileName = this.#helper.getFileName(linkWeb);
    const finalDest = `${jirenGamesFolder}/${folderName}/${fileName}`;
    await this.#downloader.downloadFile(link, finalDest, event);
    return finalDest;
  }
}

module.exports.Main = Main;
