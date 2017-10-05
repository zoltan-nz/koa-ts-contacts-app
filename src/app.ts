import * as Application from 'koa';
import bodyParser = require('koa-bodyparser');
import * as Router from 'koa-router';

export const DEFAULT_LIVE_MESSAGE = "It's up";

export default class App {

  public app: Application;
  public router: Router;

  constructor() {
    this.app    = new Application();
    this.router = new Router();

    this.router.get('/', async ctx => {
      ctx.body = DEFAULT_LIVE_MESSAGE;
      return ctx;
    });

    this.app
      .use(bodyParser())
      .use(this.router.routes());
  }

  public getInstance(): Application {
    return this.app;
  }
}
