import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://postgres:Mohamedabdouma7$@db.zsxgiyplyykfzqnwgdex.supabase.co:5432/postgres'!,
  },
});
