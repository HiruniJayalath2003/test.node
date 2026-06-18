import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client"
import Pg, { Pool } from "pg";

const connectionString =process.env.DATABASE_URL as string;//getting a connectionstring-reads db url from env
const pool = new Pg.Pool({connectionString});//a manager that creates and reuses database connections-Instead of opening a new connection every time → it reuses existing ones/Makes app faster and scalable
const adapter =new PrismaPg(pool);  //create adapter for prisma postgress -Use this pool for database communication”-Bridge Prisma with PostgreSQL connection pool.

export const prisma =new PrismaClient({adapter})

//Don’t use default connection, use this custom PostgreSQL pool instead