var fs = require("fs");
var path = require("path");
module.exports.createFolder = function createFolder(dest) {
    if (!fs.existsSync(dest))
        fs.mkdirSync(dest, function () { });
};
module.exports.getFileName = function getFileName(linkWeb, serverName) {
    var penultinate = linkWeb.lastIndexOf("/", linkWeb.lastIndexOf("/") - 1);
    var last = linkWeb.lastIndexOf("/");
    var name = linkWeb.slice(penultinate + 1, last);
    return name;
};
module.exports.detectCompressionType = function detectCompressionType(url) {
    if (url.includes(".rar"))
        return "rar";
    if (url.includes(".zip"))
        return "zip";
    if (url.includes(".7z"))
        return "7z";
    return "other";
};
module.exports.findFirstMatchOnPath = function fromDir(startPath, filter) {
    if (!fs.existsSync(startPath)) {
        return;
    }
    var files = fs.readdirSync(startPath);
    var lastChance = "";
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            continue;
            /*const result = fromDir(filename, filter); //recurse
            if (result === undefined) continue;
            else return result;*/
        }
        else if (filename.indexOf(filter) >= 0) {
            return filename;
        }
    }
};
