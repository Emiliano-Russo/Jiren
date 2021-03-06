const StreamZip = require("node-stream-zip");
const fs = require("fs");
const unrar = require("unrar-promise");
const _7z = require("7zip-min");
const { detectCompressionType, createFolder } = require("./helper.cjs");

module.exports.unCompress = function unCompress(location, dest, event) {
  return new Promise(async function (resolve, reject) {
    createFolder(dest);
    const compressionType = detectCompressionType(location);
    if (compressionType == "rar") {
      const result = await unCompressRar(location, dest);
      resolve(result);
    } else if (compressionType == "zip") {
      const result = await uncompressZip(location, dest, event);
      resolve(result);
    } else if (compressionType == "7z") {
      const result = unCompress7z(location, dest);
      resolve(result);
    } else {
      reject("Can't uncompress this file");
    }
  });
};

function uncompressZip(zipLocation, folderDest, event) {
  return new Promise(async function (resolve, reject) {
    try {
      const zip = new StreamZip.async({ file: zipLocation });
      const entries = await zip.entries();
      const length = Object.values(entries).length;
      console.log("LENGTH: " + length);
      let counter = 0;
      for (const entry of Object.values(entries)) {
        counter += 1;
        const prgoress = "Uncompressing Files: " + counter + "/" + length;
        event.sender.send("feedBack", prgoress);
        if (entry.isDirectory) fs.mkdirSync(folderDest + "/" + entry.name, (e) => {});
        else {
          const result = await zip.extract(entry.name, folderDest + "/" + entry.name);
        }
      }
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

function unCompressRar(rarLocation, dest) {
  return unrar.unrar(rarLocation, dest);
}

function unCompress7z(location, dest) {
  _7z.unpack(location, dest, (err) => {
    console.log("Done!");
  });
}
