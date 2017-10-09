import * as Application from 'koa';
import bodyParser = require('koa-bodyparser');
import * as Router from 'koa-router';

export const DEFAULT_LIVE_MESSAGE = "It's up";

export interface IApp {
  router: Router;
}

export default class App {

  public app: Application;
  public router: Router;

  constructor(options: IApp) {
    this.app    = new Application();
    this.router = options.router;

    this.app
      .use(bodyParser())
      .use(this.router.routes());
  }

  public getInstance(): Application {
    return this.app;
  }
}
