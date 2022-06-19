import { User } from './user.model';

let users: User[] = [];

const getAll = () => users;

const getById = (id: string) => users.find(user => user.id === id);

const create = (username: string, age: number, hobbies: [] | string[]) => {
  const newUser = new User(username, age, hobbies);
  users.push(newUser);
  return newUser;
};

const updateById = (id: string, username: string, age: number, hobbies: [] | string[]) => {
  users = users.map(user => (user.id === id ? { id, username, age, hobbies } : user));
  const updatedUser = getById(id);
  return updatedUser;
};

const deleteById = (id: string) => {
  users = users.filter(user => user.id !== id);
};

export const userRepository = { getAll, getById, create, updateById, deleteById };
