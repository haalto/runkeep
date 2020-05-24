import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;

export const JWT_SECRET: string = String(process.env.JWT_SECRET);
