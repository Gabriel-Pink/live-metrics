import dotenv from 'dotenv';
dotenv.config();

export const config = {
    PORT: 8080,
    JWT_SECRET: process.env.JWT_SECRET
  };