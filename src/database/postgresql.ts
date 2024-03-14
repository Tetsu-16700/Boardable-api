import { Pool } from "pg";

export const pool = new Pool({
  // host: process.env["PGHOST"],
  // port: Number(process.env["PGPORT"]),
  // database: process.env["PGDATABASE"],
  // user: process.env["PGUSER"],
  // password: "admin",
  host: "localhost",
  port: 5432,
  database: "boardable",
  user: "postgres",
  password: "12345678",
});

export const query = (text: string, params?: (string | number | boolean)[]) => {
  return pool.query(text, params);
};