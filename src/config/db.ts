import pg from "pg";

const { Client } = pg;

export const client = new Client(process.env.DATABASE_URL);
