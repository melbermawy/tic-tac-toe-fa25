import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from "/Users/mohamed/Documents/fractal-fa25/tic-tac-toe1/react/src/db/schema.ts"
import "dotenv/config"

const connectionString ="postgresql://postgres:Mohamedabdouma7$@db.zsxgiyplyykfzqnwgdex.supabase.co:5432/postgres";
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client, { schema });