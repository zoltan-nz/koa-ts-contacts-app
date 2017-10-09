import * as Router from '@types/koa-router';

this.router.get('/', async ctx => {
  ctx.body = DEFAULT_LIVE_MESSAGE;
  return ctx;
});
