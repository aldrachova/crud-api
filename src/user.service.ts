import { IncomingMessage, ServerResponse } from 'http';
import { Message, StatusCode } from './constants';
import { handleErrorResponse, handleResponse } from './response-handler';
import { userRepository } from './user.repository';
import { isValidId } from './user.validator';

const getBodyData = async (request: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      let data = '';
      request.on('data', (chunk) => {
        data += chunk.toString();
      });
      request.on('end', () => {
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

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

// POST api/users
const createUser = async (request: IncomingMessage, response: ServerResponse) => {
  try {
    const bodyData = await getBodyData(request);
    const { username, age, hobbies } = JSON.parse(bodyData);
    if (!username) {
      handleErrorResponse(response, StatusCode.BAD_REQUEST, Message.USERNAME_MISSING);
    } else if (!age) {
      handleErrorResponse(response, StatusCode.BAD_REQUEST, Message.AGE_MISSING);
    } else if (!hobbies) {
      handleErrorResponse(response, StatusCode.BAD_REQUEST, Message.HOBBIES_MISSING);
    } else {
      const newUser = userRepository.create(username, age, hobbies);
      handleResponse(response, StatusCode.CREATED, newUser);
    }
  } catch (error) {
    handleErrorResponse(response, StatusCode.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

// PUT api/users/:userId
const updateUser = async (request: IncomingMessage, response: ServerResponse, id: string) => {
  try {
    if (!isValidId(id)) {
      handleErrorResponse(response, StatusCode.BAD_REQUEST, Message.NOT_VALID_ID);
    } else {
      const bodyData = await getBodyData(request);
      const { username, age, hobbies } = JSON.parse(bodyData);
      const updatedUser = userRepository.updateById(id, username, age, hobbies);
      if (updatedUser) {
        handleResponse(response, StatusCode.OK, updatedUser);
      } else {
        handleErrorResponse(response, StatusCode.NOT_FOUND, Message.NOT_FOUND);
      }
    }
  } catch (error) {
    handleErrorResponse(response, StatusCode.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

// DELETE api/users/:userId
const deleteUser = (response: ServerResponse, id: string) => {
  try {
    if (!isValidId(id)) {
      handleErrorResponse(response, StatusCode.BAD_REQUEST, Message.NOT_VALID_ID);
    } else {
      const user = userRepository.getById(id);
      if (!user) {
        handleErrorResponse(response, StatusCode.NOT_FOUND, Message.NOT_FOUND);
      } else {
        userRepository.deleteById(id);
        response.statusCode = StatusCode.NO_CONTENT;
        response.end();
      }
    }
  } catch (error) {
    handleErrorResponse(response, StatusCode.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

export const userService = { getUsers, getUserById, createUser, updateUser, deleteUser };
