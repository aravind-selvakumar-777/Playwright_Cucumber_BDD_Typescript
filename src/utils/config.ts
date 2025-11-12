import dotenv from 'dotenv';
dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || '',
  username: process.env.NAME || '',
  password: process.env.PASSWORD || '',
};
