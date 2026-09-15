import "dotenv/config";
import "@/config/zod.config.js";
import z from "zod";

const esquemaDasVariaveisDeAmbiente = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive(),
  DATABASE_URL: z.string(),
});

const resultado = esquemaDasVariaveisDeAmbiente.safeParse(process.env);

if (!resultado.success) {
  const erros = resultado.error.issues
    .map((erro) => `- ${erro.path.join(".")}: ${erro.message}`)
    .join("\n");

  throw new Error(`Variáveis de ambiente inválidas:\n${erros}`);
}

export const env = resultado.data;
