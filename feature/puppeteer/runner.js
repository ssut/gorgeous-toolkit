const puppeteer = require('puppeteer');

class Runner {

  static async launch(args = []) {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--site-per-process',
        ...args,
      ],
    });
    return browser.wsEndpoint();
  }

  static async getBrowser(browserWSEndpoint) {
    const browser = await puppeteer.connect({
      browserWSEndpoint,
    });
    const runner = new Runner(browser);
    return runner;
  }

  constructor(browser) {
    this.browser = browser;
  }

  async newPage() {
    const page = await this.browser.newPage();
    page.once('error', () => page.close());

    return page;
  }

}

module.exports = {
  Runner,
};
