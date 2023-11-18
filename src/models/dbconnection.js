import Db from "mysql2-async";
import dotenv from 'dotenv';
dotenv.config();

const configuration = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  };
  if (process.env.DATABASE_SOCKET) {
    configuration.socketPath = process.env.DATABASE_SOCKET;
  } else {
    configuration.host = process.env.DATABASE_HOST;
  }
  const db = new Db(configuration);

export default db;