import { RequestHandler } from 'express';
import { User } from '../../user/user';
import { createToken } from './services';

export const login: RequestHandler = async (req, res) => {
  try {
    const username = (req.body as { username: string }).username;
    const password = (req.body as { password: string }).password;
    const token = await createToken(username, password);
    res.status(200).json({ token });
  } catch (e) {
    res.status(403).json({ message: e.message });
  }
};
