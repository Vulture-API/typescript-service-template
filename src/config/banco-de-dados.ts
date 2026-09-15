import { Pool } from "pg";

import { env } from "@/config/ambiente.js";

export const bancoDeDados = new Pool({
  connectionString: env.DATABASE_URL,
});
