import * as request from 'supertest';
import App, { DEFAULT_LIVE_MESSAGE } from '../src/app';

describe('Server is live', () => {
  test('should response', async () => {
    const app    = new App().getInstance();
    const server = app.listen();

    const res = await request(server).get('/');

    expect(res.status).toEqual(200);
    expect(res.text).toEqual(DEFAULT_LIVE_MESSAGE);
  });
});
