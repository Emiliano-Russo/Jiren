const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require("axios");

module.exports.getPage = async function getPage(nro, event) {
  console.log("Getting Page..");
  const result = await scrapPiviWeb(nro);
  event.sender.send("wishGames", result);
};

async function scrapPiviWeb(nroPage) {
  return new Promise(async function (resolve, reject) {
    const url = "https://pivigames.blog/multiplayer-online/page/" + nroPage + "/";
    const resp = await axios.default.get(url);
    const dom = new jsdom.JSDOM(resp.data);
    const games = Array.from(dom.window.document.getElementsByClassName("gp-post-thumbnail gp-loop-featured"));
    const wishGrappedGames = [];
    games.forEach((game) => {
      const name = Array.from(game.children)[0].title;
      const a = Array.from(game.children)[0];
      const href = a.href;
      const imgUrl = Array.from(a.children)[0].src;
      const grappedGame = {
        link: href,
        imageUrl: imgUrl,
        name: name,
      };
      wishGrappedGames.push(grappedGame);
    });
    resolve(wishGrappedGames);
  });
}
