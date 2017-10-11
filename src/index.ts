import App from './app';
import Server from './server';

const app = new App();

new Server(app.getInstance()).start();
