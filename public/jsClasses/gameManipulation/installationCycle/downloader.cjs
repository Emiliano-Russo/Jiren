class Downloader {
  #fs = null;
  #https = null;
  #showError = null;

  constructor(fs, https, showError) {
    this.#fs = fs;
    this.#https = https;
    this.#showError = showError;
  }
  downloadFile(url, dest, event) {
    return new Promise(async function (resolve, reject) {
      var file = this.#fs.createWriteStream(dest);
      var request = this.#https
        .get(url, function (response) {
          response.pipe(file);
          this.#downloadProgress(response, event);
        })
        .on("error", function (err) {
          console.log("error");
          console.log(err);
          // Handle errors
          fs.unlink(dest); // Delete the file async. (But we don't check the result)
          showError(err.message);
          reject(err.message);
        });
      file.on("finish", () => {
        resolve();
      });
    });
  }

  #downloadProgress(response, event) {
    var len = parseInt(response.headers["content-length"], 10);
    var cur = 0;
    response.on("data", function (chunk) {
      cur += chunk.length;
      const result = "Downloading " + ((100.0 * cur) / len).toFixed(2) + "% ";
      event.sender.send("feedBack", result);
    });
  }
}

module.exports.Downloader = Downloader;
