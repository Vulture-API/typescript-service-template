import { Pool } from "pg";

import { ambiente } from "@/configuracoes/ambiente.js";

export const bancoDeDados = new Pool({
  connectionString: ambiente.DATABASE_URL,
});