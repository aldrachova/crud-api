import { IncomingMessage, ServerResponse } from 'http';
import { API_URL, Message, Method, StatusCode, URL_REGEXP } from './constants';
import { handleErrorResponse } from './response-handler';
import { userService } from './user.service';

export const userRoutes = async (request: IncomingMessage, response: ServerResponse) => {
  if (request.url === API_URL && request.method === Method.GET) {
    userService.getUsers(response);
  } else if (request.url && request.url.match(URL_REGEXP) && request.method === Method.GET) {
    const id = request.url.split('/')[3];
    userService.getUserById(response, id);
  } else if (request.url === API_URL && request.method === Method.POST) {
    await userService.createUser(request, response);
  } else if (request.url && request.url.match(URL_REGEXP) && request.method === Method.PUT) {
    const id = request.url.split('/')[3];
    userService.updateUser(request, response, id);
  } else if (request.url && request.url.match(URL_REGEXP) && request.method === Method.DELETE) {
    const id = request.url.split('/')[3];
    userService.deleteUser(response, id);
  } else {
    handleErrorResponse(response, StatusCode.NOT_FOUND, Message.ROUTE_NOT_FOUND);
  }
};
