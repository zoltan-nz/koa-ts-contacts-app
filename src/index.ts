import App from './app';
import Server from './server';

const app = new App().getInstance();
new Server(app).start();
