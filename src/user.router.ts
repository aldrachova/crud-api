import { IncomingMessage, ServerResponse } from 'http';
import { API_URL, Method } from './constants';
import { userService } from './user.service';

export const userRoutes = (request: IncomingMessage, response: ServerResponse) => {
  if (request.url === API_URL && request.method === Method.GET) {
    userService.getUsers(response);
  } else if (request.url && request.url.match(/\/api\/users\/[a-f0-9]+/) 
            && request.method === Method.GET) {
    const id = request.url.split('/')[3];
    userService.getUserById(response, id);
  }
};
