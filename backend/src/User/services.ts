import { db } from '../db/db';
import { hash, genSalt } from 'bcryptjs';
import { v1 } from 'uuid';
import { User } from '../user/user';

export const getUsersFromDB = async () => {
  try {
    return await db('users').select('id', 'name');
  } catch (e) {
    throw e;
  }
};

export const getUserFromDB = async (id: string) => {
  try {
    const user = await db('users').select('*').where({ id });

    if (!user.length) {
      throw new Error('User could not be found!');
    }
    return user;
  } catch (e) {
    throw e;
  }
};

export const createUserToDB = async (username: string, password: string) => {
  try {
    const user = await db<User>('users').select('*').where({ name: username });

    if (user.length) {
      throw new Error('Username is already in use!');
    }

    const id = v1();
    const hashedPassword = await hash(password, await genSalt());

    await db('users').insert({
      id: id,
      name: username,
      password: hashedPassword,
    });

    return await db<User>('users').select('*').where({ id });
  } catch (e) {
    throw e;
  }
};
