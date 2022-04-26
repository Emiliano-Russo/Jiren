const StreamZip = require("node-stream-zip");
const fs = require("fs");
const unrar_promise = require("unrar-promise");
const node_unrar = require("node-unrar");
const _7z = require("7zip-min");
const { detectCompressionType, createFolder } = require("./helper.cjs");
const { showError } = require("../../global.cjs");

module.exports.unCompress = function unCompress(location, dest, event) {
  process.noAsar = true;
  return new Promise(async function (resolve, reject) {
    createFolder(dest);
    const compressionType = detectCompressionType(location);
    if (compressionType == "rar") {
      const result = await unCompressRar(location, dest, event);
      resolve(result);
    } else if (compressionType == "zip") {
      const result = await uncompressZip(location, dest, event);
      resolve(result);
    } else if (compressionType == "7z") {
      const result = unCompress7z(location, dest);
      resolve(result);
    } else {
      showError("Couldn't exctract this file");
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
        const progress = "Uncompressing Files: " + counter + "/" + length;
        event.sender.send("feedBack", progress);
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

async function unCompressRar(rarLocation, dest, event) {
  try {
    const rarfileList = await unrar_promise.list(rarLocation);
    event.sender.send("feedBack", "Extracting: " + rarfileList.length + " Files");
    return unrar_promise.unrar(rarLocation, dest);
  } catch (error) {
    console.log("ERROR WACHIN!!!!!!!!!!!!!!!!");
    console.log(err);
    //showError(error.toString());
  }
}

/*async function unCompressRar(rarLocation, dest, event) {
  var rar = new node_unrar(rarLocation);
  console.log("rar location: " + rar);
  console.log("destiny:" + dest);
  /// Create '/path/to/dest/' before rar.extract()
  rar.extract(dest, null, function (err) {
    //file extracted successfully.
    console.log("FILE EXTRACTED ? ");
    console.log(err);
  });
}*/

/*async function unCompressRar(rarLocation, dest, event) {
  let counter = 0;
  let total = 0;
  archive = new Unrar(rarLocation);
  console.log("ARCHIVE BUILDED!");
  archive.list(function (err, entries) {
    console.log("-**************ENTRIES: ");
    total = entries.length;
    console.log(total);
    for (var i = 0; i < entries.length; i++) {
      var name = entries[i].name;
      var type = entries[i].type;
      if (type !== "File") {
        counter++;
        event.sender.send("feedBack", "Extracting " + counter + "/" + total);
        fs.mkdirSync(name);
      }
    }

    for (var i = 0; i < entries.length; i++) {
      var name = entries[i].name;
      var type = entries[i].type;
      if (type !== "File") {
        continue;
      }

      var stream = archive.stream(name);
      try {
        counter++;
        event.sender.send("feedBack", "Extracting " + counter + "/" + total);
        fs.writeFileSync(name, stream);
      } catch (e) {
        throw e;
      }
    }
  });
}*/

function unCompress7z(location, dest) {
  _7z.unpack(location, dest, (error) => {
    console.log("Error while extractiing .zip");
    showError("Error while extractiing .zip       " + error.toString());
  });
}
