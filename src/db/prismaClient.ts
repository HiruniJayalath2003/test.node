import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";//package that loads variables from a .env file
import { PrismaClient } from "../generated/prisma/client.js";
import Pg from "pg";

const connectionString =process.env.DATABASE_URL as string;//getting a connectionstring-reads db url from env
//if we dont use dotenv we can hard code it like  const connectionString =process.env.DATABASE_URL || "postgresql://postgres:123456789@localhost:5432/MovieDB?schema=public"

if (!connectionString) {
  throw new Error("DATABASE_URL is missing in .env");
}

const pool = new Pg.Pool({connectionString});//a manager that creates and reuses database connections-Instead of opening a new connection every time → it reuses existing ones/Makes app faster and scalable
const adapter =new PrismaPg(pool);  //create adapter for prisma postgress -Use this pool for database communication”-Bridge Prisma with PostgreSQL connection pool.

export const prisma =new PrismaClient({adapter})

//Don’t use default connection, use this custom PostgreSQL pool instead