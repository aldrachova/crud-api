import { ServerResponse } from 'http';
import { APPLICATION_JSON, CONTENT_TYPE, Message, StatusCode } from './constants';
import { User } from './user.model';

export const handleErrorResponse = (response: ServerResponse, code: StatusCode, message: Message) => {
  response.statusCode = code;
  response.setHeader(CONTENT_TYPE, APPLICATION_JSON);
  response.end(JSON.stringify({ message }));
};

export const handleResponse = (response: ServerResponse, code: StatusCode, users: User | User[]) => {
  response.statusCode = code;
  response.setHeader(CONTENT_TYPE, APPLICATION_JSON);
  response.end(JSON.stringify(users));
};
