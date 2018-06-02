const Koa = require('koa');
const Router = require('koa-router');

const config = require('./config');
const route = require('./route');

const { Runner: PuppeteerRunner } = require('./feature/puppeteer');

(async () => {
  const endpoint = await PuppeteerRunner.launch(['--no-sandbox']);

  const app = new Koa();
  app.context.browser = await PuppeteerRunner.getBrowser(endpoint);

  app
    .use(route.routes())
    .use(route.allowedMethods());

  app.listen(config.app.port);
})();
