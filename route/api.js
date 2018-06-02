const Router = require('koa-router');
const sleep = require('sleep-promise');

const { handlers } = require('../feature/puppeteer');
const { GoogleHandler } = handlers;

const router = new Router();

router.get('/search-image', async (ctx) => {
  const { browser, query } = ctx;

  const { keyword } = query;
  if (keyword === undefined || keyword === '') {
    return ctx.throw(400, 'keyword required');
  }

  const page = await browser.newPage();
  const google = new GoogleHandler(page);

  try {
    const imageUrls = await Promise.race([
       google.searchImage(keyword),
       sleep(15000).then(() => Promise.reject('search timeout exceeded of 15000ms')),
    ]);
    ctx.body = imageUrls;
  } catch (e) {
    throw e;
  } finally {
    await page.close();
  }
});


module.exports = router.routes();
