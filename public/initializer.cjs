const { GameStarter } = require("./jsClasses/gameManipulation/gameStarter.cjs");
const { GameRemover } = require("./jsClasses/gameManipulation/gameRemover.cjs");
const { GameFinder } = require("./jsClasses/gameManipulation/gameFinder.cjs");
const { Wish } = require("./jsClasses/wish.cjs");
const { Updater } = require("./jsClasses/updater");
const { Global } = require("./jsClasses/global.cjs");
const { Main } = require("./jsClasses/gameManipulation/installationCycle/main.cjs");
const { LinkCollector } = require("./jsClasses/gameManipulation/installationCycle/linkCollector.cjs");
const { GameCracker } = require("./jsClasses/gameManipulation/installationCycle/gameCracker.cjs");
const { Downloader } = require("./jsClasses/gameManipulation/installationCycle/downloader.cjs");
const { Helper } = require("./jsClasses/gameManipulation/installationCycle/helper.cjs");
const { Extractor } = require("./jsClasses/gameManipulation/installationCycle/extractor.cjs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require("axios");
const { readdirSync } = require("fs");
const fs = require("fs");
const exec = require("child_process").execFile;
const path = require("path");
const https = require("https");
const StreamZip = require("node-stream-zip");
const unrar_promise = require("unrar-promise");
const _7z = require("7zip-min");
//Electron-Updater
const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");
const os = require("os");
const { mainDir, showError } = require("./js/global.cjs");

class Initializer {
  constructor() {}

  buildHelper() {
    const helper = new Helper(fs, path);
    return helper;
  }

  buildGlobal() {
    const global = new Global(dialog, os, os.userInfo().username);
    return global;
  }

  buildWish() {
    const wish = new Wish(jsdom, JSDOM, axios);
    return wish;
  }

  buildUpdater() {
    const updater = new Updater(dialog, autoUpdater, log, this.buildGlobal().showError);
    return updater;
  }

  buildGameFinder() {
    const gameFinder = new GameFinder(readdirSync, this.buildGlobal().mainDir);
    return gameFinder;
  }

  buildGameRemover() {
    const gameRemover = new GameRemover(fs);
    return gameRemover;
  }

  buildGameStarter() {
    const gameStarter = new GameStarter(exec, fs, this.buildHelper().findFirstMatchOnPath, mainDir, showError);
    return gameStarter;
  }

  buildLinkCollector() {
    const linkCollector = new LinkCollector(axios, jsdom);
    return linkCollector;
  }

  buildDownloader() {
    const downloader = new Downloader(fs, https, showError);
    return downloader;
  }

  buildExtractor() {
    const extactor = new Extractor(
      StreamZip,
      fs,
      unrar_promise,
      _7z,
      this.buildHelper().detectCompressionType,
      this.buildHelper().createFolder,
      showError
    );
    return extactor;
  }

  buildGameCracker() {
    const gameCracker = new GameCracker(
      this.buildDownloader(),
      this.buildExtractor(),
      this.buildHelper(),
      this.buildLinkCollector(),
      fs
    );
    return gameCracker;
  }

  buildMain() {
    const main = new Main(
      os.userInfo().username,
      this.buildExtractor(),
      this,
      this.buildLinkCollector(),
      this.buildGameCracker(),
      this.buildHelper()
    );
    return main;
  }
}

module.exports.Initializer = Initializer;
