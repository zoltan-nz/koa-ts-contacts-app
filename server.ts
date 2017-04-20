import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as path from 'path';

import bodyParser = require('koa-bodyparser');
import hbs = require('koa-hbs');

const PORT           = process.env.PORT || 4000;
const TEMPLATES      = path.resolve(__dirname, 'templates');
const LAYOUTS        = path.resolve(TEMPLATES, 'layouts');
const DEFAULT_LAYOUT = 'default';

const app    = new Koa();
const router = new Router();

router.get('/', async ctx => {
  // ctx.state = { title: 'title from state'};
  await ctx.render('pages/home', { title: 'Home Page' });
});

app
  .use(bodyParser())
  .use(hbs.middleware({
    defaultLayout: DEFAULT_LAYOUT,
    layoutsPath:   LAYOUTS,
    viewPath:      TEMPLATES,
  }))
  .use(router.routes())
  .listen(PORT);

process.stdout.write(`Contacts App listening on port ${PORT}`);
