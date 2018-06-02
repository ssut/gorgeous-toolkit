const Router = require('koa-router');
const router = new Router();


router.all('/', require('./api'));

module.exports = router;
