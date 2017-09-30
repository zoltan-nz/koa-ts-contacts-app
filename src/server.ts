import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as path from 'path';

import bodyParser = require('koa-bodyparser');

const PORT           = process.env.PORT || 4000;

const app    = new Koa();
const router = new Router();

router.get('/', async ctx => {
  ctx.body = { title: 'title from state'};
  return ctx;
  // await ctx.render('pages/home', { title: 'Home Page' });
});

app
  .use(bodyParser())
  .use(router.routes())
  .listen(PORT);

process.stdout.write(`Contacts App listening on port ${PORT}`);
