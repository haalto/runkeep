// eslint-disable-next-line no-unused-vars
import { RequestHandler } from 'express';
import { getUserFromDB, getUsersFromDB, createUserToDB } from './services';
import { User } from './user';

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const results = await getUsersFromDB();
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

export const getUser: RequestHandler = async (req, res) => {
  try {
    const id: string = (req.params as { id: string }).id;
    const user = await getUserFromDB(id);

    res.status(200).json({ user: user[0] });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const createUser: RequestHandler = async (req, res) => {
  try {
    const username: string = req.body.user;
    const password: string = req.body.password;
    const newUser: User[] = await createUserToDB(username, password);
    res.status(200).json({ user: newUser });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err.message });
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    res.send('user updated');
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    res.send('user deleted');
  } catch (err) {
    console.log(err);
  }
};
