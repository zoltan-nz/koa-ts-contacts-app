import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as Router from 'koa-router';

const app    = new Koa();
const router = new Router();
const port   = process.env.PORT || 4000;

router.get('/', ctx => {
  ctx.type = 'html';
  ctx.body = '<h1>Hello World 2</h1>';
});

app
  .use(bodyParser())
  .use(router.routes())
  .listen(port);

process.stdout.write(`Contacts App listening on port ${port}`);
