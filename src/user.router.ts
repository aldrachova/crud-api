import { IncomingMessage, ServerResponse } from 'http';
import { API_URL, Method, URL_REGEXP } from './constants';
import { userService } from './user.service';

export const userRoutes = async (request: IncomingMessage, response: ServerResponse) => {
  if (request.url === API_URL && request.method === Method.GET) {
    userService.getUsers(response);
  } else if (request.url && request.url.match(URL_REGEXP)
            && request.method === Method.GET) {
    const id = request.url.split('/')[3];
    userService.getUserById(response, id);
  } else if (request.url === API_URL && request.method === Method.POST) {
    await userService.createUser(request, response);
  } else if (request.url &&  request.url.match(URL_REGEXP) && request.method === Method.PUT) {
    const id = request.url.split('/')[3];
    userService.updateUser(request, response, id);
  }
};
