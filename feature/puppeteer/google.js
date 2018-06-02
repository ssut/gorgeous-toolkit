const { EventEmitter } = require('events');

const puppeteer = require('puppeteer');
const qs = require('qs');

const { Runner } = require('./runner');

class GoogleHandler extends EventEmitter {

  static get URL() {
    return {
      searchMain: 'https://images.google.com/?hl=en&gl=US',
    };
  }

  /**
   *
   * @param {puppeteer.Page} page
   */
  constructor(page) {
    super();

    this.page = page;
  }

  /**
   * Search images from Google
   *
   * @param {puppeteer.Page} page
   * @param {String} keyword
   */
  async searchImage(keyword) {
    const { page } = this;

    await page.goto(GoogleHandler.URL.searchMain);

    const search = await page.$('#lst-ib');
    await search.type(keyword);

    await Promise.all([
      search.press('Enter'),
      page.waitForSelector('div.hdtb-mitem.hdtb-msel.hdtb-imb'),
      page.waitForSelector('#center_col'),
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]);

    const querystrings = await page.$$eval('#isr_mc #rg a[href^="/imgres"]', elements => {
      return elements
        .map(a => a.href)
        .filter(x => x.includes('?imgurl'))
        .map(x => new URL(x))
        .map(url => url.search);
    });

   return querystrings
    .map(querystring => qs.parse(querystring))
    .filter(qs => qs['?imgurl'] !== undefined)
    .map(qs => qs['?imgurl']);
  }

}

module.exports = {
  GoogleHandler,
};
