export const LISTEN_MESSAGE = 'Server is running on port:';
export const API_URL = '/api/users';
export const URL_REGEXP = /\/api\/users\/[a-f0-9]+/;
export const CONTENT_TYPE = 'Content-Type';
export const APPLICATION_JSON = 'application/json';

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export enum Message {
  SERVER_ERROR = 'Unexpected server error has occurred',
  NOT_VALID_ID = 'Id is not valid (not uuid)',
  NOT_FOUND = 'User is not found',
  USERNAME_MISSING = 'Required field username is missing',
  AGE_MISSING = 'Required field age is missing',
  HOBBIES_MISSING = 'Required field hobbies is missing',
}
