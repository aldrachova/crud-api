import { config } from 'dotenv';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { LISTEN_MESSAGE } from './constants';
import { userRoutes } from './user.router';

config();
const port = process.env.PORT;

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  userRoutes(request, response);
});

server.listen(port, () => {
  console.log(`${LISTEN_MESSAGE} ${port}`);
});
