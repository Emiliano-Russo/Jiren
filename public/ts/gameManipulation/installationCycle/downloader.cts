const fs = require("fs");
const https = require("https");
const { showError } = require("../../global.cjs");

module.exports.downloadFile = function download(url, dest, event) {
  return new Promise(async function (resolve, reject) {
    var file = fs.createWriteStream(dest);
    var request = https
      .get(url, function (response) {
        response.pipe(file);
        downloadProgress(response, event);
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
};

function downloadProgress(response, event) {
  var len = parseInt(response.headers["content-length"], 10);
  var cur = 0;
  response.on("data", function (chunk) {
    cur += chunk.length;
    const result = "Downloading " + ((100.0 * cur) / len).toFixed(2) + "% ";
    event.sender.send("feedBack", result);
  });
}
