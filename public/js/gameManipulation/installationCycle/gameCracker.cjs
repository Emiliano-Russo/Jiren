const { downloadFile } = require("./downloader.cjs");
const { unCompress } = require("./uncompressor.cjs");
const { detectCompressionType, findFirstMatchOnPath } = require("./helper.cjs");
const { fetchLink } = require("./linkCollector.cjs");
const fs = require("fs");
const path = require("path");

module.exports.crackGame = async function crack(urlCrack, gameFolder, event) {
  return new Promise(async function (resolve, reject) {
    event.sender.send("feedBack", "Cracking...");
    const compressionType = detectCompressionType(urlCrack);
    const destiny = gameFolder + "/crack." + compressionType;
    const link = await fetchLink(urlCrack);
    const resDownload = await downloadFile(link, destiny, event);
    const resUncompress = await unCompress(destiny, gameFolder + "/Crack");
    applyCrackToGame(gameFolder + "/Crack", gameFolder);
    resolve();
  });
};

function applyCrackToGame(crackFolder, gameFolder) {
  const crackFolderFiles = crackFolder + "/" + fs.readdirSync(crackFolder, (res) => {})[0];
  const gameFolderFiles = gameFolder + "/" + fs.readdirSync(gameFolder).filter((val) => !val.includes("rack"))[0];
  const crackFilesNamesList = fs.readdirSync(crackFolderFiles);
  copyEveryFileIntoTheGame(crackFilesNamesList, gameFolderFiles, crackFolderFiles);
}

function copyEveryFileIntoTheGame(crackFilesNamesList, gameFolderFiles, crackFolderFiles) {
  console.log("$$$$$$$$$");
  console.log(crackFilesNamesList);
  console.log(gameFolderFiles);
  console.log(crackFolderFiles);
  for (let i = 0; i < crackFilesNamesList.length; i++) {
    const source = crackFolderFiles + "/" + crackFilesNamesList[i];
    if (fs.statSync(source).isDirectory()) {
      console.log("*IS DIRECTORY*");
      const newGameDest = gameFolderFiles + "/" + crackFilesNamesList[i];
      copyEveryFileIntoTheGame(fs.readdirSync(source), newGameDest, source);
      continue;
    }
    const dest = findFirstMatchOnPath(gameFolderFiles, crackFilesNamesList[i]);
    if (dest) {
      fs.copyFileSync(source, dest);
    } else {
      //copy on main folder
      const data = fs.readFileSync(source);
      fs.writeFileSync(gameFolderFiles + "/" + crackFilesNamesList[i], data);
    }
  }
}
