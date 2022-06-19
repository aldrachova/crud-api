import { ServerResponse } from 'http';
import { Message, StatusCode } from './constants';
import { handleErrorResponse, handleResponse } from './response-handler';
import { userRepository } from './user.repository';
import { isValidId } from './user.validator';

// GET api/user
const getUsers = (response: ServerResponse) => {
  try {
    const users = userRepository.getAll();
    handleResponse(response, StatusCode.OK, users);
  } catch (error) {
    handleErrorResponse(response, StatusCode.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

// GET api/user/:userId
const getUserById = (response: ServerResponse, id: string) => {
  try {
    if (!isValidId(id)) {
      handleErrorResponse(response, StatusCode.BAD_REQUEST, Message.NOT_VALID_ID);
    } else {
      const user = userRepository.getById(id);
      if (!user) {
        handleErrorResponse(response, StatusCode.NOT_FOUND, Message.NOT_FOUND);
      } else {
        handleResponse(response, StatusCode.OK, user);
      }
    } 
  } catch (error) {
    handleErrorResponse(response, StatusCode.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

export const userService = { getUsers, getUserById };
