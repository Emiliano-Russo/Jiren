const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports.fetchLink = async function fetchLink(link) {
  return new Promise(async function (resolve, reject) {
    try {
      const downloadLink = await fetchMediafireDownloadLink(link); //For now we only allow mediafire links
      resolve(downloadLink);
    } catch (err) {
      reject(err);
    }
  });
};

function fetchMediafireDownloadLink(mediafireLink) {
  return new Promise(async function (resolve, reject) {
    const resp = await axios.default.get(mediafireLink);
    const dom = new jsdom.JSDOM(resp.data);
    const elements = dom.window.document.querySelectorAll("a");
    elements.forEach((el) => {
      if (el.text.includes("Download (")) {
        const link = el.href;
        resolve(link);
      }
    });
    reject();
  });
}
