import { RequestHandler } from 'express';
import { db } from '../db/db';
import { v1 } from 'uuid';

export const getRuns: RequestHandler = async (req, res) => {
  try {
    console.log('pröö');
  } catch (err) {
    console.log(err);
  }
};

export const getRun: RequestHandler = async (req, res) => {
  try {
    console.log('pröö');
  } catch (err) {
    console.log(err);
  }
};

export const createRun: RequestHandler = async (req, res) => {
  try {
    const userId: string = req.body.userId;
    const length: number = req.body.length;
    const date: Date = req.body.date;
    const time: number = req.body.time;
    const id = v1();

    const user = db('users').select('*').where({ id: userId });

    if (!user) {
      throw new Error('User does not exist!');
    }

    await db('run').insert({
      id,
      userId,
      length,
      date,
      time,
    });

    const newRun = await db.select('*').where({ id });

    res.status(200).json({ run: newRun });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateRun: RequestHandler = async (req, res) => {
  try {
    console.log('pröö');
  } catch (err) {
    console.log(err);
  }
};

export const deleteRun: RequestHandler = async (req, res) => {
  try {
    console.log('pröö');
  } catch (err) {
    console.log(err);
  }
};
