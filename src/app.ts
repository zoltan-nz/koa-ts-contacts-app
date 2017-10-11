import * as Application from 'koa';
import bodyParser = require('koa-bodyparser');
import * as Router from 'koa-router';

export const DEFAULT_LIVE_MESSAGE = 'It\'s up';

export default class App {

  public app: Application;

  constructor() {
    this.app = new Application();

    const router = new Router();

    router.get('/', async ctx => {
      ctx.body = DEFAULT_LIVE_MESSAGE;
    });

    router.get('/api/categories', ctx => {
      ctx.body = {};
      ctx.toJSON();
    });

    this.app
      .use(bodyParser())
      .use(router.routes());
  }

  public getInstance(): Application {
    return this.app;
  }
}
