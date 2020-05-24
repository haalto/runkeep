import { db } from '../../db/db';
import { User } from '../../user/user';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { JWT_SECRET } from '../../utils/config';

export const createToken = async (username: string, password: string) => {
  try {
    if (!(username && password)) {
      throw new Error('Username or password is missing!');
    }

    const results: User[] = await db<User>('users')
      .select('*')
      .where({ name: username });

    if (!results.length) {
      throw new Error('Username or password is wrong!');
    }

    const user = results[0];
    const result: boolean = await compare(password, user.password);

    if (!result) {
      throw new Error('Username or password is wrong!');
    }

    const token = sign({ userId: user.id }, JWT_SECRET);
    return token;
  } catch (e) {
    throw e;
  }
};
