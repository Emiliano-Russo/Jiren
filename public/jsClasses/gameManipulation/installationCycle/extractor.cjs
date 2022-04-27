class Extractor {
  #StreamZip = null;
  #fs = null;
  #unrar_promise = null;
  #_7z = null;
  #detectCompressionType = null;
  #createFolder = null;
  #showError = null;

  constructor(StreamZip, fs, unrar_promise, _7z, detectCompressionType, createFolder, showError) {
    this.#StreamZip = StreamZip;
    this.#fs = fs;
    this.#unrar_promise = unrar_promise;
    this.#_7z = _7z;
    this.#detectCompressionType = detectCompressionType;
    this.#createFolder = createFolder;
    this.#showError = showError;
  }

  unCompress(location, dest, event) {
    process.noAsar = true;
    return new Promise(async function (resolve, reject) {
      createFolder(dest);
      const compressionType = this.#detectCompressionType(location);
      if (compressionType == "rar") {
        const result = await this.#unCompressRar(location, dest, event);
        resolve(result);
      } else if (compressionType == "zip") {
        const result = await this.#uncompressZip(location, dest, event);
        resolve(result);
      } else if (compressionType == "7z") {
        const result = this.#unCompress7z(location, dest);
        resolve(result);
      } else {
        showError("Couldn't exctract this file");
        reject("Can't uncompress this file");
      }
    });
  }

  #uncompressZip(zipLocation, folderDest, event) {
    return new Promise(async function (resolve, reject) {
      try {
        const zip = new this.#StreamZip.async({ file: zipLocation });
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

  async #unCompressRar(rarLocation, dest, event) {
    try {
      const rarfileList = await this.#unrar_promise.list(rarLocation);
      event.sender.send("feedBack", "Extracting: " + rarfileList.length + " Files");
      return this.#unrar_promise.unrar(rarLocation, dest);
    } catch (error) {
      console.log("ERROR WACHIN!!!!!!!!!!!!!!!!");
      console.log(err);
      //showError(error.toString());
    }
  }

  #unCompress7z(location, dest) {
    this.#_7z.unpack(location, dest, (error) => {
      console.log("Error while extractiing .zip");
      showError("Error while extractiing .zip       " + error.toString());
    });
  }
}

module.exports.Extractor = Extractor;
