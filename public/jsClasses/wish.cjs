class Wish {
  #jsdom = null;
  #JSDOM = null;
  #axios = null;
  constructor(jsdom, JSDOM, axios) {
    this.#jsdom = jsdom;
    this.#JSDOM = JSDOM;
    this.#axios = axios;
  }

  async getPage(nro, event) {
    console.log("Getting Page..");
    const result = await this.#scrapPiviWeb(nro);
    event.sender.send("wishGames", result);
  }

  async #scrapPiviWeb(nroPage) {
    const url = "https://pivigames.blog/multiplayer-online/page/" + nroPage + "/";
    const resp = await this.#axios.default.get(url);
    const dom = new this.#jsdom.JSDOM(resp.data);
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
    return wishGrappedGames;
  }
}

module.exports.Wish = Wish;
