// eslint-disable-next-line no-unused-vars
import { RequestHandler } from 'express';
import { db } from '../db/db';
import { hash, genSalt } from 'bcryptjs';
import { v1 } from 'uuid';

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const results = await db('users').select('id', 'name');
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

export const getUser: RequestHandler = async (req, res) => {
  try {
    const id: string = (req.params as { id: string }).id;
    const user = await db('users').select('id', 'name').where({ id });

    if (!user.length) {
      throw new Error('User could not be found!');
    }

    res.status(200).json({ user: user[0] });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const createUser: RequestHandler = async (req, res) => {
  try {
    const username: string = req.body.user;
    const password: string = req.body.password;

    const user = await db('users').select('*').where({ name: username });

    if (user.length) {
      throw new Error('Username is already in use');
    }

    const id = v1();
    const hashedPassword = await hash(password, await genSalt());

    await db('users').insert({
      id: id,
      name: username,
      password: hashedPassword,
    });

    const newUser = await db('users').select('*').where({ id });
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
