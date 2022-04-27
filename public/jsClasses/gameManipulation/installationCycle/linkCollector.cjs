class LinkCollector {
  #axios = null;
  #jsdom = null;
  #JSDOM = null;

  constructor(axios, jsdom) {
    this.#axios = axios;
    this.#jsdom = jsdom;
    this.#JSDOM = this.#jsdom.JSDOM;
  }

  async fetchLink(link) {
    const downloadLink = await this.#fetchMediafireDownloadLink(link); //For now we only allow mediafire links
    return downloadLink;
  }

  async #fetchMediafireDownloadLink(mediafireLink) {
    const resp = await this.#axios.default.get(mediafireLink);
    const dom = new this.#jsdom.JSDOM(resp.data);
    const elements = dom.window.document.querySelectorAll("a");
    elements.forEach((el) => {
      if (el.text.includes("Download (")) {
        const link = el.href;
        return link;
      }
    });
  }
}

module.exports.LinkCollector = LinkCollector;
