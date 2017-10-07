import * as request from 'supertest';
import App from '../../../src/app';

let app;
let server;

beforeEach(() => {
  app    = new App().getInstance();
  server = app.listen();
});

describe('GET api/categories', () => {
  test('respond with 200', async () => {

    const res = await request(server).get('/api/categories');

    expect(res.status).toEqual(200);
  });
});
