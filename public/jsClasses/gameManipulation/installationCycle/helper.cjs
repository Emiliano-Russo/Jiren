class Helper {
  #fs = null;
  #path = null;

  constructor(fs, path) {
    this.#fs = fs;
    this.#path = path;
  }
  createFolder(dest) {
    if (!this.#fs.existsSync(dest)) this.#fs.mkdirSync(dest, function () {});
  }

  getFileName(linkWeb, serverName) {
    var penultinate = linkWeb.lastIndexOf("/", linkWeb.lastIndexOf("/") - 1);
    var last = linkWeb.lastIndexOf("/");
    var name = linkWeb.slice(penultinate + 1, last);
    return name;
  }

  detectCompressionType(url) {
    if (url.includes(".rar")) return "rar";
    if (url.includes(".zip")) return "zip";
    if (url.includes(".7z")) return "7z";
    return "other";
  }

  findFirstMatchOnPath(startPath, filter) {
    if (!this.#fs.existsSync(startPath)) {
      return;
    }
    var files = this.#fs.readdirSync(startPath);
    var lastChance = "";
    for (var i = 0; i < files.length; i++) {
      var filename = this.#path.join(startPath, files[i]);
      var stat = this.#fs.lstatSync(filename);
      if (stat.isDirectory()) {
        continue;
        /*const result = fromDir(filename, filter); //recurse
            if (result === undefined) continue;
            else return result;*/
      } else if (filename.indexOf(filter) >= 0) {
        return filename;
      }
    }
  }
}

module.exports.Helper = Helper;
