const Router = require('koa-router');

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
  const google = new GoogleHandler(ctx.browser);

  try {
    const imageUrls = await google.searchImage(page, keyword);
    ctx.body = imageUrls;
  } catch (e) {
    throw e;
  } finally {
    await page.close();
  }
});


module.exports = router.routes();
